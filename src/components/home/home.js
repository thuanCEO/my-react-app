import "./home.css";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";
import { useEffect, useState } from "react";

function Home() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    setOrders(2328);
    setRevenue(1941);
    setInventory(100);
    setCustomers(100);
  }, []);

  return (
    <Space size={25} direction="vertical" className="dashboard-home-page">
      <Typography.Title level={4} className="justify-content-center ">
        Dashboard
      </Typography.Title>
      <Space direction="horizontal" className="justify-content-center">
        <DashboardCard
          icon={<ShoppingCartOutlined className="dashboard-icon-green" />}
          title={"Orders"}
          value={orders}
        />
        <DashboardCard
          icon={<ShoppingOutlined className="dashboard-icon-blue" />}
          title={"Inventory"}
          value={inventory}
        />
        <DashboardCard
          icon={<UserOutlined className="dashboard-icon-purple" />}
          title={"Customer"}
          value={customers}
        />
        <DashboardCard
          icon={<DollarCircleOutlined className="dashboard-icon-red" />}
          title={"Revenue"}
          value={revenue}
        />
      </Space>
    </Space>
  );
}

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

export default Home;
