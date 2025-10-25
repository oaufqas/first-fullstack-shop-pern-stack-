import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const MainSection = () => {
    return (
        <section id="main" className="main-section">
            <Container>
                <Row className="align-items-center min-vh-100">
                    <Col lg={6}>
                        <div className="main-content">
                            <h1 className="main-title">
                                Продажа качественного дерева
                            </h1>
                            <p className="main-subtitle">
                                Производство полного цикла в селе под волгоградом
                            </p>
                            <div className="main-description">
                                <p>
                                    Собственное производство деревянной вагонки, евровагонки 
                                    и строганной доски. Работаем с натуральной древесиной 
                                    хвойных пород, обеспечивая высокое качество и доступные цены.
                                </p>
                            </div>
                            <div className="main-features">
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    Многопроцентная рассрочка
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    Выгодные варианты не в наличии
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    Покупайте только у нас
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="main-image">
                            <img 
                                src="/image1.png" 
                                alt="Вагонка от производителя"
                                className="main-img"  
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default MainSection;