import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap"; // Import Modal from react-bootstrap

function CreateProductModal({ show, onHide, onSubmit }) {
  const [formData, setFormData] = useState(() => ({
    ProductName: "",
    Price: "",
    Quantity: "",
    Description: "",
    CategoryId: "",
  }));

  const [categories, setCategories] = useState([]);

  const handleChange = (event) => {
    const isNumericField =
      event.target.name === "Price" || event.target.name === "Quantity";
    const newValue = isNumericField
      ? event.target.value.replace(/[^\d]/g, "") // Remove non-numeric characters for numeric fields
      : event.target.value; // Allow all characters for other fields
    if (event.target.name === "Quantity" && parseInt(newValue) < 1) {
      return; // Ngăn cập nhật giá trị nếu không hợp lệ
    }
    setFormData({
      ...formData,
      [event.target.name]: newValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    onSubmit(formData); // Pass updated data to parent component
    onHide(); // Close the modal
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(""); // Replace with your API endpoint
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Product</Modal.Title>
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
              maxLength={15}
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
              maxLength={5}
              min={1}
            />
          </div>
          <div className="form-group">
            <label htmlFor="CategoryId">Category: </label>
            <select
              className="form-control"
              id="CategoryId"
              name="CategoryId"
              value={formData.CategoryId}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="button-container-edit-product">
            <button type="submit" className="btn btn-primary">
              Add product
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateProductModal;
