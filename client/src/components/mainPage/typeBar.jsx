import React, { useContext, useState } from "react";
import { Context } from "../../main.jsx";
import { observer } from "mobx-react-lite";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';


const TypeBar = observer(() => {
    const {product} = useContext(Context)
    const navigate = useNavigate()
    const [imageErrors, setImageErrors] = useState({})

    const navToProd = (type) => {
        navigate(`/product?typeProductId=${type.id}`)
    }

    const handleImageError = (typeId) => {
        setImageErrors(prev => ({...prev, [typeId]: true}))
    }

    return (
        <section id="products" className="products-section">
            <div className="section-header">
                <h2 className="section-title">Наша Продукция</h2>
                <p className="section-subtitle">Качественные изделия из натурального дерева</p>
            </div>
            <div className="typebarContainer">
                <div className="typebarRow">
                {product.types.map(type =>
                    <Card key={type.id} className="typebarCard">
                    <div className="typebarImageContainer">
                        {!imageErrors[type.id] ? (
                            <Card.Img
                                variant="top" 
                                src={import.meta.env.VITE_STATIC_URL + 'static/' + type.img} 
                                alt={type.name}
                                className="typebarImage"
                                onError={() => handleImageError(type.id)}
                            />
                        ) : (
                            <div className="typebarImageFallback">
                                {type.name}
                            </div>
                        )}
                    </div>
                    <Card.Body className="typebarBody">
                        <Card.Title className="typebarTitle">{type.name}</Card.Title>
                        <Card.Text className="typebarText">{type.about}</Card.Text>
                        <Button 
                        variant="warning" 
                        className="typebarButton"
                        onClick={() => navToProd(type)}>
                            Посмотреть варианты
                        </Button>
                    </Card.Body>
                    </Card>
                )}
                </div>
            </div>
        </section>  
    )
})

export default TypeBar;