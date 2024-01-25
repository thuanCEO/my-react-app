// src/components/Management.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Management.css';

export default function Management() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');

  const addProduct = () => {
    if (productName.trim() !== '') {
      setProducts([...products, { id: Date.now(), name: productName }]);
      setProductName('');
    }
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
   
    console.log(`Details clicked for product with ID: ${productId}`);
  };

  const navigate = useNavigate();

  const handleDetailsClick = (productId) => {
    // Implement logic to show product details, e.g., navigate to a details page
    navigate(`/details/${productId}`);
    console.log(`Details clicked for product with ID: ${productId}`);
  };
  const orders = [
    { id: 1, name: 'Product 1', price: '$19.99' },
    { id: 2, name: 'Product 2', price: '$29.99' },
    { id: 3, name: 'Product 3', price: '$24.99' },
    // Add more products as needed
  ];

  return (
    <div className="management-container">
      <h2 className="management-header">Product Management</h2>
      <div className="product-input-container">
        <input
          type="text"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="product-input"
        />
        <button onClick={addProduct} className="add-button">Add Product</button>
      </div>
      <ul className="product-list">
        {orders.map(product => (
          <li key={product.id} className="product-item">
            {product.name}
            <button onClick={() => deleteProduct(product.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>

      <div className="container-fluid">
        <div className="row">
          {/* Right Content */}
          <div className="col-lg-10 col-md-9">
            {/* Top navbar */}
            <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
              {/* Your existing top navbar content here */}
            </nav>
            {/* Page content */}
            <div className="container mt--7">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="card p-5">
                    <div className="mume markdown-preview">
                      <h2 className="mume-header">Product List</h2>
                      <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                          {/* ... (Content of the table) ... */}
                          <thead>
                            <tr className="table-primary">
                              <th scope="col">#</th>
                              <th scope="col">Order</th>
                              <th scope="col">Price</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Sample product rows */}
                            {/* Add more product rows as needed */}
                            {orders.map((product) => (
                              <tr key={product.id}>
                                <th scope="row">{product.id}</th>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                  <button type="button" className="btn btn-warning">
                                    Edit
                                  </button>
                                  <button type="button" className="btn btn-danger">
                                    Delete
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={() => handleDetailsClick(product.id)}
                                  >
                                    Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

