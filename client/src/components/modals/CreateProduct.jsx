import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from "../../main.jsx";
import styles from './adminPage.module.css'
import { createProduct, getTypes } from "../../http/deviceApi.js";
import { observer } from "mobx-react-lite";

const CreateProduct = observer(({show, onHide}) => {
    const [info, setInfo] = useState([]);
    const [productData, setProductData] = useState({
        typeId: '',
        name: '',
        price: '',
        about: '',
        quantityInStock: '',
        img: null
    });

    const {product} = useContext(Context);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]);
    };

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    };

    const handleInfoChange = (number, field, value) => {
        setInfo(info.map(i => i.number === number ? {...i, [field]: value} : i));
    };

    const handleSubmit = () => {

        const formData = new FormData()
        formData.append('name', productData.name)
        formData.append('price', productData.price)
        formData.append('typeProductId', productData.typeId)
        formData.append('about', productData.about)
        formData.append('quantityInStock', productData.quantityInStock)
        formData.append('img', productData.img)
        formData.append('info', JSON.stringify(info))

        createProduct(formData).then(data => {
            setProductData({typeId: '', name: '', price: '', img: null})
            setInfo([])
            onHide();
        }) 


    };

    return (
        <Modal 
            show={show} 
            onHide={onHide} 
            size="lg"
            centered
            className={styles.modalMobile}
            scrollable
        >
            <Modal.Header closeButton className={`bg-light ${styles.modalHeaderMobile}`}>
                <Modal.Title className={`fw-bold text-dark ${styles.modalTitleMobile}`}>
                    Добавить новый товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBodyMobile}>
                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label className={`fw-semibold ${styles.formLabelMobile}`}>
                            Выберите тип
                        </Form.Label>
                        <Form.Select 
                            value={productData.typeId}
                            onChange={(e) => setProductData({...productData, typeId: e.target.value})}
                            className={`py-2 ${styles.formControlMobile}`}
                            size="sm"
                        >
                            <option value="">Типы</option>
                            {product.types.map(type => 
                                <option key={type.id} value={type.id}>{type.name}</option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className={`fw-semibold ${styles.formLabelMobile}`}>
                            Название товара
                        </Form.Label>
                        <Form.Control
                            value={productData.name || ''}
                            onChange={(e) => setProductData({...productData, name: e.target.value})}
                            placeholder="Название"
                            className={`py-2 ${styles.formControlMobile}`}
                            size="sm"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className={`fw-semibold ${styles.formLabelMobile}`}>
                            Краткое описание товара
                        </Form.Label>
                        <Form.Control
                            value={productData.about || ''}
                            onChange={(e) => setProductData({...productData, about: e.target.value})}
                            placeholder="Описание"
                            className={`py-3 ${styles.formControlMobile}`}
                            size="sm"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className={`fw-semibold ${styles.formLabelMobile}`}>
                            Стоимость товара
                        </Form.Label>
                        <InputGroup size="sm">
                            <Form.Control
                                type="number"
                                value={productData.price}
                                onChange={(e) => setProductData({...productData, price: e.target.value})}
                                placeholder="0"
                                className={`py-2 ${styles.formControlMobile}`}
                            />
                            <InputGroup.Text>₽</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className={`fw-semibold ${styles.formLabelMobile}`}>
                            Изображение товара
                        </Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProductData({...productData, img: e.target.files[0]})}
                            className={`py-2 ${styles.formControlMobile}`}
                            size="sm"
                        />
                    </Form.Group>

                    <hr className="my-3" />

                    <div className={`d-flex justify-content-between align-items-center mb-3 ${styles.sectionHeaderMobile}`}>
                        <h6 className={`fw-semibold mb-0 ${styles.sectionTitleMobile}`}>
                            Дополнительные характеристики
                        </h6>
                        <Button 
                            variant="outline-primary" 
                            onClick={addInfo} 
                            size="sm"
                            className={styles.smallButtonMobile}
                        >
                            Добавить
                        </Button>
                    </div>

                    {info.map(i => (
                        <Card key={i.number} className={`mb-2 border-light ${styles.characteristicCardMobile}`}>
                            <Card.Body className="p-2">
                                <Row className="g-1 align-items-center">
                                    <Col xs={12} sm={5} className="mb-1">
                                        <Form.Control
                                            value={i.title}
                                            onChange={(e) => handleInfoChange(i.number, 'title', e.target.value)}
                                            placeholder="Название"
                                            size="sm"
                                            className={styles.smallInputMobile}
                                        />
                                    </Col>
                                    <Col xs={12} sm={5} className="mb-1">
                                        <Form.Control
                                            value={i.description}
                                            onChange={(e) => handleInfoChange(i.number, 'description', e.target.value)}
                                            placeholder="Значение"
                                            size="sm"
                                            className={styles.smallInputMobile}
                                        />
                                    </Col>
                                    <Col xs={12} sm={2}>
                                        <Button 
                                            variant="outline-danger" 
                                            onClick={() => removeInfo(i.number)}
                                            size="sm"
                                            className={`w-100 ${styles.smallButtonMobile}`}
                                        >
                                            Удалить
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}

                    {info.length === 0 && (
                        <div className={`text-center text-muted py-2 border rounded ${styles.emptyStateMobile}`}>
                            <small>Пока не добавлено ни одной характеристики</small>
                        </div>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label className={`fw-semibold ${styles.formLabelMobile}`}>
                            Колличество на складе
                        </Form.Label>
                        <InputGroup size="sm">
                            <Form.Control
                                type="number"
                                value={productData.quantityInStock}
                                onChange={(e) => setProductData({...productData, quantityInStock: e.target.value})}
                                placeholder="0"
                                className={`py-2 ${styles.formControlMobile}`}
                            />
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className={`bg-light ${styles.modalFooterMobile}`}>
                <Button 
                    variant="outline-secondary" 
                    onClick={onHide} 
                    className={`px-3 ${styles.buttonMobile}`}
                    size="sm"
                >
                    Отмена
                </Button>
                <Button 
                    variant="success" 
                    onClick={handleSubmit} 
                    className={`px-3 ${styles.buttonMobile}`}
                    size="sm"
                >
                    Добавить товар
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateProduct