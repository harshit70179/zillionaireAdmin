import React, { useState,useEffect } from 'react'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { InputValid } from '../../validations/InputValid';
import { toast } from "react-toastify";
import { SelectValid } from '../../validations/SelectValid';
import { useSetSubCategoryMutation } from '../../../redux/subCategoryApi';

function AddSubCategoryModal(props) {
  const [setSubCategory] = useSetSubCategoryMutation()
  const [categoryList,setCategoryList]=useState([])
  const [mainCategoryId, setMainCategoryId] = useState("")
  const [mainCategoryIdErr, setMainCategoryIdErr] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [categoryIdErr, setCategoryIdErr] = useState("")
  const [name, setName] = useState("")
  const [nameErr, setNameErr] = useState("")

  useEffect(()=>{
     if(mainCategoryId){
      const filter=props?.category?.filter((list)=>{return parseInt(mainCategoryId) === list.main_category_id})
      setCategoryList(filter)
     }
  },[mainCategoryId,props])

  const handleClose = () => {
    setName("")
    setMainCategoryId("")
    setMainCategoryIdErr("")
    setCategoryIdErr("")
    setCategoryId("")
    setNameErr("")
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
    if (name === "categoryId") {
      setCategoryId(value);
      const err = SelectValid(name, value);
      setCategoryIdErr(err);
    }
  }
  const onsubmit = (e) => {
    e.preventDefault()
    const checkName = InputValid("name", name);
    const checkMainCategoryId = SelectValid("main category", mainCategoryId);
    const checkCategoryId = SelectValid("category", categoryId);
    if (checkMainCategoryId) {
      setMainCategoryIdErr(checkMainCategoryId);
      return false;
    }
    if (checkCategoryId) {
      setCategoryIdErr(checkCategoryId);
      return false;
    }
    if (checkName) {
      setNameErr(checkName);
      return false;
    }
    const data = {
      name: name,
      main_category_id: mainCategoryId,
      category_id:categoryId
    }
    setSubCategory(data).then((result) => {
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
            Add Sub Category
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
              <Form.Label>Category <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Select
                name="categoryId"
                onChange={handlechange}
                value={categoryId}
              >
                <option value="">Select Category</option>
                {
                  categoryList?.map((list) => {
                    return (
                      <option value={list.id} key={list.id}>{list.name}</option>
                    )
                  })
                }
              </Form.Select>
              <span style={{ color: "red" }}>{categoryIdErr}</span>
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

export default AddSubCategoryModal
