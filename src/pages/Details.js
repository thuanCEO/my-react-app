import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';

export default function Details() {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [openDetails, setOpenDetails] = useState({}); // State để kiểm soát việc hiển thị của bảng chi tiết cho từng sản phẩm

  useEffect(() => {
    // Simulating fetching product details based on the ID
    const fetchData = async () => {
      // Simulate an API call or asynchronous operation
      const details = {
        id: productId,
        name: `Product ${productId}`,
        description: `This is the detailed information for Product ${productId}.`,
        price: `$${(Math.random() * 100).toFixed(2)}`,
        // Add additional details
        placeOfManufacture: 'Unknown', // Example place of manufacture
        quantity: Math.floor(Math.random() * 100), // Example quantity
      };

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Set the fetched details
      setProductDetails(details);
    };

    fetchData();
  }, [productId]);

  const toggleDetails = (index) => {
    setOpenDetails((prev) => ({
      ...prev,
      [index]: !prev[index], // Đảo ngược trạng thái hiển thị của bảng chi tiết cho sản phẩm có index tương ứng
    }));
  };

  // Fake data for products
  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "Description for Product 1",
      price: "$10.00",
      placeOfManufacture: "Factory A",
      quantity: 50,
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description for Product 2",
      price: "$20.00",
      placeOfManufacture: "Factory B",
      quantity: 30,
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description for Product 3",
      price: "$15.00",
      placeOfManufacture: "Factory C",
      quantity: 20,
    },
  ];

  return (
    <div className="container-detail mt-5">
      <h2>Product Details</h2>
      {productDetails ? (
        <>
          {products.map((product, index) => (
            <div key={index}>
              <div className="product-details">
                <div className="form-group">
                  <label className="form-label">ID:</label>
                  <div>{product.id}</div>
                </div>
                <div className="form-group">
                  <label className="form-label">Name:</label>
                  <div>{product.name}</div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description:</label>
                  <div>{product.description}</div>
                </div>
                <div className="form-group">
                  <label className="form-label">Price:</label>
                  <div>{product.price}</div>
                </div>
                <div className="product-actions">
                  <button className="btn btn-primary" onClick={() => toggleDetails(index)}>
                    {openDetails[index] ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
                {openDetails[index] && (
                  <div className="product-details">
                    <h3>Detail Table for Product {product.id}</h3>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Place of Manufacture</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{product.name}</td>
                          <td>{product.placeOfManufacture}</td>
                          <td>{product.quantity}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
}
