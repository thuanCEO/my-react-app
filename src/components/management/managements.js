import React, { useState, useEffect } from "react";
import { Card, Space, Statistic, Typography } from "antd";
import { DollarCircleOutlined, ProductFilled, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
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

export default function Managements() {
  const [orders, setTotalOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const calculateTotalUsers = async () => { 
    try {
      const response = await AxiosClient.get("/api/Users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error calculating total users:", error);
    }
  };

  const calculateTotalProducts = async () => {
    try {
      const response = await AxiosClient.get("/api/Product");
      setProducts(response.data);
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
      setTotalOrders(response.data.length);
    } catch (error) {
      console.error("Error calculating total orders:", error);
    }
  };

  useEffect(() => {
    calculateTotalOrders();
    calculateRevenue();
    calculateTotalProducts();
    calculateTotalUsers();

    // Retrieving user data from session storage
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    console.log("User Data:", userData);
    // eslint-disable-next-line no-unused-vars
    const name = sessionStorage.getItem("name");
    // eslint-disable-next-line no-unused-vars
    const email = sessionStorage.getItem("email");
    // eslint-disable-next-line no-unused-vars
    const role = sessionStorage.getItem("role");
    setCustomers(users.length);
  }, [users]);

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
          <DashboardCard
            icon={<UserOutlined className="dashboard-icon-purple" />}
            title={"Customers"}
            value={customers}
          />
        </Space>
      </Space>
    </div>
  );
}
