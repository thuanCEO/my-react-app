// src/pages/Details.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';

export default function Details() {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    // Simulating fetching product details based on the ID
    const fetchData = async () => {
      // Simulate an API call or asynchronous operation
      const details = {
        id: productId,
        name: `Product ${productId}`,
        description: `This is the detailed information for Product ${productId}.`,
        price: `$${(Math.random() * 100).toFixed(2)}`,
      };

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Set the fetched details
      setProductDetails(details);
    };

    fetchData();
  }, [productId]);

  return (
    <div className="container mt-5">
      <h2>Product Details</h2>
      {productDetails ? (
        <div className="product-details">
          <div className="form-group">
            <label className="form-label">ID:</label>
            <div>{productDetails.id}</div>
          </div>
          <div className="form-group">
            <label className="form-label">Name:</label>
            <div>{productDetails.name}</div>
          </div>
          <div className="form-group">
            <label className="form-label">Description:</label>
            <div>{productDetails.description}</div>
          </div>
          <div className="form-group">
            <label className="form-label">Price:</label>
            <div>{productDetails.price}</div>
          </div>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
}
