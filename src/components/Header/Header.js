// src/components/Header.js
import React, { useState } from "react";
import "./Header.css";
import { IoIosLogIn, IoIosMenu } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { RiListSettingsFill } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"; // Import Drawer

export default function Header() {
  // Sử dụng hook useNavigate để lấy một hàm chuyển hướng
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Tạo một hàm để xử lý sự kiện khi nhấn nút
  const handleLogin = () => {
    // Chuyển hướng người dùng đến trang đăng nhập
    navigate("/");
  };
  const handleListItemClick = (index) => {
    switch (index) {
      case 0:
        // Navigate to the home route
        navigate("/home");
        break;
      case 1:
        // Navigate to the management route
        navigate("/management");
        break;
      default:
        // Handle other cases (optional)
        console.warn("Unhandled list item index:", index);
    }
  };

  const location = useLocation();

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark navbar-header">
        <div className="container">
          <button
            className="login-button-header-menu"
            onClick={() => setOpen(!open)}
          >
            <IoIosMenu className="icon-header" />
          </button>
          <button onClick={handleLogin} className="login-button-header">
            <IoIosLogIn className="icon-header" />
          </button>
        </div>
      </nav>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List>
          {["Home", "Product Management"].map((text, index) => (
            <ListItem
              key={text}
              button
              onClick={() => handleListItemClick(index)}
              selected={location.pathname === "/management" && index === 1}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <FaHome /> : <RiListSettingsFill />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </header>
  );
}