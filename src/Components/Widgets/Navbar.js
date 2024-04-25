import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function Navbar() {



  return (
    <div className="app-menu navbar-menu">
      <div className="navbar-brand-box">
        <Link to={"/dashboard"} className="logo logo-dark">
          <img src="/assets/images/logo.png" alt="" className="img-fluid" />
        </Link>
        <button
          type="button"
          className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
          id="vertical-hover"
        >
          <i className="ri-record-circle-line" />
        </button>
      </div>
      <Sidebar />
    </div>
  );
}
export default Navbar;
