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
  const [productName, setProductName] = useState("");
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
  

  const addProduct = async () => {
    if (productName.trim() !== "") {
      try {
        const response = await AxiosClient.post("/api/Product", {
          productName: productName,
        });
        setOrders([...orders, response.data]);
        setProductName("");
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await AxiosClient.delete(`/api/Product/${productId}`);
      const updatedProducts = orders.filter(
        (product) => product.id !== productId
      );
      setOrders(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDetailsClick = (productId) => {
    navigate(`/ordersID/${productId}`);
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
          handleDetailsClick(params.row.id);
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
          deleteProduct(params.row.id);
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
