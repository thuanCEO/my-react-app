// src/components/Header.js
import React from 'react';
import './Header.css'; 
import { IoIosLogIn } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


export default function Header () {
  // Sử dụng hook useNavigate để lấy một hàm chuyển hướng
  const navigate = useNavigate();

  // Tạo một hàm để xử lý sự kiện khi nhấn nút
  const handleLogin = () => {
    // Chuyển hướng người dùng đến trang đăng nhập
    navigate('/');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarNav">
          <button onClick={handleLogin} className="login-button">
            <IoIosLogIn className="icon" />
          </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
