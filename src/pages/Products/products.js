// src/components/Management.js
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline, MdAddCircleOutline } from "react-icons/md";
import { Row, Col } from "react-bootstrap";
import { Button } from "@mui/material";
import AxiosClient from "../../api/axiosClient"; // Import AxiosClient for API calls
import "./../../components/common/styles/products.css";
import { IoIosCheckbox } from "react-icons/io";
import EditProductModal from "../Modal/EditProduct";

export default function Products() {
  const [products, setProducts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [totalProducts, setTotalProducts] = useState(0);
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditModalShow(true);
  };

  const handleModalClose = () => {
    setEditModalShow(false);
    setSelectedProduct(null); // Xóa sản phẩm được chọn khi đóng
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    const totalProducts = products.length;
    setTotalProducts(totalProducts);
  }, [products]);
  const fetchProducts = async () => {
    try {
      const response = await AxiosClient.get("/api/Product");
      const productsWithId = response.data.map((product, index) => ({
        ...product,
        id: index + 1,
      }));
      setProducts(productsWithId);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await AxiosClient.delete(`/api/Product/${productId}`);
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const columns = [
    {
      field: "Id",
      headerName: "ID",
      width: 70,
    },
    { field: "ProductName", headerName: "Product Name", width: 130 },
    { field: "Price", headerName: "Price", width: 130 },
    { field: "Description", headerName: "Description", width: 130 },
    { field: "Quantity", headerName: "Quantity", width: 130 },
    { field: "Code", headerName: "Code", width: 130 },
    { field: "BrandId", headerName: "Brand Id", width: 130 },
    {
      field: "Status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        if (params.row.Status === 1) {
          return <IoIosCheckbox className="icon-table" />;
        } else if (params.row.Status === 2) {
          return null;
        }
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 90,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditClick(params.row)}
          >
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
          deleteProduct(params.row.Id);
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

  const handleProductSubmit = async (updatedProduct) => {
    try {
      const response = await AxiosClient.put(
        `/api/Product/${selectedProduct.Id}`,
        updatedProduct
      );
      if (response.ok) {
        const updatedData = await response.json();
        // Cập nhật state products với sản phẩm được cập nhật
        const updatedProducts = products.map((p) =>
          p.Id === selectedProduct.Id ? updatedData : p
        );
        setProducts(updatedProducts);
        handleModalClose();
      } else {
        console.error("Error updating product:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="management-container">
      <h2>Management Products</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleEditClick(null)}
      >
        <MdAddCircleOutline className="icon-table" />
      </Button>
      <div className="container-fluid">
        <div className="row">
          <div className="mume markdown-preview">
            <Row className="justify-content-center">
              <Col>
                <DataGrid
                  className="table-manage-order-box"
                  rows={products}
                  columns={columns}
                  pageSize={5}
                  pagination
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {editModalShow && (
        <EditProductModal
          show={editModalShow}
          onHide={handleModalClose}
          product={selectedProduct}
          iscreate="true"
        />
      )}
      {/* onSubmit={handleProductSubmit} */}
    </div>
  );
}
