import React from "react";
import { FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./ContactUs.css"; // Import CSS file

const ContactUs = () => {
  // Log Click Events
  const handleClick = (type) => {
    console.log(`${type} clicked`);
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        
        {/* Left Section - Contact Details */}
        <div className="contact-left">
          <h1>Contact Us</h1>
          <p>Reach out to us through email or connect on social media.</p>
           
          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-email" onClick={() => handleClick("Email")}>
              <FaEnvelope />
              <a href="quickbites1391@gmail.com">quickbites1391@gmail.com</a>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="contact-social">
            <a
              href="https://www.instagram.com/bitmatesteam/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleClick("Instagram")}
            >
              <FaInstagram className="social-icon instagram" />
            </a>
            <a
              href="https://www.linkedin.com/in/YOUR_LINKEDIN"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleClick("LinkedIn")}
            >
              <FaLinkedin className="social-icon linkedin" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
