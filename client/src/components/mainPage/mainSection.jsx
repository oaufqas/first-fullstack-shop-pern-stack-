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
                                Гарантия долговечности и безупречного качества каждой детали
                            </p>
                            <div className="main-description">
                                <p>
                                    «ЁлкиПалки» — ваш надёжный партнёр в мире изделий из сухого леса. 
                                    Мы предлагаем полный цикл продукции: от качественных пиломатериалов (рейки, бруски, доски) 
                                    до готовых столярных изделий. В нашем ассортименте плинтусы, наличники, дверные коробки, 
                                    декоративные углы, вагонка и межкомнатные двери.
                                </p>
                            </div>
                            <div className="main-features">
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    Индивидуальный подход
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    Доступный ценовой диапазон
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    Широкий ассортимент
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