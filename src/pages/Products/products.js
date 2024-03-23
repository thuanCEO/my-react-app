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
import CreateProductModal from "../Modal/CreateProduct";

export default function Products() {
  const [products, setProducts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [totalProducts, setTotalProducts] = useState(0);
  const [editModalShow, setEditModalShow] = useState(false);
  const [createModalShow, setCreateModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const storedBrand = sessionStorage.getItem("brand");

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditModalShow(true);
  };

  const handleModalClose = () => {
    setEditModalShow(false);
    setCreateModalShow(false);
    setSelectedProduct(null); // Xóa sản phẩm được chọn khi đóng
  };
  const handleCreateClick = () => {
    setCreateModalShow(true);
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
      const response = await AxiosClient.get("/api/Products");
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
      await AxiosClient.delete(`/api/Products/${productId}`);
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
    { field: "Price", headerName: "Price", width: 100 },
    { field: "Description", headerName: "Description", width: 150 },
    { field: "Quantity", headerName: "Quantity", width: 80 },
    { field: "Code", headerName: "Code", width: 70 },
    { field: "BrandId", headerName: "Brand Id", width: 90 },
    { field: "Category", headerName: "Category", width: 130 }, //add category
    {
      field: "Status",
      headerName: "Status",
      width: 60,
      renderCell: (params) => {
        if (params.row.Status === 1) {
          return <IoIosCheckbox className="icon-table icon-green" />;
        } else if (params.row.Status === 0) {
          return <IoIosCheckbox className="icon-table icon-red" />;
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

  const handleProductSubmitEdit = async (updatedProduct) => {
    try {
      const response = await AxiosClient.put(
        `/api/Products/${selectedProduct.Id}`,
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

  const handleProductSubmitCreate = async (formData) => {
    try {
      const response = await fetch("/api/Product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProducts([...products, newProduct]); // Cập nhật danh sách sản phẩm
        handleModalClose(); // Đóng CreateProductModal
        // Thêm thông báo thành công (tùy chọn)
        console.log("Product added successfully!");
      } else {
        console.error("Error creating product:", response.statusText);
        // Hiển thị thông báo lỗi (tùy chọn)
      }
    } catch (error) {
      console.error("Error:", error);
      // Hiển thị thông báo lỗi (tùy chọn)
    }
  };
  return (
    <div className="management-container">
      <h2>Management Products</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleCreateClick()}
        className="button-create-product"
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
          onSubmit={handleProductSubmitEdit}
        />
      )}
      {createModalShow && (
        <CreateProductModal
          show={createModalShow}
          onHide={handleModalClose}
          onSubmit={handleProductSubmitCreate}
        />
      )}
    </div>
  );
}
