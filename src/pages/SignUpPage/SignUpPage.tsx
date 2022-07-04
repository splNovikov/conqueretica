import React, { useState } from 'react';
import { Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
// Routes
import { appRoutes } from '../../router/routes';
// Context
import { UserAuth } from '../../context/authContext';
// Components
import AuthForm from '../../components/AuthForm';
// Utils
import { httpErrorHandler } from '../../utils';
// Styles
import './SignUpPage.scss';

const { Text } = Typography;

const SignUpPage = () => {
  const [error, setError] = useState('');
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (login: string, password: string) => {
    setError('');

    try {
      await createUser(login, password);
      navigate(`/${appRoutes.links.path}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      httpErrorHandler(err);
    }
  };

  return (
    <div className="sign-up-page">
      <div className="error-wrapper">
        <Text type="danger">{error}</Text>
      </div>

      <h1>Conqueretica</h1>
      <h2>Sign up for a free</h2>

      <AuthForm submitHandler={handleFormSubmit} submitButtonText="Sign Up" />

      <div>
        Already have an account?{' '}
        <Link to={`/${appRoutes.signIn.path}`}>Sign In</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
