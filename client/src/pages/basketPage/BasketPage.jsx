import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Card, Button, Row, Col, Alert, Spinner, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './BasketPage.module.css';
import { Context } from '../../main';
import { addToBasket, clearBasket, delPositionInBasket, getBasket } from '../../http/cartApi';

const BasketPage = observer(() => {
    const { product, user } = useContext(Context);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);

    const hasCartItems = product.cart && product.cart.basketProducts && product.cart.basketProducts[0]

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

    const handleRemove = async (productId) => {
        await delPositionInBasket(product.cart.id, productId)
        await updateCart()
    };

    const handleClearCart = async () => {
        await clearBasket(product.cart.id);
        await updateCart()
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };


    const calculateTotal = () => {
        return product.cart.basketProducts.reduce((total, item) => total + (item.Product.price * item.quantity), 0);
    }


    if (!hasCartItems) {
        return (
            <Container className={styles.cartContainer}>
                <div className={styles.emptyCart}>
                    <h2 className={styles.emptyTitle}>Корзина пуста</h2>
                    <p className={styles.emptyText}>Добавьте товары, чтобы сделать заказ</p>
                    <Button 
                        variant="outline-dark" 
                        size="lg"
                        onClick={() => navigate('/#products')}
                        className={styles.continueShopping}
                    >
                        Продолжить покупки
                    </Button>
                </div>
            </Container>
        );
    }

 
    return (
        <Container className={styles.cartContainer}>
            {showAlert && (
                <Alert variant="success" className={styles.alert}>
                    Корзина очищена!
                </Alert>
            )}
            
            <div className={styles.cartHeader}>
                <h1 className={styles.cartTitle}>Корзина товаров</h1>
                <Button 
                    variant="outline-danger" 
                    onClick={handleClearCart}
                    className={styles.clearButton}
                    >
                    Очистить корзину
                </Button>
            </div>

            <Row>
                <Col lg={8}>
                    <div className={styles.cartItems}>
                        {product.cart.basketProducts.map(item => (
                            <Card key={item.id} className={styles.cartItem}>
                                <Row className="g-0">
                                    <Col md={3}>
                                        <div 
                                            className={styles.productImage}
                                            style={{ 
                                                backgroundImage: `url(${'/static/' + item.Product.img})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                        />
                                    </Col>
                                    <Col md={9}>
                                        <Card.Body className={styles.itemBody}>
                                            <div className={styles.itemHeader}>
                                                <h5 className={styles.productName}>{item.Product.name}</h5>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => handleRemove(item.Product.id)}
                                                    className={styles.removeButton}
                                                >
                                                    ✕
                                                </Button>
                                            </div>
                                            
                                            <p className={styles.productDescription}>
                                                {item.Product.about || 'Описание товара отсутствует'}
                                            </p>
                                            
                                            <div className={styles.itemFooter}>
                                                <div className={styles.quantityControls}>
                                                    <Button
                                                        variant="outline-secondary"
                                                        size="sm"
                                                        onClick={() => handleDecrease(item.Product.id)}
                                                        disabled={item.quantity <= 1}
                                                        className={styles.quantityButton}
                                                    >
                                                        −
                                                    </Button>
                                                    <span className={styles.quantity}>
                                                        {item.quantity} шт.
                                                    </span>
                                                    <Button
                                                        variant="outline-secondary"
                                                        size="sm"
                                                        onClick={() => handleIncrease(item.Product.id)}
                                                        className={styles.quantityButton}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                                
                                                <div className={styles.priceSection}>
                                                    <span className={styles.price}>
                                                        {item.Product.price * item.quantity} ₽
                                                    </span>
                                                    {item.quantity > 1 && (
                                                        <span className={styles.unitPrice}>
                                                            {item.Product.price} ₽/шт.
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                    </div>
                </Col>
                
                <Col lg={4}>
                    <Card className={styles.orderSummary}>
                        <Card.Header className={styles.summaryHeader}>
                            <h5 className={styles.summaryTitle}>Сумма заказа</h5>
                        </Card.Header>
                        <Card.Body className={styles.summaryBody}>

                            <div className={styles.summaryRow}>
                                <span>Товары ({product.cart.basketProducts.reduce((total, item) => total + item.quantity, 0)} шт.)</span>
                                <span>{calculateTotal()} ₽</span>
                            </div>

                            <hr className={styles.divider} />
                            <div className={`${styles.summaryRow} ${styles.total}`}>
                                <strong>Итого</strong>
                                <strong>{calculateTotal()} ₽</strong>
                            </div>
                            
                            <Button 
                                variant="success" 
                                size="lg"
                                className={styles.checkoutButton}
                                onClick={() => navigate('/#contacts')}
                            >
                                Оформить заказ
                            </Button>
                            
                            <Button 
                                variant="outline-dark" 
                                className={styles.continueButton}
                                onClick={() => navigate('/#products')}
                            >
                                Продолжить покупки
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
});

export default BasketPage;