import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
// Routes
import { appRoutes } from '../../router/routes';
// Context
import { UserAuth } from '../../context/authContext';
// Components
import AuthForm from '../../components/AuthForm';
import AppLogo from '../../components/AppLogo';
// Utils
import { httpErrorHandler } from '../../utils';
// Styles
import './SignInPage.scss';

const { Text } = Typography;

const SignInPage = () => {
  const [error, setError] = useState('');
  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (login: string, password: string) => {
    setError('');

    try {
      await signIn(login, password);
      navigate(`/${appRoutes.links.path}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      httpErrorHandler(err);
    }
  };

  return (
    <div className="sign-in-page">
      <div className="error-wrapper">
        <Text type="danger">{error}</Text>
      </div>

      <AppLogo width={150} />
      <h2>Conqueretica</h2>
      <h3>Sign in to your account</h3>

      <AuthForm submitHandler={handleFormSubmit} submitButtonText="Sign In" />

      <div>
        Don&apos;t have an account yet?{' '}
        <Link to={`/${appRoutes.signUp.path}`}>Sign Up</Link>
      </div>
    </div>
  );
};

export default SignInPage;
