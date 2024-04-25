import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changePassword } from "../services/Login";
import { ChangePasswordValid } from "../validations/ChangePasswordValid";

function ChangePasswordModal(props) {
  const navigate = useNavigate();
  const [passwordfield, setPasswordfield] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordfieldErr, setPasswordfieldErr] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [disable, setdisable] = useState("");
  const [showNewPassword, setShowNewPassword] = useState({
    eye: "fa-eye-slash",
    type: "password",
  });
  const [showConfirmPassword, setShowConfirmPassword] = useState({
    eye: "fa-eye-slash",
    type: "password",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState({
    eye: "fa-eye-slash",
    type: "password",
  });
  const showcurrentPassword = () => {
    if (showCurrentPassword.type === "password") {
      setShowCurrentPassword({ eye: "fa-eye", type: "text" });
    } else {
      setShowCurrentPassword({ eye: "fa-eye-slash", type: "password" });
    }
  };
  const shownewPassword = () => {
    if (showNewPassword.type === "password") {
      setShowNewPassword({ eye: "fa-eye", type: "text" });
    } else {
      setShowNewPassword({ eye: "fa-eye-slash", type: "password" });
    }
  };
  const showconfirmPassword = () => {
    if (showConfirmPassword.type === "password") {
      setShowConfirmPassword({ eye: "fa-eye", type: "text" });
    } else {
      setShowConfirmPassword({ eye: "fa-eye-slash", type: "password" });
    }
  };
  const handlepassword = (e) => {
    const { name, value } = e.target;
    setPasswordfield({ ...passwordfield, [name]: value });
    let cPassword = passwordfield.confirmPassword;
    let nPassword = passwordfield.newPassword;
    let checkLogin = ChangePasswordValid(name, value, nPassword, cPassword);
    setPasswordfieldErr({
      ...passwordfieldErr,
      [checkLogin.name]: checkLogin.error,
    });
  };
  const handleClose = () => {
    setPasswordfield({
      currentpassword: "",
      newpassword: "",
      confirmpassword: "",
    });
    setPasswordfieldErr({
      currentpassword: "",
      newpassword: "",
      confirmpassword: "",
    });

    props.setShow(false);
  };
  const updatePassword = async (e) => {
    e.preventDefault();
    setdisable(true);
    setTimeout(() => {
      setdisable(false);
    }, 3000);
    let cPassword = passwordfield.confirmPassword;
    let nPassword = passwordfield.newPassword;
    for (let key in passwordfield) {
      let checkLogin = ChangePasswordValid(
        key,
        passwordfield[key],
        nPassword,
        cPassword
      );
      setPasswordfieldErr({
        ...passwordfieldErr,
        [checkLogin.name]: checkLogin.error,
      });
      if (checkLogin.error !== "") {
        return false;
      }
    }
    const data = {
      oldPassword: passwordfield.currentPassword,
      newPassword: passwordfield.newPassword,
      confirmPassword: passwordfield.confirmPassword,
    };
    const response = await changePassword(data);
    if (response.status) {
      toast(response.message);
      handleClose();
      setTimeout(() => {
        navigate("/", { replace: true });
        localStorage.clear();
      }, 2000);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Change Password </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Current Password </Form.Label>
              <div className="password-group">
                <Form.Control
                  type={showCurrentPassword.type}
                  name="currentPassword"
                  value={passwordfield.currentPassword}
                  placeholder="Enter Current Password"
                  onChange={handlepassword}
                  className="password"

                />
                <span
                  role="button"
                  onClick={showcurrentPassword}
                  className="eye-icon"
                >
                  <i className={`fa ${showCurrentPassword.eye}`}></i>
                </span>
              </div>

              <span style={{ color: "red" }}>
                {passwordfieldErr.currentPassword}
              </span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> New Password</Form.Label>
              <div className="password-group">
                <Form.Control
                  type={showNewPassword.type}
                  name="newPassword"
                  placeholder="Enter New Password"
                  value={passwordfield.newPassword}
                  onChange={handlepassword}
                  className="password"
                />
                <span
                  role="button"
                  onClick={shownewPassword}
                  className="eye-icon"
                >
                  <i className={`fa ${showNewPassword.eye}`}></i>
                </span>
              </div>
              <span style={{ color: "red" }}>
                {passwordfieldErr.newPassword}
              </span>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label> Confirm Password</Form.Label>
              <div className="password-group">
                <Form.Control
                  type={showConfirmPassword.type}
                  name="confirmPassword"
                  placeholder=" Enter Confirm Password"
                  value={passwordfield.confirmPassword}
                  rows={3}
                  onChange={handlepassword}
                  className="password"
                />
                <span
                  role="button"
                  onClick={showconfirmPassword}
                  className="eye-icon"
                >
                  <i className={`fa ${showConfirmPassword.eye}`}></i>
                </span>
              </div>
              <span style={{ color: "red" }}>
                {passwordfieldErr.confirmPassword}
              </span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              updatePassword(e);
            }}
            type ="submit"
            disabled={disable}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChangePasswordModal;
