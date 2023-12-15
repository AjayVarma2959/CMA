import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './Login.css'; 
import cmalogo from "./Cma.png";
import PropTypes from 'prop-types';

const Login = ({ toggleForm }) => {

  const navigate = useNavigate();

  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');



  const handleGetOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
    sessionStorage.setItem('otp', otp); 
    setSnackbarMessage(`Your OTP is: ${otp}`); 
    setSnackbarSeverity('info'); 
    setSnackbarOpen(true); 
  };

  const handleLogin = () => {
    const storedOtp = sessionStorage.getItem('otp');
    const registeredMobile = sessionStorage.getItem('registeredMobile');
  
    if (otp === storedOtp && mobileNumber === registeredMobile) {
      
      setSnackbarMessage('Login successful! Redirecting to home page...');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setTimeout(() => navigate('/home'), 3000); 
    } else {
      
      setSnackbarMessage('Invalid OTP or mobile number. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 style={{ color: 'black', marginLeft: '240px', marginTop: '-120px'}}>Login</h2>
        <form style={{ margin: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', marginLeft: '220px'}}>Mobile Number:</label>
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            style={{ width: '300px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginLeft: '220px' }}
          />
          
          
          <button
  type="button"
  onClick={handleGetOtp} 
  style={{ ...buttonStyle, marginTop: '10px' }}
>
  Get OTP
</button>

          <label style={{ display: 'block', marginTop: '20px', marginBottom: '5px', marginLeft: '220px' }}>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ width: '300px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginLeft: '220px' }}
          /><br/><br/>

          <button
            type="button"
            onClick={handleLogin}
            style={buttonStyle}
          >
            Login
          </button>
        </form>
        <p style={{ marginLeft: '240px' }}>
          Don&apos;t have an account?{' '}
          <Link to="/signup" onClick={toggleForm} style={{ color: 'green', textDecoration: 'underline' }}>
            Signup here
          </Link>
        </p>
      </div>

      <div className="logo-card">
        <img 
          src={cmalogo}  
          className="png" 
          style={{ width: '300px', height: '172px' }}
          alt="Logo"
        />
      </div>

      
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: 'green',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  marginLeft: '220px'
};

Login.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default Login;
