import React, { useEffect } from "react";
import Login from "./Components/auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Dashboard from "./Components/Widgets/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { Banner } from "./Components/pages/banner/Banner";
import { UserData } from "./Components/pages/user/UserData";
import MainCategory from "./Components/pages/mainCategory/MainCategory";
import Category from "./Components/pages/category/Category";
import SubCategory from "./Components/pages/subCategory/SubCategory";
import Product from "./Components/pages/product/Product";
import AddProduct from "./Components/partial/product/AddProduct";
import HomeTitle from "./Components/pages/hometitle/HomeTitle";
import HomeProduct from "./Components/pages/hometitle/HomeProduct";
import SitePolicy from "./Components/pages/sitePolicy/SitePolicy";
import Faq from "./Components/pages/faq/Faq";
import { OrderHistory } from "./Components/pages/order/OrderHistory";
import UpdateProduct from "./Components/partial/product/UpdateProduct";
import { SocialMedia } from "./Components/pages/socialMedia/SocialMedia";



function App() {
  const { login } = useAuth();

  useEffect(() => {
    // Check if a JWT token is stored in localStorage and log in the user if found
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      login();
    }
  }, [login]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={<Dashboard />} />}
          />
           <Route
            path="/banner"
            element={<ProtectedRoute component={<Banner />} />}
          />
          <Route
            path="/user-list"
            element={<ProtectedRoute component={<UserData />} />}
          />
          <Route
            path="/main-category"
            element={<ProtectedRoute component={<MainCategory />} />}
          />
         <Route
            path="/category"
            element={<ProtectedRoute component={<Category />} />}
          />
          <Route
            path="/sub-category"
            element={<ProtectedRoute component={<SubCategory />} />}
          />
         <Route
            path="/product"
            element={<ProtectedRoute component={<Product />} />}
          />
          <Route
            path="/add-product"
            element={<ProtectedRoute component={<AddProduct />} />}
          />
          <Route
            path="/update-product/:id"
            element={<ProtectedRoute component={<UpdateProduct />} />}
          />
            <Route
            path="/home-title"
            element={<ProtectedRoute component={<HomeTitle />} />}
          />
          <Route
            path="/home-product/:id"
            element={<ProtectedRoute component={<HomeProduct />} />}
          />
          <Route
            path="/site-policy"
            element={<ProtectedRoute component={<SitePolicy />} />}
          />
          <Route
            path="/faq"
            element={<ProtectedRoute component={<Faq />} />}
          />
           <Route
            path="/order-history"
            element={<ProtectedRoute component={<OrderHistory />} />}
          />
           <Route
            path="/social-media"
            element={<ProtectedRoute component={<SocialMedia />} />}
          />
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
