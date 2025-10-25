import { Card, Button, Row, Col } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import {Context} from '../../main'
import { getAllProduct } from '../../http/deviceApi';
import { addToBasket, delPositionInBasket, getBasket } from '../../http/cartApi';
import { LOGIN_ROUTE } from '../../utils/consts';

const ProductCard = observer(() => {
    const navigate = useNavigate()
    const { product, user } = useContext(Context);
    const [searchParams] = useSearchParams();
    const typeProductId = searchParams.get('typeProductId');

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
        const gtPrdcts = async () => {
            try {
                const productData = await getAllProduct(typeProductId)
                product.setProducts(productData.rows)

            } catch (e) {
                console.error(e)
            }
        }
       gtPrdcts()
    }, [])

    if (!product.products[0]) {
        return (
            <div className={`py-5 ${styles.textCenter}`}>
                <h4>Товары не найдены</h4>
                <p>Попробуйте выбрать другую категорию</p>
            </div>
        );
    }

    return (
        <div className={styles.productsContainer}>
            <h1>Товары</h1>
            <Row className="g-5">
                    {product.products.map(productItem => (
                        <Col key={productItem.id} xs={12} sm={6} md={4} lg={3}>

                            <Link to={`/product/${productItem.id}`} className={styles.productLink}>

                            <Card className={`${styles.productCard} h-100`}>
                                <div className={styles.productImageContainer}>
                                    <Card.Img
                                        variant="top"
                                        src={'/static/' + productItem.img}
                                        alt={productItem.name}
                                        className={styles.productImage}
                                    />
                                </div>

                                <Card.Body className={styles.productCardBody}>
                                    <Card.Title className={styles.productTitle}>
                                        {productItem.name}
                                    </Card.Title>

                                    <Card.Text className={styles.productDescription}>
                                        {productItem.about}
                                    </Card.Text>

                                    <div className={styles.productFooter}>
                                        <div className={styles.priceSection}>
                                            <div className={styles.currentPrice}>
                                                {new Intl.NumberFormat('ru-RU').format(productItem.price)} ₽
                                            </div>
                                            <div className={styles.priceUnit}>
                                                {productItem.quantityInStock ? productItem.quantityInStock + ' шт.' : 'Товара нет на складе'}
                                            </div>
                                        </div>
                                        {inCart(productItem.id) ? (
                                            <div className={styles.quantityControls}>
                                                {checkQuan(productItem.id) === 1 ? (
                                                    <Button
                                                        variant="outline-secondary"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.preventDefault()                                                        
                                                            handleRemove(productItem.id)
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
                                                            handleDecrease(productItem.id)
                                                        }}
                                                        className={styles.quantityButton}
                                                    >
                                                        −
                                                    </Button>
                                                )}

                                                <span className={styles.quantity}>
                                                    {checkQuan(productItem.id)} шт.
                                                </span>

                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handleIncrease(productItem.id)
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
                                                    className={styles.addToCartBtn}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        addInBasket(productItem.id)
                                                    }}
                                                >
                                                    В корзину

                                                </Button>

                                            ) : (
                                                <Button 
                                                    variant="warning" 
                                                    className={styles.addToCartBtn}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        navigate(LOGIN_ROUTE)
                                                    }}
                                                >
                                                    В корзину
                                                </Button>
                                            )}
                                            </>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                            </Link>
                        </Col>
                    ))}
            </Row>
        </div>
    );
});

export default ProductCard;