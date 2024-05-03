import React, { useState, useEffect } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function OrderViewModal(props) {
    const [products, setProducts] = useState([])
     console.log(props?.currentRecord,"props?.currentRecord")
    const handleClose = () => {
        props.setShow(false);
    };

    useEffect(() => {
        if (props?.currentRecord.product_items) {
            setProducts(JSON.parse(props?.currentRecord?.product_items))
        }
    }, [props])

    return (
        <div>
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {" "}
                    <Modal.Title style={{ color: "black" }}>
                        Order View
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='product-item'>
                        {products?.map((list) => {
                            return (
                                <div className='cart-item' key={list.id}>
                                    <div><img src={list?.images} alt=''/></div>
                                    <div>
                                        <h6>{list.title}</h6>
                                        <p>{list.finishing} / {list.size}</p>
                                    </div>
                                    <div>
                                    <p>Quantity</p>
                                        <p>{list.quantity}</p>
                                    </div>
                                    <div>
                                    <p>Rate</p>
                                        <p>${list.price}</p>
                                    </div>
                                    <div>
                                        <p>Total</p>
                                        <p>${list.price * list.quantity}</p>
                                        
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div className='total'>
                        <div>
                            <p>Subtotal</p>
                            <p>${props?.currentRecord?.total}</p>
                        </div>
                        <hr/>
                        <div>
                            <p>Grand Total</p>
                            <p>${props?.currentRecord?.grand_total}</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default OrderViewModal
