import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './adminPage.module.css'
import { deleteType, getTypes } from "../../http/deviceApi";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";

const DeleteType = observer(({show, onHide}) => {
    const [typeName, setTypeName] = useState('');

    const {product} = useContext(Context);

    const handleSubmit = () => {

        deleteType(typeName).then(data => {
            setTypeName('')
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
                    Удалить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBodyMobile}>
                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label className={`fw-semibold ${styles.formLabelMobile}`}>
                            Выберите тип для удаления
                        </Form.Label>
                        <Form.Select 
                            value={typeName}
                            onChange={(e) => setTypeName(e.target.value)}
                            className={`py-2 ${styles.formControlMobile}`}
                            size="sm"
                        >
                            <option value="">Типы</option>
                            {product.types.map(type => 
                                <option key={type.id} value={type.name}>{type.name}</option>
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
                    onClick={handleSubmit} 
                    className={`px-3 ${styles.buttonMobile}`}
                    size="sm"
                >
                    Удалить тип
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default DeleteType