import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { BiSolidDetail } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { Row, Col } from "react-bootstrap";
import { Button } from "@mui/material";
import AxiosClient from "../../api/axiosClient"; // Import AxiosClient for API calls
import "./../../components/common/styles/orders.css";
import { IoIosCheckbox } from "react-icons/io";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [role, setUserRole] = useState(0);
  const storedBrand = sessionStorage.getItem("brand");
  useEffect(() => {
    fetchOrders();
    const roleFromSession = sessionStorage.getItem("role");
    if (roleFromSession) {
      setUserRole(parseInt(roleFromSession));
    }
  }, []);

  useEffect(() => {
    const totalPrice = orders.reduce(
      (total, order) => total + order.TotalPrice,
      0
    );
    setTotalPrice(totalPrice);
  }, [orders]);

  const fetchOrders = async () => {
    try {
      let response;
      if (storedBrand) {
        // Gọi API ViewOrderByBrand nếu có brandId trong sessionStorage
        response = await AxiosClient.get(
          `/api/Orders/ViewOrderByBrand/${storedBrand}`
        );
      } else {
        response = await AxiosClient.get("/api/Orders");
      }
      const productsWithId = response.data.map((order, index) => ({
        ...order,
        id: index + 1,
      }));
      setOrders(productsWithId);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteOrders = async (orderId) => {
    try {
      await AxiosClient.delete(`/api/Orders/${orderId}`);
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error deleting orders:", error);
    }
  };

  const handleDetailsClick = (ordId) => {
    navigate(`/ordersID/${ordId}`);
  };

  const columns = [
    {
      field: "Id",
      headerName: "Id",
      width: 70,
    },
    { field: "MachineId", headerName: "MachineID", width: 130 },
    { field: "StoreId", headerName: "StoreID", width: 130 },
    { field: "OrderImageId", headerName: "OrderImageID", width: 130 },
    { field: "TotalPrice", headerName: "Price", width: 130 },
    { field: "CreationDate", headerName: "Date", width: 130 },
    {
      field: "Status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        if (params.row.Status === 1) {
          return <IoIosCheckbox className="icon-table icon-green" />;
        } else if (params.row.Status === 0) {
          return <IoIosCheckbox className="icon-table icon-red" />;
        }
      },
    },
    {
      field: "detail",
      headerName: "Detail",
      sortable: false,
      width: 90,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          handleDetailsClick(params.row.Id);
        };
        return (
          <Button variant="contained" color="primary" onClick={onClick}>
            <BiSolidDetail className="icon-table" />
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 90,
      renderCell: (params) => {
        if (role === 2) {
          const onDelete = () => {
            deleteOrders(params.row.Id);
          };

          return (
            <Button variant="contained" color="error" onClick={onDelete}>
              <MdDeleteOutline className="icon-table" />
            </Button>
          );
        }
        return null;
      },
    },
  ].filter((column) => role === 2 || column.field !== "delete");
  return (
    <div className="management-container">
      <div className="container-fluid">
        <div className="row">
          <div className="mume markdown-preview">
            <h2>Total Price: {totalPrice}</h2>
            <Row className="justify-content-center">
              <Col>
                <DataGrid
                  className="table-manage-order-box"
                  rows={orders}
                  columns={columns}
                  pageSize={5}
                  pagination
                  autoHeight
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
