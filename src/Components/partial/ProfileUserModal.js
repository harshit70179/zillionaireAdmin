import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
function ProfileUserModal(props) {
  const [profileDetail, setProfileDetail] = useState({});
  useEffect(() => {
    setProfileDetail(props.profileDetail);
  }, [props]);

  const handleClose = () => {
    props.setProfileShow(false);
  };
  return (
    <Modal show={props.profileShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "black" }}>Profile Detail</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col-md-8">
            <div className="bank_details">
              <p>
                <b>User Name :</b> {profileDetail?.user_name}
              </p>
              <p>
                <b>Name :</b> {profileDetail?.name}
              </p>
              <p>
                <b>mobile Number :</b> {profileDetail?.mobile_number}
              </p>
              <p>
                <b>Email :</b> {profileDetail?.email}
              </p>
              <p>
                <b>Level1 Address :</b> {profileDetail?.address}
              </p>
              <p>
                <b>Level2 Address :</b>{" "}
                {profileDetail?.aadhar_address}
              </p>
            </div>
          </div>
          <div className="col-md-4">
            {profileDetail.photo && <img src={profileDetail.photo} alt=""/>}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ProfileUserModal;
