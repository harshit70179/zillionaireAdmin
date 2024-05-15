import React, { useState, useEffect } from "react";
import {
  useGetRoleByIdQuery,
  useUpdateRoleMutation,
} from "../../../redux/RoleApi";
import { RoleValid } from "../../validations/RoleValid";
import { toast } from "react-toastify";
import Header from "../../Widgets/Header";
import Navbar from "../../Widgets/Navbar";
import { useNavigate, useParams } from "react-router-dom";

function EditRole() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: record, refetch } = useGetRoleByIdQuery({ id: id });
  const [updateRole] = useUpdateRoleMutation();
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
    is_dashboard: "0",
    is_user_management: "0",
    is_user_history: "0",
    is_admin_management: "0",
    is_coin_list: "0",
    is_promotion_banner: "0",
    is_support: "0",
    is_amount_request:"0"
  });
  useEffect(() => {
    if (record) {
      let email = record.email;
      let mobileNo = record.mobile_number;
      let name = record.name;
      let password = "";
      let is_dashboard = record.is_dashboard;
      let is_user_management = record.is_user_management;
      let is_user_history = record.is_user_history;
      let is_admin_management = record.is_admin_management;
      let is_coin_list = record.is_coin_list;
      let is_promotion_banner = record.is_promotion_banner;
      let is_support = record.is_support;
      let is_amount_request=record.is_amount_request
      setRoleField({
        name: name,
        email: email,
        password: password,
        mobileNo: mobileNo,
      });
      setCheckBoxField({
        is_dashboard: is_dashboard,
        is_user_management: is_user_management,
        is_user_history: is_user_history,
        is_admin_management: is_admin_management,
        is_coin_list: is_coin_list,
        is_promotion_banner: is_promotion_banner,
        is_support: is_support,
        is_amount_request:is_amount_request
      });
    }
  }, [record]);
  useEffect(() => {
    refetch();
  }, [id]);

  const handleRoleField = (e) => {
    const { name, value } = e.target;
    setRoleField({ ...roleField, [name]: value });
    let checkLogin = RoleValid(name, value, id);
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
      // Exclude the "password" key
      if (key !== "password") {
        let checkRole = RoleValid(key, roleField[key]);
        setRoleFieldErr({ ...roleFieldErr, [key]: checkRole });
        if (checkRole !== "") {
          return false;
        }
      }
    }
    if (roleField.password) {
      let checkRole = RoleValid("password", roleField["password"]);
      setRoleFieldErr({ ...roleFieldErr, password: checkRole });
      if (checkRole !== "") {
        return false;
      }
    }

    const data = {
      name: roleField.name,
      email: roleField.email,
      mobile_number: roleField.mobileNo,
      password: roleField.password,
      is_admin_management: checkBoxField.is_admin_management,
      is_coin_list: checkBoxField.is_coin_list,
      is_dashboard: checkBoxField.is_dashboard,
      is_promotion_banner: checkBoxField.is_promotion_banner,
      is_support: checkBoxField.is_support,
      is_user_history: checkBoxField.is_user_history,
      is_user_management: checkBoxField.is_user_management,
      is_amount_request:checkBoxField.is_amount_request,
      id: id,
    };
    updateRole(data).then((result) => {
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
                <b>Edit Role</b>
              </h2>
            </div>
            <div className="product-list-outer card p-3">
              <form>
                <div className="white_box">
                  <div className="tab-content ">
                    <div className="tab-pane active show" id="details">
                      <div className="row mt-2">
                        <div className="col-md-3">
                          <label htmlFor="contestStatus">Name</label>
                        </div>
                        <div className="col-md-9">
                          <input
                            onChange={handleRoleField}
                            value={roleField.name}
                            name="name"
                            type="text"
                            className="form-control"
                            disabled
                          />
                          <span className="text-danger">
                            {roleFieldErr.name}
                          </span>
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-md-3">
                          <label htmlFor="email">Email</label>
                        </div>
                        <div className="col-md-9">
                          <input
                            onChange={handleRoleField}
                            value={roleField.email}
                            name="email"
                            type="text"
                            className="form-control"
                            disabled
                          />
                          <span className="text-danger">
                            {roleFieldErr.email}
                          </span>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-3">
                          <label htmlFor="password">Password</label>
                        </div>
                        <div className="col-md-9">
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
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-3">
                          <label htmlFor="mobile">Mobile Number</label>
                        </div>
                        <div className="col-md-9">
                          <input
                            onChange={handleRoleField}
                            value={roleField.mobileNo}
                            name="mobileNo"
                            type="tel"
                            className="form-control"
                            disabled
                          />
                          <span className="text-danger">
                            {roleFieldErr.mobileNo}
                          </span>
                        </div>
                      </div>

                      
                      <div className="row mt-2">
                        <div className="col-md-3">
                          <label htmlFor="intrestRate">User Management</label>
                        </div>
                        <div className="col-md-9">
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
                                className="form-check-input"
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
                                className="form-check-input"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-3">
                          <label htmlFor="marginCall">user History</label>
                        </div>
                        <div className="col-md-9">
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_user_history === "1"}
                                onChange={handleCheckBox}
                                value="1"
                                name="is_user_history"
                                type="radio"
                                className="form-check-input"
                              />
                              Yes
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_user_history === "0"}
                                onChange={handleCheckBox}
                                value="0"
                                name="is_user_history"
                                type="radio"
                                className="form-check-input"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-3">
                          <label htmlFor="liquidations">Admin Management</label>
                        </div>
                        <div className="col-md-9">
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={
                                  checkBoxField.is_admin_management === "1"
                                }
                                onChange={handleCheckBox}
                                value="1"
                                name="is_admin_management"
                                type="radio"
                                className="form-check-input"
                              />
                              Yes
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={
                                  checkBoxField.is_admin_management === "0"
                                }
                                onChange={handleCheckBox}
                                value="0"
                                name="is_admin_management"
                                type="radio"
                                className="form-check-input"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-3">
                          <label htmlFor="loan">Amount Request</label>
                        </div>
                        <div className="col-md-9">
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_amount_request === "1"}
                                onChange={handleCheckBox}
                                value="1"
                                name="is_amount_request"
                                type="radio"
                                className="form-check-input"
                              />
                              Yes
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_amount_request === "0"}
                                onChange={handleCheckBox}
                                value="0"
                                name="is_amount_request"
                                type="radio"
                                className="form-check-input"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-3">
                          <label htmlFor="cryptoCurrency">Coin List</label>
                        </div>
                        <div className="col-md-9">
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_coin_list === "1"}
                                onChange={handleCheckBox}
                                value="1"
                                name="is_coin_list"
                                type="radio"
                                className="form-check-input"
                              />
                              Yes
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_coin_list === "0"}
                                onChange={handleCheckBox}
                                value="0"
                                name="is_coin_list"
                                type="radio"
                                className="form-check-input"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-3">
                          <label htmlFor="pairManagement">
                            Promotion Banner
                          </label>
                        </div>
                        <div className="col-md-9">
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={
                                  checkBoxField.is_promotion_banner === "1"
                                }
                                onChange={handleCheckBox}
                                value="1"
                                name="is_promotion_banner"
                                type="radio"
                                className="form-check-input"
                              />
                              Yes
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={
                                  checkBoxField.is_promotion_banner === "0"
                                }
                                onChange={handleCheckBox}
                                value="0"
                                name="is_promotion_banner"
                                type="radio"
                                className="form-check-input"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-md-3">
                          <label htmlFor="suportManagement">
                            Support Management
                          </label>
                        </div>
                        <div className="col-md-9">
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_support === "1"}
                                onChange={handleCheckBox}
                                value="1"
                                name="is_support"
                                type="radio"
                                className="form-check-input"
                              />
                              Yes
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                checked={checkBoxField.is_support === "0"}
                                onChange={handleCheckBox}
                                value="0"
                                name="is_support"
                                type="radio"
                                className="form-check-input"
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>

                      <hr />
                      <button
                        onClick={(e) => {
                          addRole(e);
                        }}
                        disabled={disable}
                      >
                        Update
                      </button>
                      <hr />
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

export default EditRole;
