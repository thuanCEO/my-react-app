import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./../../components/common/styles/ordersDetails.css";
import { BiCommentDetail } from "react-icons/bi";
import ProductInfoModal from "../Modal/ProductInfoModal";
import { DataGrid } from "@mui/x-data-grid";
import { Row, Col } from "react-bootstrap";
import AxiosClient from "../../api/axiosClient"; // Import AxiosClient for API calls

export default function Details() {
  const { orderId, productId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isProductInfoModalOpen, setIsProductInfoModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await AxiosClient.get(
          `/api/Orders/ViewOrderDetails/${productId}`
        );
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [productId]);

  console.log("order", orderDetails);
  const toggleDetails = (index) => {
    setIsProductInfoModalOpen(!isProductInfoModalOpen);
  };

  const columns = [
    { field: "OrderId", headerName: "Id", width: 60 },
    { field: "MachineName", headerName: "MachineName", width: 100 },
    { field: "StoreName", headerName: "StoreName", width: 300 },
    { field: "BrandName", headerName: "BrandName", width: 90 },
    { field: "TotalPrice", headerName: "TotalPrice", width: 90 },
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
    ...column,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  }));

  const rows = orderDetails ? [orderDetails] : [];

  return (
    <div className="container-detail mt-3">
      <h2>Order Details</h2>
      {orderDetails ? (
        <Row className="justify-content-center">
          <Col>
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
              getRowId={(row) => row.OrderId}
            />
          </Col>
        </Row>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
      {isProductInfoModalOpen && orderDetails && (
        <ProductInfoModal
          isOpen={isProductInfoModalOpen}
          onClose={() => setIsProductInfoModalOpen(false)}
          order={orderDetails}
        />
      )}
    </div>
  );
}
