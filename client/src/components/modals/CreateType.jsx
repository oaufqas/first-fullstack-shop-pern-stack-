import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './adminPage.module.css'
import { createType } from "../../http/deviceApi";
import { observer } from "mobx-react-lite";

const CreateType = observer(({show, onHide}) => {
    const [typeData, setTypeData] = useState({
        name: '',
        about: '',
        img: null
    });

    const handleSubmit = () => {

        
        const formData = new FormData()
        formData.append('name', typeData.name)
        formData.append('about', typeData.about)
        formData.append('img', typeData.img)

        createType(formData).then(data => {
            setTypeData({name: '', about: '', img: null})
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
                    Добавить новый тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBodyMobile}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className={`fw-semibold ${styles.formLabelMobile}`}>
                            Название типа
                        </Form.Label>
                        <Form.Control
                            value={typeData.name}
                            onChange={(e) => setTypeData({...typeData, name: e.target.value})}
                            placeholder="Тип"
                            className={`py-2 ${styles.formControlMobile}`}
                            size="sm"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className={`fw-semibold ${styles.formLabelMobile}`}>
                            Описание типа
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            value={typeData.about}
                            onChange={(e) => setTypeData({...typeData, about: e.target.value})}
                            placeholder="Краткое описание категории товаров"
                            className={`py-2 ${styles.formControlMobile}`}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className={`fw-semibold ${styles.formLabelMobile}`}>
                            Изображение типа
                        </Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => setTypeData({...typeData, img: e.target.files[0]})}
                            className={`py-2 ${styles.formControlMobile}`}
                        />
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
                    Добавить тип
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateType