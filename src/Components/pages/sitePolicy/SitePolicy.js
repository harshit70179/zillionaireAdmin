import React, { useState } from "react";
import { toast } from "react-toastify";
import Tac from "./Tac";
import Shipping from "./Shipping";
import ReturnPolicy from "./ReturnPolicy";
import Header from "../../Widgets/Header";
import Navbar from "../../Widgets/Navbar";
import { useGetSitePolicyQuery, useSetSitePolicyMutation } from "../../../redux/sitePolicyApi";
import PrivacyPolicy from "./PrivacyPolicy";

function SitePolicy() {
  const {data}=useGetSitePolicyQuery()
  const [setSitePolicy]=useSetSitePolicyMutation()
  const [activeTab, setActiveTab] = useState("Tac");

  const handleTab = (value) => {
    setActiveTab(value);
  };
  
  const onHandleSubmit=(data)=>{
    setSitePolicy(data).then((result) => {
      if (result.data.status) {
        toast.dismiss();
        toast.success(result.data.message);
      }
    });
  }

  return (
    <div id="layout-wrapper">
      <Header />
      <Navbar />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="section-heading">
              <h2>
                <b>Site Setting</b>
              </h2>
            </div>
            <div className="product-list-outer">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "Tac" ? "active" : ""
                    }`}
                    aria-current="page"
                    onClick={() => {
                      handleTab("Tac");
                    }}
                  >
                    Term and Conditions
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "Shipping" ? "active" : ""
                    }`}
                    aria-current="page"
                    onClick={() => {
                      handleTab("Shipping");
                    }}
                  >
                    Shipping
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "Return" ? "active" : ""
                    }`}
                    aria-current="page"
                    onClick={() => {
                      handleTab("Return");
                    }}
                  >
                    Return
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "pp" ? "active" : ""}`}
                    aria-current="page"
                    onClick={() => {
                      handleTab("pp");
                    }}
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
              <div className="setting-box mt-1  ">
                 {activeTab==="Return" && <ReturnPolicy data={data} onHandleSubmit={onHandleSubmit}/>}
                 {activeTab==="Shipping" && <Shipping data={data} onHandleSubmit={onHandleSubmit}/>}
                 {activeTab==="Tac" && <Tac data={data} onHandleSubmit={onHandleSubmit}/>}
                 {activeTab==="pp" && <PrivacyPolicy data={data} onHandleSubmit={onHandleSubmit}/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SitePolicy;