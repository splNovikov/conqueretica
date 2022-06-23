import React from 'react';
import { Link } from 'react-router-dom';
// Firebase
// Interfaces
// Components
// Utils

const SignUpPage = () => {
  return (
    <div>
      <h1>Sign up for a free</h1>
      <div>
        Already have an account? <Link to="/signin">Sign in</Link>
      </div>

      <form>
        <div>
          <span>Email Address</span>
          <input type="email" />
        </div>
        <div>
          <span>Password</span>
          <input type="password" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
