import React from 'react';
import { Link } from 'react-router-dom';
// Firebase
// Interfaces
// Components
// Utils

const SignInPage = () => {
  return (
    <div>
      <h1>Sign in to your account</h1>
      <div>
        Don&apos;t have an account yet? <Link to="/signup">Sign Up</Link>
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
