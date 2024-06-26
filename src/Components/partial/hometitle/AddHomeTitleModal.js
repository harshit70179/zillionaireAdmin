import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { InputValid } from '../../validations/InputValid';
import { toast } from "react-toastify";
import { useSetHomeTitleMutation } from '../../../redux/homeTitleApi';

function AddHomeTitleModal(props) {
    const [setHomeTitle] = useSetHomeTitleMutation()
    const [title, setTitle] = useState("")
    const [titleErr, setTitleErr] = useState("")

    const handleClose = () => {
        setTitle("")
        setTitleErr("")
        props.setAddModal(false)
    }
    const handlechange = (e) => {
        const { name, value } = e.target
        setTitle(value);
        const err = InputValid(name, value);
        setTitleErr(err);
    }
    const onsubmit = (e) => {
        e.preventDefault()
        const checkTitle = InputValid("title", title);
        if (checkTitle) {
            setTitleErr(checkTitle);
            return false;
        }
        const data = {
            title: title
        }
        setHomeTitle(data).then((result) => {
            if (result.data.status) {
                toast.dismiss();
                toast.success(result.data.message);
                handleClose()
            }
            else {
                toast.dismiss();
                toast.error(result.data.message);
            }
        })
    }

    return (
        <div>
            <Modal show={props.addModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    {" "}
                    <Modal.Title style={{ color: "black" }}>
                        Add Home Title
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> Title <span style={{ color: "red" }}>*</span></Form.Label>
                            <Form.Control
                                name="title"
                                onChange={handlechange}
                                type="text"
                                value={title}
                            ></Form.Control>
                            <span style={{ color: "red" }}>{titleErr}</span>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-primary" variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className="btn btn-primary" variant="primary" onClick={onsubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddHomeTitleModal
