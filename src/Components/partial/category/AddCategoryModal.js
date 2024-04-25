import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { InputValid } from '../../validations/InputValid';
import { toast } from "react-toastify";
import { useSetCategoryMutation } from '../../../redux/categoryApi'
import { SelectValid } from '../../validations/SelectValid';

function AddCategoryModal(props) {
  const [setCategory] = useSetCategoryMutation()
  const [mainCategoryId, setMainCategoryId] = useState("")
  const [mainCategoryIdErr, setMainCategoryIdErr] = useState("")
  const [name, setName] = useState("")
  const [nameErr, setNameErr] = useState("")
  const [start,setStart]=useState("")
  const [end,setEnd]=useState("")
  const [step,setStep]=useState("")
  const [sizeName,setSizeName]=useState("")

  const handleClose = () => {
    setName("")
    setMainCategoryId("")
    setMainCategoryIdErr("")
    setNameErr("")
    setStart("")
    setEnd("")
    setStep("")
    setSizeName("")
    props.setAddModal(false)
  }
  const handlechange = (e) => {
    const { name, value } = e.target
    if (name === "name") {
      setName(value);
      const err = InputValid(name, value);
      setNameErr(err);
    }
    if (name === "mainCategoryId") {
      setMainCategoryId(value);
      const err = SelectValid(name, value);
      setMainCategoryIdErr(err);
    }
    if(name==="start"){
      setStart(value)
    }
    if(name==="step"){
      setStep(value)
    }
    if(name==="end"){
      setEnd(value)
    }
    if(name==="sizeName"){
      setSizeName(value)
    }
  }
  const onsubmit = (e) => {
    e.preventDefault()
    const checkName = InputValid("name", name);
    const checkMainCategoryId = SelectValid("main category", mainCategoryId);
    if (checkMainCategoryId) {
      setMainCategoryIdErr(checkMainCategoryId);
      return false;
    }
    if (checkName) {
      setNameErr(checkName);
      return false;
    }
      let size=[]
      for(let i=parseFloat(start);i<=parseFloat(end);i=i+parseFloat(step)){
        size.push(i+" "+sizeName)
      }
      const data = {
        name: name,
        main_category_id: mainCategoryId,
        start:start,
        end:end,
        step:step,
        size_name:sizeName,
        size:JSON.stringify(size)
      }
      setCategory(data).then((result) => {
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
            Add Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Main Category <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Select
                name="mainCategoryId"
                onChange={handlechange}
                value={mainCategoryId}
              >
                <option value="">Select Main Category</option>
                {
                  props?.mainCategory?.map((list) => {
                    return (
                      <option value={list.id} key={list.id}>{list.name}</option>
                    )
                  })
                }
              </Form.Select>
              <span style={{ color: "red" }}>{mainCategoryIdErr}</span>
            </Form.Group>
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Start</Form.Label>
              <Form.Control
                name="start"
                onChange={handlechange}
                type="number"
                value={start}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> End</Form.Label>
              <Form.Control
                name="end"
                onChange={handlechange}
                type="number"
                value={end}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Step </Form.Label>
              <Form.Control
                name="step"
                onChange={handlechange}
                type="number"
                value={step}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Size Name</Form.Label>
              <Form.Select
                name="sizeName"
                onChange={handlechange}
                value={sizeName}
              >
                <option value="">Select name</option>
                <option value="US">US</option>
                <option value="Inches">Inches</option>
  
              </Form.Select>
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

export default AddCategoryModal
