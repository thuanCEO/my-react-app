import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap"; // Import Modal from react-bootstrap

function EditAccountModal({ show, onHide, account, onSubmit, iscreate }) {
  const [formData, setFormData] = useState(() => ({
    FullName: "",
    Email: "",
    Password: "",
    PhoneNumber: "",
    Address: "",
    Status: 0, // Include other account fields
    // Add these default values for other fields if needed
  }));

  useEffect(() => {
    if (account) {
      setFormData({
        FullName: account.FullName || "",
        Email: account.Email || "",
        Password: account.Password || "",
        PhoneNumber: account.PhoneNumber || "",
        Address: account.Address || "",
        Status: account.Status || 0, // Or your default status
      });
    }
  }, [account]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? (checked ? 1 : 0) : value; // Convert checkbox value to 1 or 0
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // onSubmit(formData); // Pass updated data to parent component
    onHide(); // Close the modal
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {iscreate ? "Edit Account" : "Edit Account"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {/* Form fields for editing account details */}
          <div className="form-group">
            <label htmlFor="FullName">Full Name: </label>
            <input
              type="text"
              className="form-control"
              id="FullName"
              name="FullName"
              value={formData.FullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Email">Email: </label>
            <input
              type="email"
              className="form-control"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password: </label>
            <input
              type="password"
              className="form-control"
              id="Password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="PhoneNumber">Phone Number: </label>
            <input
              type="text"
              className="form-control"
              id="PhoneNumber"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Address">Address: </label>
            <input
              type="text"
              className="form-control"
              id="Address"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Status">Status: </label>
            <input
              type="checkbox"
              className="form-check-input"
              id="Status"
              name="Status"
              checked={formData.Status === 1} // Check the value of Status to set checked
              onChange={handleChange}
            />
          </div>
          <div className="button-container-edit-account">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditAccountModal;
