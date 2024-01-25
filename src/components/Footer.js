// src/components/Footer.js
import React from 'react';
import './Footer.css';
export default function Footer () {
  return (
    <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div>
            <h3>Company Logo</h3>
            <p>Your tagline goes here.</p>
          </div>
        </div>
        <div className="col-md-6">
          <div>
            <h5>Contact Us</h5>
            <address>
              <p>
                123 Main Street, <br />
                Cityville, State, 12345 <br />
                Email: info@example.com <br />
                Phone: (123) 456-7890
              </p>
            </address>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};


