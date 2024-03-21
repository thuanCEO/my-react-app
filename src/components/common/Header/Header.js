import React, { useEffect, useState } from "react";
import "./../styles/Header.css";
import { IoIosLogIn, IoIosMenu, IoIosBusiness } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [role, setUserRole] = useState(0);

  useEffect(() => {
    const roleFromSession = sessionStorage.getItem("role");
    if (roleFromSession) {
      setUserRole(parseInt(roleFromSession));
    }
  }, []);

  const handleClickManagementAccounts = () => {
    navigate("/managementAccountUser");
  };

  const handleClickManagementProducts = () => {
    navigate("/managementProducts");
  };

  const handleClickManagementOrders = () => {
    navigate("/managementOrders");
  };

  const handleClickManagement = () => {
    navigate("/managements");
  };
  const handleClickStaff = () => {
    navigate("/staffs");
  };
  const handleClickAdmin = () => {
    navigate("/admin");
  };

  const handleLogin = () => {
    sessionStorage.removeItem("role");
    setUserRole(0); 
    navigate("/");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark navbar-header">
        <div className="container">
           {(role === 1) && (
          <button
            className="login-button-header-menu"
            onClick={handleClickAdmin}
          >
            <FaHome className="icon-header" />
            <div className="header-name">Home</div>
          </button>
          )}
            {(role === 2) && (
          <button
            className="login-button-header-menu"
            onClick={handleClickManagement}
          >
            <FaHome className="icon-header" />
            <div className="header-name">Home</div>
          </button>
          )}
            {(role === 3) && (
          <button
            className="login-button-header-menu"
            onClick={handleClickStaff}
          >
            <FaHome className="icon-header" />
            <div className="header-name">Home</div>
          </button>
          )}


          {(role === 3 || role === 2) && (
          <button
            className="login-button-header-menu"
            onClick={handleClickManagementProducts}
          >
            <IoIosBusiness className="icon-header" />
            <div className="header-name">Management Products</div>
          </button>
          )}

          {(role === 3 || role === 2) && (
            <button
              className="login-button-header-menu"
              onClick={handleClickManagementOrders}
            >
              <IoIosBusiness className="icon-header" />
              <div className="header-name">Management Orders</div>
            </button>
          )}

          {role === 2 && (
            <button
              className="login-button-header-menu"
              onClick={handleClickManagementAccounts}
            >
              <IoIosMenu className="icon-header" />
              <div className="header-name">Management Accounts</div>
            </button>
          )}

          <button onClick={handleLogin} className="login-button-header">
            <IoIosLogIn className="icon-header" />
          </button>
        </div>
      </nav>
    </header>
  );
}
