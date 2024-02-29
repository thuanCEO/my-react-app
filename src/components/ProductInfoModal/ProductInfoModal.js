import React from "react";
import Modal from "react-bootstrap/Modal"; // Import Modal component from Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductInfoModal.css";
const ProductInfoModal = ({ isOpen, onClose, order }) => {
  return (
    <Modal show={isOpen} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Product Informations</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
};

export default ProductInfoModal;
