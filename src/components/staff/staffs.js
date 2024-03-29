import "./../common/styles/home.css";
import {
  DollarCircleOutlined,
  ProductFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";
import React, { useState, useEffect } from "react";
import AxiosClient from "../../api/axiosClient";
function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

export default function Staff() {
  const [orders, setTotalOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [userInfo, setUserInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const calculateTotalProducts = async () => {
    try {
      const response = await AxiosClient.get("/api/Products");
      const totalProducts = response.data.length; // Đếm số lượng sản phẩm
      setProducts(response.data);
      console.log("Total products:", totalProducts);
    } catch (error) {
      console.error("Error calculating total products:", error);
    }
  };
  const calculateRevenue = async () => {
    try {
      const response = await AxiosClient.get("/api/Orders");
      const totalPrice = response.data.reduce((total, order) => total + order.TotalPrice, 0);
      setRevenue(totalPrice);
    } catch (error) {
      console.error("Error calculating revenue:", error);
    }
  };
  const calculateTotalOrders = async () => {
    try {
      const response = await AxiosClient.get("/api/Orders");
      const totalOrders = response.data.length; // Đếm số lượng đơn hàng
      setTotalOrders(totalOrders);
    } catch (error) {
      console.error("Error calculating total orders:", error);
    }
  };
  useEffect(() => {
    calculateTotalOrders();
    calculateRevenue();

    calculateTotalProducts();

    // Retrieving user data from session storage
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    console.log("User Data:", userData);
    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");
    const role = sessionStorage.getItem("role");
    setUserInfo({ name, email, role });
  }, []);

  return (
    <div className="profile-container">
      <Space size={25} direction="vertical" className="dashboard-home-page">
        <Typography.Title level={4} className="justify-content-center "></Typography.Title>
        <Space
          direction="horizontal"
          className="justify-content-center"
        >
            <DashboardCard
            icon={<ProductFilled className="dashboard-icon-green" />}
            title={"Products"}
            value={products.length}  
          />
          <DashboardCard
            icon={<ShoppingCartOutlined className="dashboard-icon-green" />}
            title={"Orders"}
            value={orders}  
          />
          <DashboardCard
            icon={<DollarCircleOutlined className="dashboard-icon-red" />}
            title={"Revenue"}
            value={revenue}
          />
        </Space>
      </Space>
    </div>
  );
}
