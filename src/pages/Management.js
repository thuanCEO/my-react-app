// src/components/Management.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { BiSolidDetail } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Row, Col } from "react-bootstrap"; // Import Bootstrap components
import { Button } from "@mui/material";
import "./Management.css";

export default function Management() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");

  const addProduct = () => {
    if (productName.trim() !== "") {
      setProducts([...products, { id: Date.now(), name: productName }]);
      setProductName("");
    }
  };

  // const deleteProduct = (productId) => {
  //   const updatedProducts = products.filter(
  //     (product) => product.id !== productId
  //   );
  //   setProducts(updatedProducts);

  //   console.log(`Details clicked for product with ID: ${productId}`);
  // };

  const navigate = useNavigate();

  const handleDetailsClick = (productId) => {
    // Implement logic to show product details, e.g., navigate to a details page
    navigate(`/details/${productId}`);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    { field: "name", headerName: "Name", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
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
        return (
          <Button variant="contained" color="error">
            <MdDeleteOutline className="icon-table" />
          </Button>
        );
      },
    },
  ].map((column) => ({
    ...column, // Giữ lại các thuộc tính ban đầu của cột
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  }));

  const rows = [
    {
      id: 1,
      name: "Product 1",
      price: "$19.99",
    },
    { id: 2, name: "Product 2", price: "$29.99" },
    { id: 3, name: "Product 3", price: "$24.99" },
    { id: 4, name: "Product 4", price: "$19.99" },
    { id: 5, name: "Product 5", price: "$29.99" },
    { id: 6, name: "Product 6", price: "$24.99" },
    { id: 7, name: "Product 7", price: "$19.99" },
    { id: 8, name: "Product 8", price: "$29.99" },
    { id: 9, name: "Product 9", price: "$24.99" },
    { id: 10, name: "Product 1", price: "$19.99" },
  ];

  return (
    <div className="management-container">
      <h2 className="mume-header">Product Management</h2>
      <div className="product-input-container">
        <input
          type="text"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="product-input"
        />
        <button onClick={addProduct} className="add-button">
          Add Product
        </button>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="mume markdown-preview">
            <h2 className="mume-header">Product List</h2>
            <Row className="justify-content-center">
              <DataGrid
                className="table-manage-order-box "
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
