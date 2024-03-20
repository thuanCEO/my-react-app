import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ordersDetails.css";
import { BiCommentDetail } from "react-icons/bi";
import ProductInfoModal from "../ProductInfoModal/ProductInfoModal";
import { DataGrid } from "@mui/x-data-grid";
import { Row, Col } from "react-bootstrap"; 

export default function Details() {
  const { orderId } = useParams(); // Use orderId instead of productId
  const [orderDetails, setOrderDetails] = useState(null);
  const [isProductInfoModalOpen, setIsProductInfoModalOpen] = useState(false);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null); 

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Replace this with your API call to fetch order details by ID
        // For example:
        // const response = await AxiosClient.get(`/api/orders/${orderId}`);
        // setOrderDetails(response.data);
        // Simulating data fetching
        const details = orders.find(order => order.id === Number(orderId));
        setOrderDetails(details);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const toggleDetails = (index) => {
    setSelectedOrderIndex(index - 1); 
    setIsProductInfoModalOpen(!isProductInfoModalOpen);
  };

  // Assuming you have orders data here
  const orders = [/* Your orders data array */];

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
    ...column,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  }));

  const rows = orderDetails ? orders.map((order) => ({ ...order, id: order.id })) : [];

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
              getRowId={(row) => row.id}
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
          order={orders[selectedOrderIndex]}
        />
      )}
    </div>
  );
}
