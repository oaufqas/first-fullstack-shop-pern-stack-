import { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { SHOP_ROUTE, LOGIN_ROUTE, ADMIN_ROUTE, BASKET_ROUTE } from '../../utils/consts';
import styles from './navBar.module.css';

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const isNotHomePage = location.pathname !== SHOP_ROUTE && location.pathname !== '/';

    const handleGoBack = () => {
        navigate(-1);
    };

    const checkLocation = (anchor) => {
        if (location.pathname === '/') {
            return anchor;
        } else {
            return `/${anchor}`;
        }
    };

    const handleLogout = () => {
        user.setIsAuth(false);
        user.setUser({});
        localStorage.removeItem('token');
        navigate(SHOP_ROUTE);
        setShowMobileMenu(false);
    };

    const handleNavClick = (path) => {
        navigate(path);
        setShowMobileMenu(false);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className={styles.navbar}>
                <Container>
                    <div className={styles.navbarContent}>
                        <div className={styles.navbarLeft}>
                            {isNotHomePage && (
                                <Button
                                    variant="outline-light"
                                    className={styles.backButton}
                                    onClick={handleGoBack}
                                    title="Вернуться назад"
                                >
                                    ←
                                </Button>
                            )}
                            <Navbar.Brand 
                                className={styles.brand}
                                onClick={() => handleNavClick(SHOP_ROUTE)}
                            >
                                <span className={styles.brandText}>WoodMan</span>
                            </Navbar.Brand>
                        </div>

                        <div className={styles.navbarRight}>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className={styles.navLinks}>
                                    <Nav.Link 
                                        className={styles.navLink}
                                        href={checkLocation("#main")}
                                    >
                                        Главная
                                    </Nav.Link>
                                    <Nav.Link 
                                        className={styles.navLink}
                                        href={checkLocation("#products")}
                                    >
                                        Товары
                                    </Nav.Link>
                                    <Nav.Link 
                                        className={styles.navLink}
                                        href={checkLocation("#aboutUs")}
                                    >
                                        О нас
                                    </Nav.Link>
                                    <Nav.Link 
                                        className={styles.navLink}
                                        href={checkLocation("#contacts")}
                                    >
                                        Контакты
                                    </Nav.Link>
                                    {user.isAuth ? (                                            
                                        <Nav.Link 
                                            className={styles.navLink}
                                            href={BASKET_ROUTE}
                                        >
                                            Корзина
                                        </Nav.Link>) : <></>}
                                    
                                    {user.isAuth ? (
                                        <div className={styles.authSection}> 
                                            {user.user?.role === 'admin' && (
                                                <Button 
                                                    variant="outline-warning" 
                                                    size="sm"
                                                    className={styles.adminButton}
                                                    onClick={() => handleNavClick(ADMIN_ROUTE)}
                                                >
                                                    Админ
                                                </Button>
                                            )}

                                            <Button 
                                                variant="outline-light" 
                                                size="sm"
                                                onClick={handleLogout}
                                                className={styles.logoutButton}
                                            >
                                                Выход
                                            </Button>

                                        </div>
                                    ) : (
                                        <NavLink 
                                            to={LOGIN_ROUTE} 
                                            className={styles.loginLink}
                                        >
                                            Войти
                                        </NavLink>
                                    )}
                                </Nav>
                            </Navbar.Collapse>

                            <Button
                                variant="outline-light"
                                className={`d-lg-none ${styles.mobileMenuButton}`}
                                onClick={() => setShowMobileMenu(true)}
                            >
                                ☰
                            </Button>
                        </div>
                    </div>
                </Container>
            </Navbar>

            <Offcanvas 
                show={showMobileMenu} 
                onHide={() => setShowMobileMenu(false)}
                placement="end"
                className={styles.mobileMenu}
            >
                <Offcanvas.Header closeButton className={styles.mobileHeader}>
                    <Offcanvas.Title className={styles.mobileTitle}>
                        Меню
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={styles.mobileBody}>
                    {isNotHomePage && (
                        <>
                            <Button 
                                variant="outline-secondary" 
                                onClick={handleGoBack}
                                className={styles.mobileBackButton}
                            >
                                ← Вернуться назад
                            </Button>
                            <hr className={styles.mobileDivider} />
                        </>
                    )}
                    
                    <Nav className="flex-column gap-3">
                        <Nav.Link 
                            className={styles.mobileNavLink}
                            href={checkLocation("#main")}
                            onClick={() => setShowMobileMenu(false)}
                        >
                            Главная
                        </Nav.Link>
                        <Nav.Link 
                            className={styles.mobileNavLink}
                            href={checkLocation("#products")}
                            onClick={() => setShowMobileMenu(false)}
                        >
                            Товары
                        </Nav.Link>
                        <Nav.Link 
                            className={styles.mobileNavLink}
                            href={checkLocation("#aboutUs")}
                            onClick={() => setShowMobileMenu(false)}
                        >
                            О нас
                        </Nav.Link>
                        <Nav.Link 
                            className={styles.mobileNavLink}
                            href={checkLocation("#contacts")}
                            onClick={() => setShowMobileMenu(false)}
                        >
                            Контакты
                        </Nav.Link>
                        {user.isAuth ? (                                            
                            <Nav.Link 
                                className={styles.mobileNavLink}
                                href={BASKET_ROUTE}
                                onClick={() => setShowMobileMenu(false)}
                                >
                                Корзина
                            </Nav.Link>) : <></>}
                        
                        <hr className={styles.mobileDivider} />
                        
                        {user.isAuth ? (
                            <div className="d-grid gap-2">
                                {user.user?.role === 'admin' && (
                                    <Button 
                                        variant="warning" 
                                        onClick={() => handleNavClick(ADMIN_ROUTE)}
                                        className={styles.mobileButton}
                                    >
                                        Админ панель
                                    </Button>
                                )}
                                <Button 
                                    variant="outline-danger" 
                                    onClick={handleLogout}
                                    className={styles.mobileButton}
                                >
                                    Выйти
                                </Button>
                            </div>
                        ) : (
                            <Button 
                                variant="outline-warning" 
                                onClick={() => handleNavClick(LOGIN_ROUTE)}
                                className={styles.mobileButton}
                            >
                                Войти в аккаунт
                            </Button>
                        )}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
});

export default NavBar