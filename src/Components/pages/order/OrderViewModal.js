import React, { useState, useEffect } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function OrderViewModal(props) {
    const [products, setProducts] = useState([])
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
                    <div>
                        <div className='d-flex justify-content-between'>
                        <p><b>First Name : </b>{props?.currentRecord?.first_name}</p>
                        <p><b>Last Name : </b>{props?.currentRecord?.last_name}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                        <p><b>Email : </b>{props?.currentRecord?.email}</p>
                        <p><b>Address : </b>{props?.currentRecord?.address}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className='product-item'>
                        {products?.map((list) => {
                             let discount=list?.save>0?(list.price)-((list.price*list.save)/100):list.price
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
                                        <p>${discount}</p>{list?.save>0?<del>${list?.price}</del>:""}
                                    </div>
                                    <div>
                                        <p>Total</p>
                                        <p>${discount * list.quantity}</p>
                                        
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
                    {props.currentRecord?.gift_note?<div>
                        <h5>Gift Note</h5>
                        <p>{props.currentRecord?.gift_note}</p>
                    </div>:""}
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
