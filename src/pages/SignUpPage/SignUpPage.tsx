import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Firebase
// Routes
import { appRoutes } from '../../router/routes';
// Context
import { UserAuth } from '../../context/authContext';
// Interfaces
// Components
// Utils

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');

    try {
      await createUser(email, password);
      navigate(`/${appRoutes.links.path}`);
    } catch (err: any) {
      setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <div>
      <h1>Sign up for a free</h1>
      <div>
        Already have an account?{' '}
        <Link to={`/${appRoutes.signIn.path}`}>Sign In</Link>
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
        <button type="submit">Sign Up</button>
      </form>
      <div>{error}</div>
    </div>
  );
};

export default SignUpPage;
