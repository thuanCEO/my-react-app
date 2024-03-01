import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
import { BiCommentDetail } from "react-icons/bi";
import ProductInfoModal from "../components/ProductInfoModal/ProductInfoModal";
import { DataGrid } from "@mui/x-data-grid";
import { Row, Col } from "react-bootstrap"; // Import Bootstrap components

export default function Details() {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [isProductInfoModalOpen, setIsProductInfoModalOpen] = useState(false);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null); // New state to track the selected order

  useEffect(() => {
    const fetchData = async () => {
      const details = {
        id: productId,
        name: `Order ${productId}`, // Thay đổi tên thành "Order"
        description: `This is the detailed information for Order ${productId}.`,
        price: `$${(Math.random() * 100).toFixed(2)}`,
        placeOfManufacture: "Unknown",
        quantity: Math.floor(Math.random() * 100),
      };
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProductDetails(details);
    };

    fetchData();
  }, [productId]);

  const toggleDetails = (index) => {
    setSelectedOrderIndex(index - 1); // Update selectedOrderIndex with the clicked row's index
    setIsProductInfoModalOpen(!isProductInfoModalOpen); // Toggle modal visibility
  };

  const orders = [
    {
      id: 1,
      name: "Order 1",
      description: "This is the detailed information for Order 1.",
      price: `$${(Math.random() * 100).toFixed(2)}`,
      placeOfManufacture: "Factory A",
      quantity: 50,
    },
    {
      id: 2,
      name: "Order 2",
      description: "This is the detailed information for Order 2.",
      price: `$${(Math.random() * 100).toFixed(2)}`,
      placeOfManufacture: "Factory B",
      quantity: 30,
    },
    {
      id: 3,
      name: "Order 3",
      description: "This is the detailed information for Order 3.",
      price: `$${(Math.random() * 100).toFixed(2)}`,
      placeOfManufacture: "Factory C",
      quantity: 20,
    },
    // Bổ sung thêm ba mục đặt hàng mới
    {
      id: 4,
      name: "Order 4",
      description: "This is the detailed information for Order 4.",
      price: `$${(Math.random() * 100).toFixed(2)}`,
      placeOfManufacture: "Factory D",
      quantity: 40,
    },
    {
      id: 5,
      name: "Order 5",
      description: "This is the detailed information for Order 5.",
      price: `$${(Math.random() * 100).toFixed(2)}`,
      placeOfManufacture: "Factory E",
      quantity: 25,
    },
    {
      id: 6,
      name: "Order 6",
      description: "This is the detailed information for Order 6.",
      price: `$${(Math.random() * 100).toFixed(2)}`,
      placeOfManufacture: "Factory F",
      quantity: 35,
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "Name", width: 90 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "price", headerName: "Price", width: 90 },
    {
      field: "viewDetail",
      headerName: "View Detail",
      width: 100,
      renderCell: (params) => (
        <button
          className="btn btn-primary"
          onClick={() => toggleDetails(params.row.id)}
        >
          <BiCommentDetail />
        </button>
      ),
    },
  ].map((column) => ({
    ...column, // Giữ lại các thuộc tính ban đầu của cột
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  }));

  const rows = productDetails
    ? orders.map((order) => ({ ...order, id: order.id }))
    : [];

  return (
    <div className="container-detail mt-3">
      <h2>Order Details</h2>
      {productDetails ? (
        <Row className="justify-content-center">
          {" "}
          {/* Center the Datagrid within a row */}
          <Col>
            {" "}
            {/* Adjust column widths as needed */}
            <DataGrid
              className="table-manage-order-box"
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              getRowId={(row) => row.id}
            />
          </Col>
        </Row>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
      {isProductInfoModalOpen && productDetails && (
        <ProductInfoModal
          isOpen={isProductInfoModalOpen}
          onClose={() => setIsProductInfoModalOpen(false)}
          order={orders[selectedOrderIndex]} // Assuming productDetails has all necessary info
        />
      )}
    </div>
  );
}
