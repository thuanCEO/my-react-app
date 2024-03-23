import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap"; // Import Modal from react-bootstrap
import axiosClient from "../../api/axiosClient";

function EditProductModal({ show, onHide, product, onSubmit }) {
  const [formData, setFormData] = useState(() => ({
    ProductName: "",
    Price: "",
    Quantity: "",
    Description: "",
    CategoryId: "",
  }));

  useEffect(() => {
    if (product) {
      setFormData({
        ProductName: product.ProductName || "",
        Price: product.Price || "",
        Quantity: product.Quantity || "",
        Description: product.Description || "",
        CategoryId: product.CategoryId || "", // Or your default category ID
      });
    }
  }, [product]);

  const [categories, setCategories] = useState([]);

  const handleChange = (event) => {
    const isNumericField =
      event.target.name === "Price" || event.target.name === "Quantity";
    const newValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : isNumericField
        ? event.target.value.replace(/[^\d]/g, "") // Remove non-numeric characters for numeric fields
        : event.target.value; // Allow all characters for other fields

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
    setFormData({ ...product }); // Pre-fill form with selected product data
  }, [product]); // Update form data on product change

  // const mockCategories = [
  //   { id: 1, name: "Electronics" },
  //   { id: 2, name: "Clothing" },
  //   { id: 3, name: "Homeware" },
  //   // Add more categories as needed
  // ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosClient.get("/api/Categories"); // Replace with your API endpoint
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Modal show={show} onHide={onHide} centered>
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
            <label htmlFor="Status">Status: </label>
            <input
              type="checkbox"
              className="form-check-input"
              id="Status"
              name="Status"
              checked={formData.Status}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="CategoryId">Category: </label>
            <select
              className="form-control"
              id="CategoryId"
              name="CategoryId"
              value={formData.CategoryId} // Use formData.CategoryId for comparison
              onChange={handleChange}
            >
              <option value="">{formData.CategoryId}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {" "}
                  {/* Use category.id for value */}
                  {category.Title}
                </option>
              ))}
            </select>
          </div>
          <div className="button-container-edit-product">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditProductModal;
