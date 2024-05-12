import React, { useState,useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import ChangePasswordModal from "../partial/ChangePasswordModal";
import $ from 'jquery'


function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [show, setShow] = useState(false);

  const adminlogout = () => {
    localStorage.clear();
    logout();
    navigate("/");
  };

  const handleShow = (id) => {
    setShow(true);
  };
  useEffect(() => {
    const box = document.getElementById("box1");
      box.addEventListener("click", () => {
        if (box.classList.contains("toggle")) {
          box.classList.remove("toggle");
        } else {
          box.classList.add("toggle");
        }
      });
      $(document).ready(function() {
        // Handle checkbox click
        $(".nav-link1").click(function () {
          $(".body").toggleClass("mobile-menu");
        });
  
        // Handle nav-link click
        $("#box1").click(function () {
          $(".body").toggleClass("mobile-menu");
        });
      });
     

  }, [])
  

  return (
    <>
      {" "}
      <header id="page-topbar">
        <div className="layout-width">
          <div className="navbar-header">
            <div id="box1" className="box">
              <span></span>
            </div>
            <Link to={"/dashboard"} className="logo_mobile">
          <img src="/assets/images/logo_mobile.png" alt="" className="img-fluid" />
        </Link>
            <div className="d-flex"></div>
            <div className="d-flex align-items-center">
              <div className="dropdown ms-sm-3 header-item topbar-user">
                <button
                  type="button"
                  className="btn shadow-none"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center">
                    <img
                      className="rounded-circle header-profile-user"
                      src="/assets/images/avatar-1.jpg"
                      alt="Header Avatar"
                    />
                    <span className="text-start ms-xl-2">
                      <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                        Admin
                      </span>
                    </span>
                  </span>
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  <h6 className="dropdown-header">Welcome Admin!</h6>
                  <Link
                    className="dropdown-item"
                    to=""
                    onClick={() => handleShow()}
                  >
                    <span className="align-middle">Change Password</span>
                  </Link>
                  <Link
                    className="dropdown-item"
                    to=""
                    onClick={(e) => adminlogout(e)}
                  >
                    <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />
                    <span className="align-middle" data-key="t-logout">
                      Logout
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <ChangePasswordModal show={show} setShow={setShow} />
    </>
  );
}
export default Header;
