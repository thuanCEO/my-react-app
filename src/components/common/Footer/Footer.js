// src/components/Footer.js
import React from "react";
import "./Footer.css";
import { Row, Col } from "react-bootstrap"; // Required components from React Bootstrap
import logo_website from '../img/logo/3.png';
export default function Footer() {
  return (
    <footer className="footer">
      <Row className="justify-content-between">
        {/* Company Logo Section */}
        <Col xs={12} md={4}>
          <div className="company-logo">
            <h3>Self-Check-Machine</h3>
            <img src={logo_website} alt="logo_website" width="200px" height="90px" />
          </div>
        </Col>

        {/* Contact Us Section */}
        <Col xs={12} md={4}>
          <div className="contact-us">
            <h3>Contact Us</h3>
            <address className="address-box">
              <p>
                123 HCM Street, <br />
                Quận 9, HCM, 12345 <br />
              </p>
              Email: dohuuthuan@gmail.com <br />
              Phone: 0333 888 257
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
