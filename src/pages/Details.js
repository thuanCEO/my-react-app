import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
import { BiCommentDetail } from "react-icons/bi";

export default function Details() {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [openDetails, setOpenDetails] = useState({});
  const [showProductInfo, setShowProductInfo] = useState(false); // State để kiểm soát hiển thị bảng chi tiết sản phẩm

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
    setOpenDetails((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    setShowProductInfo(!showProductInfo); // Khi nhấp vào nút "View Details", hiển thị hoặc ẩn bảng chi tiết sản phẩm
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

  return (
    <div className="container-detail mt-5">
      <h2>Order Details</h2>
      {productDetails ? (
        <div className="product-details">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>View Detail</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.description}</td>
                    <td>{order.price}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => toggleDetails(index)}
                      >
                        <BiCommentDetail />
                        {/* {openDetails[index] ? "Hide Details" : "View Details"} */}
                      </button>
                    </td>
                  </tr>
                  {openDetails[index] && showProductInfo && (
                    <tr>
                      <td colSpan="5">
                        <table className="table product-info-table">
                          <thead>
                            <tr>
                              <th>Origin</th>
                              <th>Manufacturing Place</th>
                              <th>Product Type</th>
                              <th>Manufacture Date</th>
                              <th>Description</th>
                              <th>Entry Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Origin Info</td>
                              <td>{order.placeOfManufacture}</td>
                              <td>Product Type Info</td>
                              <td>Manufacture Date Info</td>
                              <td>{order.description}</td>
                              <td>Entry Date Info</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
}
