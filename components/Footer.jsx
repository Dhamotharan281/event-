import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>EventPlanner</h3>
          <p>Your trusted partner for seamless event planning and management.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><a href="#">Wedding Planning</a></li>
            <li><a href="#">Corporate Events</a></li>
            <li><a href="#">Birthday Parties</a></li>
            <li><a href="#">Conferences</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <div>
            <p>📧 info@eventplanner.com</p>
            <p>📱 +91 98765 43210</p>
            <p>📍 Chennai, Tamil Nadu</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 EventPlanner. All rights reserved. Made with ❤️ in Chennai</p>
      </div>
    </footer>
  );
};

export default Footer;
