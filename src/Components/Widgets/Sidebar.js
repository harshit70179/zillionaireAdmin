/* eslint-disable eqeqeq */
import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import sideMenuList from "../Enums/sideBarMenu";
import { useNavigate } from 'react-router-dom';
let pathName = window.location.pathname
function Sidebar() {
  let token = localStorage.getItem("jwtToken");
  const [activePath, setactivePath] = useState(pathName);
  const [userData, setUserData] = useState({})
  const history = useNavigate()
  useEffect(() => {
    if(token){
    const decoded = jwtDecode(token);
    setUserData(decoded)
  }
}, [token]);
  useEffect(() => {
    setactivePath(window.location.pathname);
  }, [history]);


  const _renderSideBar = (sidemenuList) => {
    return sidemenuList.map((item, index) => {
      let hasActiveChild = false;
      if (item.subMenu) {
        item.subMenu.forEach((e) => {
          if (activePath === e.route) {
            hasActiveChild = true
          }
        });
      }
      return (
     
        <Fragment key={index}>
          {typeof item.subMenu == "undefined" ? (
            <li className="nav-item"  >
              <Link
                to={item.route}
                className={
                  window.location.pathname === item.route
                    ? "nav-link active nav-link1"
                    : "nav-link nav-link1"
                }
          
              >
                <i className={item.icon} />{" "}
                <span data-key="t-dashboards">{item.title}</span>
              </Link>
            </li>
          ) : (
            <li className="nav-item dropdown" >
              <Link
                className="nav-link dropdown-toggle"
               to=""
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
               
              >
               <i className={item.icon} />{" "}

                <span data-key="t-dashboards">{item.title}</span>
              </Link>
              <ul
                className={
                  hasActiveChild
                    ? "dropdown-menu position-static show"
                    : "dropdown-menu position-static"
                }
                aria-labelledby="navbarDropdown"
              >
                {_renderSideSubMenu(item.subMenu || [])}
              </ul>
            </li>
          )}
        </Fragment>
      );
    });
  };

  const _renderSideSubMenu = (subItem) => {
    return subItem.map((item, index) => {
      return (
        <Fragment key={index}>
          <li className="nav-item"  >
            <Link
              to={item.route}
              className={
                window.location.pathname === item.route
                  ? // window.location.pathname = {item.subMenu}
                    "nav-link active nav-link1"
                  : "nav-link nav-link1"
              }
           
              // {window.location.pathname=== {item.title}}
            > <i className={item.icon} />{" "}
              <span data-key="t-dashboards">{item.title}</span>
            </Link>
          </li>
        </Fragment>
      );
    });
  };

  return (
    <div id="scrollbar">
      <div className="simplebar-content" style={{ padding: "0px" }}>
        <div className="container-fluid p-0">
          <ul className="navbar-nav" id="navbar-nav">
            {_renderSideBar(sideMenuList || [])}
            <></>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
