import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './Signup.css'; 
import cmalogo from "./Cma.png";
import PropTypes from 'prop-types';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Signup = ({ toggleForm }) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [receivedOtp, setReceivedOtp] = useState('');
  
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate();

  const handleGetOtp = () => {
    
    const fakeOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setReceivedOtp(fakeOtp);
     
    setSnackbarMessage(`Your OTP is: ${fakeOtp}`);
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  const handleSignup = async () => { 

    sessionStorage.setItem('registeredMobile', mobileNumber);
    
    if (otp !== receivedOtp) {
      setError('Invalid OTP. Please try again.');
      return;
    }
    
    
   
    setError('');
    setSnackbarMessage('Signup successful! Redirecting to login...');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setTimeout(() => navigate('/login'), 3000); 
  };
    

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
     
        <h2 style={{ color: 'black', marginLeft: '240px', marginTop:'10px'}}>Signup</h2>
        <form style={{ margin: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', marginLeft: '220px' }}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <label style={{ display: 'block', marginBottom: '5px', marginLeft: '220px' }}>Mobile Number:</label>
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            style={inputStyle}
          />

          <button
            type="button"
            onClick={handleGetOtp}
            style={buttonStyle}
          >
            Get OTP
          </button>

          <label style={{ display: 'block', marginTop: '20px', marginBottom: '5px', marginLeft: '220px' }}>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={inputStyle}
          /><br/><br/>

          {error && <p style={{ color: 'red', marginLeft: '220px' }}>{error}</p>}

          <button
            type="button"
            onClick={handleSignup}
            style={buttonStyle}
          >
            Signup
          </button>
        </form>
        <p style={{ marginLeft: '240px', marginTop: '20px' }}>
          Already have an account?{' '}
          <Link to="/login" onClick={toggleForm} style={{ color: 'green', textDecoration: 'underline' }}>
            Login here
          </Link>
        </p>
      </div>

      <div className="logo-card">
        <img src={cmalogo} className="png" alt="Logo" style={{ width: '300px', height: '172px', margin: '20px' }} />
      </div>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

// Styles
const inputStyle = {
  width: '300px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  marginLeft: '220px',
  marginBottom: '10px', 
};

const buttonStyle = {
  backgroundColor: 'green',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  marginLeft: '220px',
  marginTop: '10px', 
};

Signup.propTypes = {
  toggleForm: PropTypes.func,
};


export default Signup;
