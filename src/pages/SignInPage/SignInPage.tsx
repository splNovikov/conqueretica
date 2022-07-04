import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
// Firebase
// Routes
import { appRoutes } from '../../router/routes';
// Context
import { UserAuth } from '../../context/authContext';
// Interfaces
// Components
// Utils
// Styles
import './SignInPage.scss';

const SignInPage = () => {
  const [form] = Form.useForm();

  const [error, setError] = useState('');
  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    const login = form.getFieldValue('loginInput');
    const password = form.getFieldValue('passwordInput');

    setError('');
    try {
      await signIn(login, password);
      navigate(`/${appRoutes.links.path}`);
    } catch (err: any) {
      setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <div className="sign-in-page">
      <h1>Conqueretica</h1>
      <h2>Sign in to your account</h2>
      <div>{error}</div>

      <Form
        form={form}
        layout="horizontal"
        onFinish={handleFormSubmit}
        size="large"
        className="sign-in-form"
      >
        <Form.Item
          name="loginInput"
          rules={[
            {
              required: true,
              message: 'Can not be empty',
            },
          ]}
        >
          <Input placeholder="Login" autoFocus />
        </Form.Item>
        <Form.Item
          name="passwordInput"
          rules={[
            {
              required: true,
              message: 'Can not be empty',
            },
          ]}
        >
          <Input placeholder="Password" type="password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="sign-in-button">
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <div>
        Don&apos;t have an account yet?{' '}
        <Link to={`/${appRoutes.signUp.path}`}>Sign Up</Link>
      </div>
    </div>
  );
};

export default SignInPage;
