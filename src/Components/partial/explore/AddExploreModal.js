import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ImageValid } from "../../validations/ImageValid";
import { toast } from "react-toastify";
import { SelectValid } from "../../validations/SelectValid";
import { useSetExploreMutation } from "../../../redux/exploreApi";

function AddExploreModal(props) {
  const [setExplore] = useSetExploreMutation();
  const [category, setCategory] = useState("");
  const [categoryErr, setCategoryErr] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageErr, setImageErr] = useState(false);

  const handleClose = () => {
    setCategory("");
    setImage("");
    setCategoryErr("");
    setImageErr("");
    setImageUrl("")
    props.setShow(false);
  };
  const handlechange = (e) => {
    let { name, value } = e.target;
    if (name === "category") {
      setCategory(value);
      const err = SelectValid(name, value);
      setCategoryErr(err);
    }
  };
  const handlechangeimage = (e) => {
    let { name } = e.target;

    const image = e.target.files[0];
    if (name === "exploreimage") {
      setImage(image);
      let checkImage = ImageValid(name, image);
      setImageErr(checkImage);
      setImageUrl(URL.createObjectURL(image))
    }
  };
  const onsubmit = async (e) => {
    const checkCategory = SelectValid("category", category);
    if (checkCategory) {
      setCategoryErr(checkCategory);
      return false;
    }
    let checkImage = ImageValid("image", image);
    if (checkImage) {
      setImageErr(checkImage);
      return false;
    }

    const formdata = new FormData();
    formdata.append("main_category_id", category);
    formdata.append("explore_image", image);
    setExplore(formdata).then((result) => {
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
            Add Explore
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Category </Form.Label>
              <Form.Select
                name="category"
                onChange={handlechange}
                value={category}
              >
                <option value="">Select category</option>
                {
                  props?.mainCategory?.map((list) => {
                    return (
                      <option value={list.id} key={list.id}>{list.name}</option>
                    )
                  })
                }
              </Form.Select>
              <span style={{ color: "red" }}>{categoryErr}</span>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Explore Image</Form.Label>
              <Form.Control
                type="file"
                name="exploreimage"
                onChange={handlechangeimage}
              />
              <span style={{ color: "red" }}>{imageErr}</span>
            </Form.Group>
            <img
                style={{ width: "100px" }}
                src={imageUrl}
                className="img-fluid"
                alt=""
              />
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

export default AddExploreModal;
