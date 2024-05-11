import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useGetDashboardQuery } from "../../redux/dashboardApi";

function Dashboard() {
  const {data,isLoading}=useGetDashboardQuery()

  return (
    <div id="layout-wrapper">
      <Header />
      <Navbar />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid p-0 mt-2">
            <div className="row dashbord_man">
              <div className="col-md-3 col-sm-6 col-12 card-space">
                <div className="card card-animate">
                  <Link to="/users">
                    <div className="card-body">
                      <p className="fw-medium mb-0">Total Users</p>
                      <div className="d-flex justify-content-between count-outer">
                        <div>
                        <h2 className="ff-secondary fw-semibold">
                            <span className="counter-value" data-target={100}>
                              {isLoading ? (
                                <div
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                data?.user
                              )}
                            </span>
                          </h2>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title rounded-circle fs-1">
                              <span className="mdi mdi-account-group"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-12 card-space">
                <div className="card card-animate">
                  <Link to="/main-category">
                    <div className="card-body">
                      <p className="fw-medium mb-0">Total Main Category</p>
                      <div className="d-flex justify-content-between count-outer">
                        <div>
                        <h2 className="ff-secondary fw-semibold">
                            <span className="counter-value" data-target={100}>
                              {isLoading ? (
                                <div
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                data?.main_category
                              )}
                            </span>
                          </h2>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title rounded-circle fs-1">
                              <span className="mdi mdi-account-group"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-12 card-space">
                <div className="card card-animate">
                  <Link to="/category">
                    <div className="card-body">
                      <p className="fw-medium mb-0">Total Category</p>
                      <div className="d-flex justify-content-between count-outer">
                        <div>
                        <h2 className="ff-secondary fw-semibold">
                            <span className="counter-value" data-target={100}>
                              {isLoading ? (
                                <div
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                data?.category
                              )}
                            </span>
                          </h2>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title rounded-circle fs-1">
                              <span className="mdi mdi-account-group"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-12 card-space">
                <div className="card card-animate">
                  <Link to="/sub-category">
                    <div className="card-body">
                      <p className="fw-medium mb-0">Total Sub Category</p>
                      <div className="d-flex justify-content-between count-outer">
                        <div>
                        <h2 className="ff-secondary fw-semibold">
                            <span className="counter-value" data-target={100}>
                              {isLoading ? (
                                <div
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                data?.sub_category
                              )}
                            </span>
                          </h2>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title rounded-circle fs-1">
                              <span className="mdi mdi-account-group"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-12 card-space">
                <div className="card card-animate">
                  <Link to="/products">
                    <div className="card-body">
                      <p className="fw-medium mb-0">Total Products</p>
                      <div className="d-flex justify-content-between count-outer">
                        <div>
                        <h2 className="ff-secondary fw-semibold">
                            <span className="counter-value" data-target={100}>
                              {isLoading ? (
                                <div
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                data?.products
                              )}
                            </span>
                          </h2>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title rounded-circle fs-1">
                              <span className="mdi mdi-package-variant-closed"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-12 card-space">
                <div className="card card-animate">
                  <Link to="/banner">
                    <div className="card-body">
                      <p className="fw-medium mb-0">Total Banner</p>
                      <div className="d-flex justify-content-between count-outer">
                        <div>
                        <h2 className="ff-secondary fw-semibold">
                            <span className="counter-value" data-target={100}>
                              {isLoading ? (
                                <div
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                data?.banner
                              )}
                            </span>
                          </h2>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title rounded-circle fs-1">
                              <span className="mdi mdi-panorama-variant"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-12 card-space">
                <div className="card card-animate">
                  <Link to="/home-title">
                    <div className="card-body">
                      <p className="fw-medium mb-0">Total Home Title</p>
                      <div className="d-flex justify-content-between count-outer">
                        <div>
                        <h2 className="ff-secondary fw-semibold">
                            <span className="counter-value" data-target={100}>
                              {isLoading ? (
                                <div
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                data?.home_title
                              )}
                            </span>
                          </h2>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title rounded-circle fs-1">
                              <span className="mdi mdi-home"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-12 card-space">
                <div className="card card-animate">
                  <Link to="/order-history">
                    <div className="card-body">
                      <p className="fw-medium mb-0">Total Order</p>
                      <div className="d-flex justify-content-between count-outer">
                        <div>
                        <h2 className="ff-secondary fw-semibold">
                            <span className="counter-value" data-target={100}>
                              {isLoading ? (
                                <div
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                data?.order
                              )}
                            </span>
                          </h2>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title rounded-circle fs-1">
                              <span className="mdi mdi-cart-variant"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-12 card-space">
                <div className="card card-animate">
                  <Link to="/order-history">
                    <div className="card-body">
                      <p className="fw-medium mb-0">Total Pending Order</p>
                      <div className="d-flex justify-content-between count-outer">
                        <div>
                        <h2 className="ff-secondary fw-semibold">
                            <span className="counter-value" data-target={100}>
                              {isLoading ? (
                                <div
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                data?.pending_order
                              )}
                            </span>
                          </h2>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title rounded-circle fs-1">
                              <span className="mdi mdi-cart-variant"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-12 card-space">
                <div className="card card-animate">
                  <Link to="/order-history">
                    <div className="card-body">
                      <p className="fw-medium mb-0">Total Processing Order</p>
                      <div className="d-flex justify-content-between count-outer">
                        <div>
                        <h2 className="ff-secondary fw-semibold">
                            <span className="counter-value" data-target={100}>
                              {isLoading ? (
                                <div
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                data?.processing_order
                              )}
                            </span>
                          </h2>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title rounded-circle fs-1">
                              <span className="mdi mdi-cart-variant"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-12 card-space">
                <div className="card card-animate">
                  <Link to="/order-history">
                    <div className="card-body">
                      <p className="fw-medium mb-0">Total Shipping Order</p>
                      <div className="d-flex justify-content-between count-outer">
                        <div>
                        <h2 className="ff-secondary fw-semibold">
                            <span className="counter-value" data-target={100}>
                              {isLoading ? (
                                <div
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                data?.shipping_order
                              )}
                            </span>
                          </h2>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title rounded-circle fs-1">
                              <span className="mdi mdi-cart-variant"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-12 card-space">
                <div className="card card-animate">
                  <Link to="/order-history">
                    <div className="card-body">
                      <p className="fw-medium mb-0">Total Delivered Order</p>
                      <div className="d-flex justify-content-between count-outer">
                        <div>
                        <h2 className="ff-secondary fw-semibold">
                            <span className="counter-value" data-target={100}>
                              {isLoading ? (
                                <div
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                data?.delivered_order
                              )}
                            </span>
                          </h2>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title rounded-circle fs-1">
                              <span className="mdi mdi-cart-variant"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default Dashboard;
