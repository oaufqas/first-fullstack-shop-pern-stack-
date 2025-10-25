import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { Container, Row, Col, Image, Button, } from 'react-bootstrap';
import styles from './ProductPage.module.css';
import { getOneProducts } from '../../http/deviceApi';
import { addToBasket, delPositionInBasket, getBasket } from '../../http/cartApi';
import { LOGIN_ROUTE } from '../../utils/consts';

const ProductPage = observer(() => {
    const navigate = useNavigate()
    const { id } = useParams();
    const { product, user } = useContext(Context)
    const [currentProduct, setCurrentProduct] = useState({characters: []});


    const inCart = (productData) => {
        return product.cart?.basketProducts?.some(item => item.Product?.id === productData)
    }

    const checkQuan = (productData) => {
        const selectObj = product.cart?.basketProducts?.find(item => item.Product?.id === productData)
        return selectObj.quantity
    }

    const updateCart = async () => {
        try {
            const data = await getBasket(user.user.id)
            product.setCart(data)
        } catch (e) {
            console.error('err update cart: ', e)
        }
    }

    const handleIncrease = async (productId) => {
        const data = new FormData()
        data.append('basketId', product.cart.id)
        data.append('ProductId', productId)
        data.append('plus', true)

        await addToBasket(data)
        await updateCart()
    };

    const handleDecrease = async (productId) => {
        const data = new FormData()
        data.append('basketId', product.cart.id)
        data.append('ProductId', productId)
        data.append('minus', true)

        await addToBasket(data)
        await updateCart()
    };

    const addInBasket = async (productId) => {
        const data = new FormData()
        data.append('basketId', product.cart.id)
        data.append('ProductId', productId)

        await addToBasket(data)
        await updateCart()
    };

    const handleRemove = async (productId) => {
        await delPositionInBasket(product.cart.id, productId)
        await updateCart()
    };
    
    useEffect(() => {
        const gtnPrdct = async () => {
            try {
                const data = await getOneProducts(id)
                setCurrentProduct(data)

            } catch (e) {
                console.error(e)
            }
        }

        gtnPrdct()

    }, [])

    if (!currentProduct) {
        return (
            <Container>
                <div className="text-center py-5">
                    <h2>Товар не найден</h2>
                    <Button variant="primary" onClick={() => navigate('/')}>
                        Вернуться в магазин
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <Container className={styles.productDetailPage}>

            <Row className={styles.productRow}>
                <Col lg={6} className={styles.imageColumn}>
                    <div className={styles.imageContainer}>
                        <Image 
                            src={'/static/' + currentProduct.img}
                            alt={currentProduct.name}
                            className={styles.productImage}
                        />
                        {currentProduct.quantityInStock === 0 && (
                        <div className={styles.imageBadge}>
                            Нет в наличии
                        </div>
                    )}
                    </div>
                </Col>

                <Col lg={6} className={styles.infoColumn}>

                    <h1 className={styles.productTitle}>
                        {currentProduct.name}
                    </h1>

                    <div className={styles.priceSection}>
                        <div className={styles.price}>
                            {new Intl.NumberFormat('ru-RU').format(currentProduct.price)} р.
                        </div>
                        <div className="py-3">
                            <span className={styles.specLabel}>Колличество на складе </span>
                            <span className={styles.specValue}>{currentProduct.quantityInStock} шт.</span>
                        </div>
                    </div>

                    <hr className={styles.divider} />

                    <div className={styles.actionSection}>
                        {inCart(currentProduct.id) ? (
                            <div className={styles.quantityControls}>
                                {checkQuan(currentProduct.id) === 1 ? (
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={(e) => {
                                            e.preventDefault()                                                        
                                            handleRemove(currentProduct.id)
                                        }}
                                        className={styles.quantityButton}
                                    >
                                        🗑️
                                    </Button>
                                    ) : (
                                        
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        
                                        onClick={(e) => {
                                            e.preventDefault()                                                        
                                            handleDecrease(currentProduct.id)
                                        }}
                                        className={styles.quantityButton}
                                    >
                                        −
                                    </Button>
                                    
                                )}

                                <span className={styles.quantity}>
                                    {checkQuan(currentProduct.id)} шт.
                                </span>

                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleIncrease(currentProduct.id)
                                    }}
                                    className={styles.quantityButton}
                                >
                                    +
                                </Button>
                            </div>
                        ):(
                            <>
                            {user.isAuth ? (
                        <Button 
                            variant="warning" 
                            size="lg" 
                            className={styles.buyButton}
                            disabled={currentProduct.quantityInStock === 0}
                            onClick={() => {
                                addInBasket(currentProduct.id)
                            }}
                        >
                        {currentProduct.quantityInStock === 0 ? 'Нет в наличии' : 'В корзину'}
                        </Button>

                            ):(

                        <Button 
                            variant="warning" 
                            size="lg" 
                            className={styles.buyButton}
                            disabled={currentProduct.quantityInStock === 0}
                            onClick={() => {
                                navigate(LOGIN_ROUTE)
                            }}
                        >
                        {currentProduct.quantityInStock === 0 ? 'Нет в наличии' : 'В корзину'}
                        </Button>
                            )}
                            
                            </>
                        )}


                    </div>


                <div className={styles.specsSection}>
                    <h4 className={styles.specsTitle}>Характеристики</h4>
                    <div className={styles.specsList}>
                        <div className={styles.specItem}>
                            <span className={styles.specLabel}>Описание</span>
                            <span className={styles.specValue}>{currentProduct.about}</span>
                        </div>

                        {currentProduct.characters.map(info => 
                            <div key={info.title} className={styles.specItem}>
                                <span className={styles.specLabel}>{info.title}</span>
                                <span className={styles.specValue}>{info.description}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.contactSection}>
                    <div className={styles.contactItem}>
                        <strong>Телефон:</strong> +7 999 999 9999
                    </div>
                    <div className={styles.contactItem}>
                        <strong>Email:</strong> email@gmail.com
                    </div>
                    <div className={styles.contactItem}>
                        <strong>Адрес:</strong> ---
                        {/* <strong>Адрес:</strong> Волгоград, Советский район, ул ​25 лет Октября, 1 ст194, 1 этаж */}
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
    );
});

export default ProductPage;
