import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Loginsign = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = () => {
   
    console.log('Logging in with username:', loginUsername);
  };

  const handleSignup = () => {
    
    console.log('Signing up with username:', signupUsername);
  };

  return (
    <div className="auth-container">
      <h1>CMA</h1>
      <div className="auth-form">
        <div>
          <h2>Login</h2>
          <form>
            <label>Username:</label>
            <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />

            <label>Password:</label>
            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />

            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
        <div>
          <h2>Signup</h2>
          <form>
            <label>Username:</label>
            <input type="text" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} />

            <label>Password:</label>
            <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />

            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            <button type="button" onClick={handleSignup}>
              Signup
            </button>
          </form>
        </div>
        <div>
          <p>
            Already have an account? <Link to="/Login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};


export default Loginsign;
