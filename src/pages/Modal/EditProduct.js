import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap"; // Import Modal from react-bootstrap

function EditProductModal({ show, onHide, product, onSubmit }) {
  const [formData, setFormData] = useState({
    ProductName: product.ProductName,
    Price: product.Price,
    Quantity: product.Quantity,
    Description: product.Description,
    // Include other product fields
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // onSubmit(formData); // Pass updated data to parent component
    onHide(); // Close the modal
  };

  useEffect(() => {
    setFormData({ ...product }); // Pre-fill form with selected product data
  }, [product]); // Update form data on product change

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {/* Form fields for editing product details */}
          <div className="form-group">
            <label htmlFor="ProductName">Product Name: </label>
            <input
              type="text"
              className="form-control"
              id="ProductName"
              name="ProductName"
              value={formData.ProductName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ProductName">Price: </label>
            <input
              type="text"
              className="form-control"
              id="Price"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ProductName">Description: </label>
            <input
              type="text"
              className="form-control"
              id="Description"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ProductName">Quantity: </label>
            <input
              type="text"
              className="form-control"
              id="Quantity"
              name="Quantity"
              value={formData.Quantity}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditProductModal;
