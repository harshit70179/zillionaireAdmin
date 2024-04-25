import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ImageValid } from "../../validations/ImageValid";
import { InputValid } from "../../validations/InputValid";
import { useSetBannerMutation } from "../../../redux/bannerApi";
import { toast } from "react-toastify";
import { SelectValid } from "../../validations/SelectValid";
import { bannerType, showBannerEnum } from "../../constant/enum";

function BannerAddModal(props) {
  const [setProBanner] = useSetBannerMutation();
  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [type, setType] = useState("");
  const [typeErr, setTypeErr] = useState("");
  const [image, setImage] = useState("");
  const [imageErr, setImageErr] = useState(false);
  const [showBanner,setShowBanner]=useState("")
  const [showBannerErr,setShowBannerErr]=useState("")
  const handleClose = () => {
    setTitle("");
    setImage("");
    setTitleErr("");
    setImageErr("");
    props.setShow(false);
  };
  const handlechange = (e) => {
    let { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
      const err = InputValid(name, value);
      setTitleErr(err);
    }
    if (name === "type") {
      setType(value);
      const err = SelectValid(name, value);
      setTypeErr(err);
    }
    if (name === "showBanner") {
      setShowBanner(value);
      const err = SelectValid(name, value);
      setShowBannerErr(err);
    }
  };
  const handlechangeimage = (e) => {
    let { name } = e.target;

    const image = e.target.files[0];
    if (name === "bannerimage") {
      setImage(image);
      let checkImage = ImageValid(name, image);
      setImageErr(checkImage);
    }
  };
  const onsubmit = async (e) => {
    const checkTitle = InputValid("title", title);
    if (checkTitle) {
      setTitleErr(checkTitle);
      return false;
    }
    const checkType = SelectValid("type", type);
    if (checkType) {
      setTypeErr(checkType);
      return false;
    }
    const checkShowBanner = SelectValid("show banner", showBanner);
    if (checkShowBanner) {
      setShowBannerErr(checkShowBanner);
      return false;
    }
    let checkImage = ImageValid("image", image);
    if (checkImage) {
      setImageErr(checkImage);
      return false;
    }

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("type", type);
    formdata.append("show_banner", showBanner);
    formdata.append("banner_image", image);
    setProBanner(formdata).then((result) => {
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

  };
  return (
    <div>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          {" "}
          <Modal.Title style={{ color: "black" }}>
            Add Banner
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Title </Form.Label>
              <Form.Control
                name="title"
                onChange={handlechange}
                type="text"
              ></Form.Control>
              <span style={{ color: "red" }}>{titleErr}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Type </Form.Label>
              <Form.Select
                name="type"
                onChange={handlechange}
                value={type}
              >
                <option value="">Select type</option>
                {
                  bannerType.map((list) => {
                    return (
                      <option value={list.value} key={list.key}>{list.key}</option>
                    )
                  })
                }
              </Form.Select>
              <span style={{ color: "red" }}>{typeErr}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Show Banner <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Select
                name="showBanner"
                onChange={handlechange}
                value={showBanner}
              >
                <option value="">Select Option</option>
                {
                  showBannerEnum.map((list) => {
                    return (
                      <option value={list.value} key={list.key}>{list.key}</option>
                    )
                  })
                }
              </Form.Select>
              <span style={{ color: "red" }}>{showBannerErr}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Banner Image</Form.Label>
              <img
                style={{ width: "100px" }}
                src={image}
                className="img-fluid"
                alt=""
              />
              <Form.Control
                type="file"
                name="bannerimage"
                onChange={handlechangeimage}
              />
              <span style={{ color: "red" }}>{imageErr}</span>
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
  );
}

export default BannerAddModal;
