import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InterMap from '../InterMap';

const ContactsSection = () => {
    const shopAddress = "Волгоград, Советский район, ул ​25 лет Октября, 1 ст194, 1 этаж";

    return (
        <section id="contacts" className="contacts-section">
            <Container>
                <h2 className="section-title">Контакты</h2>
                <Row>
                    <Col lg={6}>
                        <div className="contact-info">
                            <div className="contact-item">
                                <h4>Телефон</h4>
                                <a href="tel:+79195461353" className="contact-link">
                                    +7 919 546 1353
                                </a>
                            </div>
                            
                            <div className="contact-item">
                                <h4>Почта</h4>
                                <a href="mailto:brusbazhenov@yandex.ru" className="contact-link">
                                    brusbazhenov@yandex.ru
                                </a>
                            </div>
                            
                            <div className="contact-item">
                                <h4>Магазин-склад</h4>
                                <p>{shopAddress}</p>
                            </div>
                            
                            

                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="map-container">
                            <div className="map-placeholder">
                                <InterMap/>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ContactsSection;