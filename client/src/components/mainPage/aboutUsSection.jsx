import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUsSection = () => {
    return (
        <section id="aboutUs" className="about-section">
            <Container>
                <h2 className="section-title">О Нас</h2>
                <Row className="align-items-center">
                    <Col lg={6}>
                        <div className="about-content">
                            <h3 className="about-subtitle">
                                ОТДЕЛКА КАЧЕСТВЕННЫМИ МАТЕРИАЛАМИ ПО ЦЕНАМ ЗАВОДА-ИЗГОТОВИТЕЛЯ
                            </h3>
                            <p className="about-text">
                                Индивидуальная отделка строительство малых архитектурных форм, 
                                бани или сауны, внутренняя отделка жилых помещений или производство 
                                мебели лучше с нами
                            </p>
                            
                            <div className="features-grid">
                                <div className="feature-card">
                                    <h4>КАЧЕСТВО</h4>
                                    <p>
                                        Сушим в алюминиевом сушильном комплексе, используем итальянскую 
                                        автокатику L'Поuch. Строгаем на станках Weing и Leadermac, 
                                        сами производим ножи для своих станков.
                                    </p>
                                </div>
                                <div className="feature-card">
                                    <h4>ЦЕНЫ ДО 20% ВЫГОДНЕЕ</h4>
                                    <p>
                                        Наличие производства полного цикла позволяет сократить расходы 
                                        на промежуточных этапах, оптимизировать торговую структуру.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="about-images">
                            <div className="image-grid">

                                <div className="image-item large">
                                    <img 
                                        src="/image2.png" 
                                        alt="Производство"
                                    />
                                </div>

                                <div className="image-item small">
                                    <img 
                                        src="/image3.png" 
                                        alt="Продукция"
                                    />
                                </div>

                                <div className="image-item small">
                                    <img 
                                        src="/image4.png" 
                                        alt="Интерьер"
                                    />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AboutUsSection;