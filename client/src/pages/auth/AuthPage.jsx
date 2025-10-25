import { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, ADMIN_ROUTE, SHOP_ROUTE } from '../../utils/consts';
import styles from './auth.module.css';
import { login, registration } from '../../http/userApi';

const AuthPage = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const pageIsLogin = location.pathname === LOGIN_ROUTE;

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        let userData

        try {

            if (pageIsLogin) {
                userData = await login(formData.email, formData.password)
            } else {
                userData = await registration(formData.email, formData.password)
            }

            if (userData) {
                
                user.setUser(userData);
                user.setIsAuth(true);

                if (userData.role === 'admin') {
                    navigate(ADMIN_ROUTE, { replace: true });
                    window.location.reload()
                } else {
                    navigate(SHOP_ROUTE, { replace: true });
                    window.location.reload()
                }
            } else {
                setError(pageIsLogin ? 'Неверный email или пароль' : 'Пользователь уже существует');
            }
        } catch (err) {
            setError('Ошибка при авторизации. Попробуйте снова.');
        } finally {
            setIsLoading(false);
        }
    };



     return (
        <Container fluid className={styles.container}>
            <h1 className={styles.title}>
                {pageIsLogin ? 'Авторизация' : 'Регистрация'}
            </h1>
            
            <div className={styles.wrapper}>

                <form className={styles.signin} onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email" 
                        required
                        disabled={isLoading}
                    />
                    <input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Пароль" 
                        required 
                        disabled={isLoading}
                        minLength={6}
                    />
                    
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            '➔'
                        )}
                    </button>
                    
                    {pageIsLogin ? (
                        <p>
                            Еще нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink>
                        </p>
                    ) : (
                        <p>
                            Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
                        </p>
                    )}
                </form>
            </div>
        </Container>
    );
});

export default AuthPage;