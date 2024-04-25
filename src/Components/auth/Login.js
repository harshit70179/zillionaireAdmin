import React, { useState, useEffect } from "react";
import { logIn } from "../services/Login";
import { LoginValid } from "../validations/LoginValid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { authenticated, login } = useAuth();
  const navigate = useNavigate();
  const [loginField, setLoginField] = useState({ email: "", password: "" });
  const [loginFieldErr, setLoginFieldErr] = useState({
    email: "",
    password: "",
  });
  const [passwordShow, setPasswordShow] = useState({
    eye: "fa-eye-slash",
    type: "password",
  });

  useEffect(() => {
    if (!authenticated) {
      navigate("/", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  }, [authenticated, navigate]);
  const showcurrentPassword = () => {
    if (passwordShow.type === "password") {
      setPasswordShow({ eye: "fa-eye", type: "text" });
    } else {
      setPasswordShow({ eye: "fa-eye-slash", type: "password" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginField({ ...loginField, [name]: value });
    let checkLogin = LoginValid(name, value);
    setLoginFieldErr({ ...loginFieldErr, [name]: checkLogin });
  };
  const onLogin = async (event) => {
    event.preventDefault();
    for (let key in loginField) {
      let checkLogin = LoginValid(key, loginField[key]);
      setLoginFieldErr({ ...loginFieldErr, [key]: checkLogin });
      if (checkLogin !== "") {
        return false;
      }
    }
    let LoginData = {
      email: loginField.email,
      password: loginField.password,
    };
    let result = await logIn(LoginData);
    if (result.status) {
      let token = result.authtoken;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userType", result.type);
      login();
      toast.success(result.message);
      setTimeout(function () {
        navigate("/dashboard", { replace: true });
      }, 2000);
      return false;
    } else {
      toast.dismiss();
      toast.error(result.message);
      return;
    }
  };
  return (
    <div className="login d-flex nm-aic nm-vh-md-100">
      <div className="nm-tm-wr">
        <div className="m-auto  login-box ">
          <div className="text-center">
            <img
              src="assets/images/logo.png"
              alt=""
              className="img-fluid login_logo"
            />
            <h4 className="mb-4">Login to Admin</h4>
          </div>
          <form className="pb-md-5">
            <div className="input-group nm-gp">
              <div className="password-group user-box">
                <input
                  type="text"
                  id="email"
                  onChange={handleChange}
                  name="email"
                  value={loginField.email}
                />
                <label>Email</label>
                <span className="text-danger">{loginFieldErr.email}</span>
              </div>
            </div>
            <div className="input-group nm-gp ">
              <div className="password-group user-box">
                <input
                  type={passwordShow.type}
                  className="password"
                  id="password"
                  onChange={handleChange}
                  name="password"
                  value={loginField.password}
                />
                <label>Password</label>
                <span
                  role="button"
                  onClick={showcurrentPassword}
                  className="eye-icon"
                >
                  <i className={`fa ${passwordShow.eye}`}></i>
                </span>
              </div>
              <span className="text-danger">{loginFieldErr.password}</span>
            </div>

            <div className=" nm-aic nm-mb-1">
              <div className="login-btn">
                <button
                  type="submit"
                  className="btn nm-hvr nm-btn-2 w100"
                  onClick={onLogin}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Log In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
