import React, { useContext, useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './adminPage.module.css'
import { deleteProducts, getAllProduct, patchProducts } from "../../http/deviceApi";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";

const PatchQuantProduct = observer(({show, onHide}) => {
    const [productData, setProductData] = useState({
        name: '',
        quantityInStock: '',
    });

    const {product} = useContext(Context);

    const patchProd = () => {

        patchProducts(productData).then(data => {
            setProductData({
                name: '',
                quantityInStock: '',
            })
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
        >
            <Modal.Header closeButton className={styles.modalHeaderMobile}>
                <Modal.Title className={`fw-bold text-dark ${styles.modalTitleMobile}`}>
                    Изменить колличество на складе
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBodyMobile}>
                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label className={`fw-semibold ${styles.formLabelMobile}`}>
                            Выберите товар
                        </Form.Label>
                        <Form.Select 
                            value={productData.name}
                            onChange={(e) => setProductData({...productData, name: e.target.value})}
                            className={`py-2 ${styles.formControlMobile}`}
                            size="sm"
                        >
                            <option value="">Товары</option>
                            {product.products.map(product => 
                                <option key={product.id} value={product.name}>{product.name}</option>
                            )}
                        </Form.Select>

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
                    onClick={patchProd} 
                    className={`px-3 ${styles.buttonMobile}`}
                    size="sm"
                >
                    Изменить колличество
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default PatchQuantProduct