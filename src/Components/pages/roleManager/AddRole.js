import React, { useState } from "react";
import { useSetRoleMutation } from "../../../redux/RoleApi";
import { RoleValid } from "../../validations/RoleValid";
import { toast } from "react-toastify";
import Header from "../../Widgets/Header";
import Navbar from "../../Widgets/Navbar";
import { useNavigate } from "react-router-dom";

function AddRole() {
  const navigate = useNavigate();
  const [setRole] = useSetRoleMutation();
  const [disable, setDisable] = useState(false);
  const [roleField, setRoleField] = useState({
    name: "",
    email: "",
    password: "",
    mobileNo: "",
  });
  const [roleFieldErr, setRoleFieldErr] = useState({
    name: "",
    email: "",
    password: "",
    mobileNo: "",
  });
  const [checkBoxField, setCheckBoxField] = useState({
    is_dashboard: "1",
    is_user_management: "0",
    is_order_history: "0",
    is_explore: "0",
    is_products: "0",
    is_hometitle: "0",
    is_category: "0",
    is_banner:"0",
    is_faq:"0",
    is_sitepolicy:"0"
  });
  const handleRoleField = (e) => {
    const { name, value } = e.target;
    setRoleField({ ...roleField, [name]: value });
    let checkLogin = RoleValid(name, value);
    setRoleFieldErr({ ...roleFieldErr, [name]: checkLogin });
  };
  const handleCheckBox = (e) => {
    const { name, value } = e.target;
    setCheckBoxField({ ...checkBoxField, [name]: value });
  };
  const addRole = async (e) => {
    e.preventDefault();
    setDisable(true);

    setTimeout(() => {
      setDisable(false);
    }, 3000);
    for (let key in roleField) {
      let checkRole = RoleValid(key, roleField[key]);
      setRoleFieldErr({ ...roleFieldErr, [key]: checkRole });
      if (checkRole !== "") {
        return false;
      }
    }

    const data = {
      userName: roleField.name,
      email: roleField.email,
      mobile_number: roleField.mobileNo,
      password: roleField.password,
      is_dashboard:checkBoxField.is_dashboard ,
      is_user_management: checkBoxField.is_user_management,
      is_order_history:checkBoxField.is_order_history ,
      is_explore: checkBoxField.is_explore,
      is_products: checkBoxField.is_products,
      is_hometitle: checkBoxField.is_hometitle,
      is_category: checkBoxField.is_category,
      is_banner:checkBoxField.is_banner,
      is_faq:checkBoxField.is_faq,
      is_sitepolicy:checkBoxField.is_sitepolicy
    };
    setRole(data).then((result) => {
      if (result.data.status) {
        toast.dismiss();
        toast.success(result.data.message);
        setTimeout(() => {
          navigate("/role-list");
        }, 2000);
      } else {
        toast.dismiss();
        toast.error(result.data.message);
      }
    });
  };
  return (
    <div id="layout-wrapper">
      <Header />
      <Navbar />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="section-heading">
              <h2>
                <b>Add Role</b>
              </h2>
            </div>

            <div className="product-list-outer card p-3 p-md-4">
              <form>
                <div>
                  <div className="tab-content ">
                    <div className="tab-pane active show" id="details">
                      <div className="row mt-2">
                        <div className="col-md-6">
                          <label className="form-label" htmlFor="contestStatus">Name</label>
                          <input
                            onChange={handleRoleField}
                            value={roleField.name}
                            name="name"
                            type="text"
                            className="form-control"
                          />
                          <span className="text-danger">
                            {roleFieldErr.name}
                          </span>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label" htmlFor="email">Email</label>
                          <input
                            onChange={handleRoleField}
                            value={roleField.email}
                            name="email"
                            type="text"
                            className="form-control"
                          />
                          <span className="text-danger">
                            {roleFieldErr.email}
                          </span>
                        </div>
                        
                      </div>

                      
                      <div className="row mt-2">
                        <div className="col-md-6">
                          <label className="form-label" htmlFor="password">Password</label>
                          <input
                            onChange={handleRoleField}
                            value={roleField.password}
                            name="password"
                            type="password"
                            className="form-control"
                          />
                          <span className="text-danger">
                            {roleFieldErr.password}
                          </span>
                        </div>
                     
                    
                        <div className="col-md-6">
                          <label className="form-label" htmlFor="mobile">Mobile Number</label>
                          <input
                            onChange={handleRoleField}
                            value={roleField.mobileNo}
                            name="mobileNo"
                            type="tel"
                            className="form-control"
                          />
                          <span className="text-danger">
                            {roleFieldErr.mobileNo}
                          </span>
                        </div>
                        
                      </div>

                      <div className="row mt-3">
                    
                      <div className="col-md-6">
                      <div className="row mt-2">
                        <div className="col-md-5">
                          <label className="form-label" htmlFor="intrestRate">User Management</label>
                        </div>
                        <div className="col-md-7">
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={
                                  checkBoxField.is_user_management === "1"
                                }
                                onChange={handleCheckBox}
                                value="1"
                                name="is_user_management"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              Yes
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={
                                  checkBoxField.is_user_management === "0"
                                }
                                onChange={handleCheckBox}
                                value="0"
                                name="is_user_management"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      </div>
                        <div className="col-md-6">
                      <div className="row mt-2">
                        <div className="col-md-5">
                          <label  className="form-label" htmlFor="loan">Order History</label>
                        </div>
                        <div className="col-md-7">
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_order_history === "1"}
                                onChange={handleCheckBox}
                                value="1"
                                name="is_order_history"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              Yes
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_order_history === "0"}
                                onChange={handleCheckBox}
                                value="0"
                                name="is_order_history"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      </div>
                      </div>
                      <div className="row">
                      <div className="col-md-6">
                      <div className="row mt-2">
                        <div className="col-md-5">
                          <label className="form-label" htmlFor="marginCall">Category</label>
                        </div>
                        <div className="col-md-7">
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_category === "1"}
                                onChange={handleCheckBox}
                                value="1"
                                name="is_category"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              Yes
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_category === "0"}
                                onChange={handleCheckBox}
                                value="0"
                                name="is_category"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      </div>
                      <div className="col-md-6">
                      <div className="row mt-2">
                        <div className="col-md-5">
                          <label className="form-label" htmlFor="liquidations">Explore</label>
                        </div>
                        <div className="col-md-7">
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={
                                  checkBoxField.is_explore === "1"
                                }
                                onChange={handleCheckBox}
                                value="1"
                                name="is_explore"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              Yes
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={
                                  checkBoxField.is_explore === "0"
                                }
                                onChange={handleCheckBox}
                                value="0"
                                name="is_explore"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      </div>
                      </div>
                      <div className="row">
                      <div className="col-md-6">
                      <div className="row mt-2">
                        <div className="col-md-5">
                          <label className="form-label" htmlFor="cryptoCurrency">Products</label>
                        </div>
                        <div className="col-md-7">
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_products === "1"}
                                onChange={handleCheckBox}
                                value="1"
                                name="is_products"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              Yes
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_products === "0"}
                                onChange={handleCheckBox}
                                value="0"
                                name="is_products"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      </div>
                      <div className="col-md-6">
                      <div className="row mt-2">
                        <div className="col-md-5">
                          <label  className="form-label" htmlFor="pairManagement">
                             Banner
                          </label>
                        </div>
                        <div className="col-md-7">
                          <div className="form-check-inline">
                            <label >
                              <input
                                checked={
                                  checkBoxField.is_banner === "1"
                                }
                                onChange={handleCheckBox}
                                value="1"
                                name="is_banner"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              Yes
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={
                                  checkBoxField.is_banner === "0"
                                }
                                onChange={handleCheckBox}
                                value="0"
                                name="is_banner"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      </div>
                      </div>

                      <div className="row ">
                      <div className="col-md-6">
                      <div className="row mt-2">
                        <div className="col-md-5">
                          <label className="form-label" htmlFor="suportManagement">
                            Home Title
                          </label>
                        </div>
                        <div className="col-md-7">
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_hometitle === "1"}
                                onChange={handleCheckBox}
                                value="1"
                                name="is_hometitle"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              Yes
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_hometitle === "0"}
                                onChange={handleCheckBox}
                                value="0"
                                name="is_hometitle"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      </div>
                      </div>

                      <div className="row ">
                      <div className="col-md-6">
                      <div className="row mt-2">
                        <div className="col-md-5">
                          <label className="form-label" htmlFor="suportManagement">
                            FAQ
                          </label>
                        </div>
                        <div className="col-md-7">
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_faq === "1"}
                                onChange={handleCheckBox}
                                value="1"
                                name="is_faq"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              Yes
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_faq === "0"}
                                onChange={handleCheckBox}
                                value="0"
                                name="is_faq"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      </div>
                      </div>
                      <div className="row ">
                      <div className="col-md-6">
                      <div className="row mt-2">
                        <div className="col-md-5">
                          <label className="form-label" htmlFor="suportManagement">
                           Site Policy
                          </label>
                        </div>
                        <div className="col-md-7">
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_sitepolicy === "1"}
                                onChange={handleCheckBox}
                                value="1"
                                name="is_sitepolicy"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              Yes
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_sitepolicy === "0"}
                                onChange={handleCheckBox}
                                value="0"
                                name="is_sitepolicy"
                                type="radio"
                                className="form-check-input me-2"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      </div>
                      </div>

                   
                      <button className="btn btn-primary ps-3 pe-3 mt-4"
                        onClick={(e) => {
                          addRole(e);
                        }}
                        disabled={disable}
                      >
                        Save
                      </button>
                    
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRole;
