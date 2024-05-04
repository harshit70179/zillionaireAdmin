import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { InputValid } from '../../validations/InputValid';
import { toast } from "react-toastify";
import { SelectValid } from '../../validations/SelectValid';
import { useSetSocialMediaMutation } from '../../../redux/socialmediaApi';
import { socialMediaEnum } from '../../constant/enum';

function AddSocialModal(props) {
  const [setSocialMedia] = useSetSocialMediaMutation()
  const [title, setTitle] = useState("")
  const [titleErr, setTitleErr] = useState("")
  const [url, setUrl] = useState("")
  const [urlErr, setUrlErr] = useState("")

  const handleClose = () => {
    setTitle("")
    setTitleErr("")
    setUrl("")
    setUrlErr("")
    props.setAddModal(false)
  }
  const handlechange = (e) => {
    const { name, value } = e.target
    if (name === "url") {
        setUrl(value);
      const err = InputValid(name, value);
      setUrlErr(err);
    }
    if (name === "title") {
        setTitle(value);
      const err = SelectValid(name, value);
      setTitleErr(err);
    }
  }
  const onsubmit = (e) => {
    e.preventDefault()
    const checkTitle = SelectValid("title", title);
    const checkurl = InputValid("url", url);
    if (checkTitle) {
        setTitleErr(checkTitle);
      return false;
    }
    if (checkurl) {
        setUrlErr(checkurl);
      return false;
    }
     
      const data = {
        title: title,
        url:url,
      }
      setSocialMedia(data).then((result) => {
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
            Add Social Media
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Select
                name="title"
                onChange={handlechange}
                value={title}
              >
                <option value="">Select Title</option>
                {
                  socialMediaEnum?.map((list) => {
                    return (
                      <option value={list.value} key={list.key}>{list.key}</option>
                    )
                  })
                }
              </Form.Select>
              <span style={{ color: "red" }}>{titleErr}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Name <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                name="url"
                onChange={handlechange}
                type="text"
                value={url}
              ></Form.Control>
              <span style={{ color: "red" }}>{urlErr}</span>
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

export default AddSocialModal
