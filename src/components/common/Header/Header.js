import React from "react";
import "./../styles/Header.css";
import { IoIosLogIn, IoIosMenu,IoIosBusiness } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleClickManagementAccounts = () => {
    navigate('/managementAccountUser');
  };

  const handleClickManagementProducts = () => {
    navigate('/managementProducts');
  };

  const handleClickManagementOrders = () => {
    navigate('/managementOrders');
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark navbar-header">
        <div className="container">
      
          <button className="login-button-header-menu" onClick={handleClickManagementProducts}>
            <FaHome className="icon-header" />
            <div className="header-name">Management Products</div>
          </button>

          <button className="login-button-header-menu" onClick={handleClickManagementOrders}>
            <IoIosBusiness className="icon-header" />
            <div className="header-name">Management Orders</div>
          </button>

          <button className="login-button-header-menu" onClick={handleClickManagementAccounts}>
            <IoIosMenu className="icon-header" />
            <div className="header-name">Management Accounts</div>
          </button>

          <button onClick={handleLogin} className="login-button-header">
            <IoIosLogIn className="icon-header" />
          </button>
        </div>
      </nav>
    </header>
  );
}
