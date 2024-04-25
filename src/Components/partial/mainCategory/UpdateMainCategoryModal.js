import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { InputValid } from '../../validations/InputValid';
import { toast } from "react-toastify";
import { useUpdateMainCategoryMutation } from '../../../redux/mainCategoryApi';

function UpdateMainCategoryModal(props) {
    const [updateMainCategory] = useUpdateMainCategoryMutation()
    const [name, setName] = useState("")
    const [nameErr, setNameErr] = useState("")
    const [id,setId]=useState("")

    useEffect(()=>{
         if(props.currentRecord){
          setId(props.currentRecord.id)
          setName(props.currentRecord.name)
         }
    },[props])

    const handleClose = () => {
        setName("")
        props.setUpdateModal(false)
    }
    const handlechange = (e) => {
        const { name, value } = e.target
        setName(value);
        const err = InputValid(name, value);
        setNameErr(err);
    }
    const onsubmit = (e) => {
        e.preventDefault()
        const checkName = InputValid("name", name);
        if (checkName) {
            setNameErr(checkName);
            return false;
          }
        const data = {
            name: name,
            id:id
        }
        updateMainCategory(data).then((result) => {
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
                        Update Main Category
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> Name <span style={{ color: "red" }}>*</span></Form.Label>
                            <Form.Control
                                name="name"
                                onChange={handlechange}
                                type="text"
                                value={name}
                            ></Form.Control>
                            <span style={{ color: "red" }}>{nameErr}</span>
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

export default UpdateMainCategoryModal
