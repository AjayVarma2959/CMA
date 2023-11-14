// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={subscribeStyle}>
        <h3>Subscribe to our Newsletter</h3>
        <input type="email" placeholder="Enter your email" style={inputStyle} />
        <button style={subscribeButtonStyle}>Subscribe</button>
      </div>
      <div style={contactStyle}>
        <h3>Contact Us</h3>
        <p>Email: example@example.com</p>
        <p>Phone: +1 123-456-7890</p>
      </div>
    </footer>
  );
};

// Styles
const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '10px 800px',
  textAlign: 'center',
  position:'absolute',
  top:'180%',

};

const subscribeStyle = {
  marginBottom: '20px',
};

const inputStyle = {
  padding: '8px',
  marginRight: '10px',
};

const subscribeButtonStyle = {
  padding: '8px 15px',
  backgroundColor: '#fff',
  color: '#333',
  cursor: 'pointer',
};

const contactStyle = {
  display: 'flex',
  flexDirection: 'column',
};

export default Footer;
