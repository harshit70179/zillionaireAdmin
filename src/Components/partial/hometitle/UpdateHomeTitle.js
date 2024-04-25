import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { InputValid } from '../../validations/InputValid';
import { toast } from "react-toastify";
import { useUpdateHomeTitleMutation } from '../../../redux/homeTitleApi';

function UpdateHomeTitleModal(props) {
    const [updateHomeTitle] = useUpdateHomeTitleMutation()
    const [title, setTitle] = useState("")
    const [titleErr, setTitleErr] = useState("")
    const [id,setId]=useState("")

    useEffect(()=>{
        if(props.currentRecord){
            setTitle(props.currentRecord.title)
            setId(props.currentRecord.id)
        }
    },[props])

    const handleClose = () => {
        setTitle("")
        setTitleErr("")
        props.setUpdateModal(false)
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
            title: title,
            id:id
        }
        updateHomeTitle(data).then((result) => {
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
            <Modal show={props.updateModal} onHide={handleClose}>
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
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onsubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UpdateHomeTitleModal
