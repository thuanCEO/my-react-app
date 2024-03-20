import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { BiSolidDetail } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Row, Col } from "react-bootstrap";
import { Button } from "@mui/material";
import AxiosClient from "../../api/axiosClient"; // Import AxiosClient for API calls
import "./staffs.css";

export default function Staff() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await AxiosClient.get("/api/Orders");
      console.log(response);
      const productsWithId = response.data.map((orders, index) => ({
        ...orders,
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
      const updatedOrders = orders.filter(
        (orders) => orders.id !== orderId
      );
      setOrders(updatedOrders);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting orders:", error);
    }
  };

  const handleDetailsClick = (orderId) => {
    navigate(`/ordersID/${orderId}`);
  };

  const columns = [
    {
      field: "Id",
      headerName: "No",
      width: 70,
    },
    { field: "MachineId", headerName: "MachineID", width: 130 },
    { field: "StoreId", headerName: "StoreID", width: 130 },
    { field: "OrderImageId", headerName: "OrderImageID", width: 130 },
    { field: "TotalPrice", headerName: "Price", width: 130 },
    { field: "Status", headerName: "Status", width: 130 },
    { field: "CreationDate", headerName: "Date", width: 130 },
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
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 90,
      renderCell: (params) => {
        return (
          <Button variant="contained" color="primary">
            <FaRegEdit className="icon-table" />
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
        const onDelete = () => {
          deleteOrders(params.row.Id);
        };

        return (
          <Button variant="contained" color="error" onClick={onDelete}>
            <MdDeleteOutline className="icon-table" />
          </Button>
        );
      },
    },
  ].map((column) => ({
    ...column,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  }));

  return (
    <div className="management-container">
      <div className="container-fluid">
        <div className="row">
          <div className="mume markdown-preview">
            <h2 className="mume-header">Orders List</h2>
            <Row className="justify-content-center">
              <Col>
                <DataGrid
                  className="table-manage-order-box"
                  rows={orders}
                  columns={columns}
                  pageSize={5}
                  pagination
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
