import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './adminPage.module.css'
import { deleteProducts, getAllProduct } from "../../http/deviceApi";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";

const DeleteProduct = observer(({show, onHide}) => {
    const [productName, setProductName] = useState('');

    const {product} = useContext(Context);

    const delProd = () => {

        deleteProducts(productName).then(data => {
            setProductName('')
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
                    Удалить товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBodyMobile}>
                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label className={`fw-semibold ${styles.formLabelMobile}`}>
                            Выберите товар для удаления
                        </Form.Label>
                        <Form.Select 
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className={`py-2 ${styles.formControlMobile}`}
                            size="sm"
                        >
                            <option value="">Товары</option>
                            {product.products.map(product => 
                                <option key={product.id} value={product.name}>{product.name}</option>
                            )}
                        </Form.Select>
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
                    variant="danger" 
                    onClick={delProd} 
                    className={`px-3 ${styles.buttonMobile}`}
                    size="sm"
                >
                    Удалить товар
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default DeleteProduct