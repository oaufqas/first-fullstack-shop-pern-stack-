import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import CreateProduct from "../components/modals/CreateProduct";
import CreateType from "../components/modals/CreateType";
import styles from '../components/modals/adminPage.module.css'
import DeleteType from "../components/modals/DeleteType";
import DeleteProduct from "../components/modals/DeleteProduct";
import { Context } from "../main";
import { getAllProduct, getTypes } from "../http/deviceApi";
import PatchQuantProduct from "../components/modals/PatchQuantProd";

const AdminPage = () => {
    const [typeVisible, setTypeVisible] = useState(false);
    const [productVisible, setProductVisible] = useState(false);
    const [delTypeVisible, setDelTypeVisible] = useState(false);
    const [delProductVisible, setDelProductVisible] = useState(false);
    const [patchVisible, setPatchVisible] = useState(false);
    const {product} = useContext(Context);

    useEffect(() => {
        getTypes().then(dataTypes => product.setTypes(dataTypes))

        getAllProduct().then(dataProducts => product.setProducts(dataProducts.rows))
    }, [])




    return (
        <Container className={`d-flex flex-column align-items-center min-vh-100 py-4 ${styles.adminContainerMobile}`}>
            <Card className={`w-100 ${styles.adminCardMobile}`}>
                <Card.Header className={`bg-dark text-white text-center ${styles.adminHeaderMobile}`}>
                    <h4 className={`mb-0 ${styles.adminTitleMobile}`}>Admin page</h4>
                </Card.Header>
                <Card.Body className={`p-3 ${styles.adminBodyMobile}`}>
                    <div className="d-grid gap-2">
                        <Button 
                            variant="success" 
                            size="lg"
                            onClick={() => setTypeVisible(true)}
                            className={`py-3 fw-semibold ${styles.adminButtonMobile}`}
                        >
                            Добавить тип товара
                        </Button>
                        
                        <Button 
                            variant="success" 
                            size="lg"
                            onClick={() => setProductVisible(true)}
                            className={`py-3 fw-semibold ${styles.adminButtonMobile}`}
                        >
                            Добавить товар
                        </Button>

                        <hr className="my-2" style={{ borderColor: 'white', opacity: 1 }}/>

                        <Button 
                            variant="danger" 
                            size="lg"
                            onClick={() => setDelTypeVisible(true)}
                            className={`py-3 fw-semibold ${styles.adminButtonMobile}`}
                        >
                            Удалить тип
                        </Button>
                        
                        <Button 
                            variant="danger" 
                            size="lg"
                            onClick={() => setDelProductVisible(true)}
                            className={`py-3 fw-semibold ${styles.adminButtonMobile}`}
                        >
                            Удалить товар
                        </Button>

                        <hr className="my-2" style={{ borderColor: 'white', opacity: 1 }}/>

                        <Button 
                            variant="warning" 
                            size="lg"
                            onClick={() => setPatchVisible(true)}
                            className={`py-3 fw-semibold ${styles.adminButtonMobile}`}
                        >
                            Изменить колличество товара на складе
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <DeleteType show={delTypeVisible} onHide={() => setDelTypeVisible(false)}/>
            <DeleteProduct show={delProductVisible} onHide={() => setDelProductVisible(false)}/>
            <PatchQuantProduct show={patchVisible} onHide={() => setPatchVisible(false)}/>
        </Container>
    )
}

export default AdminPage