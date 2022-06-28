import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Firebase
// Context
import { UserAuth } from '../../context/authContext';
// Interfaces
// Components
// Utils

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      navigate('/links');
    } catch (err: any) {
      setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <div>
      <h1>Sign in to your account</h1>
      <div>
        Don&apos;t have an account yet? <Link to="/signup">Sign Up</Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <span>Email Address</span>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <span>Password</span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <div>{error}</div>
    </div>
  );
};

export default SignInPage;
