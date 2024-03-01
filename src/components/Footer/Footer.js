// src/components/Footer.js
import React from "react";
import "./Footer.css";
import { Container, Row, Col } from "react-bootstrap"; // Required components from React Bootstrap

export default function Footer() {
  return (
    <footer className="footer">
      <Row className="justify-content-between">
        {/* Company Logo Section */}
        <Col xs={12} md={4}>
          <div className="company-logo">
            <h3>Company Logo</h3>
            <p>Your tagline goes here.</p>
          </div>
        </Col>

        {/* Contact Us Section */}
        <Col xs={12} md={4}>
          <div className="contact-us">
            <h3>Contact Us</h3>
            <address className="address-box">
              <p>
                123 Main Street, <br />
                Cityville, State, 12345 <br />
              </p>
              Email: info@example.com <br />
              Phone: (123) 456-7890
            </address>
          </div>
        </Col>

        {/* Additional Information Section */}
        <Col xs={12} md={4}>
          <div className="additional-info">
            {/* Add your additional content here */}
            <p></p>
          </div>
        </Col>
      </Row>
    </footer>
  );
}
