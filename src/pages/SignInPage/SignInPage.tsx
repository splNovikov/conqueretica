import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
// Routes
import { appRoutes } from '../../router/routes';
// Context
import { UserAuth } from '../../context/authContext';
// Utils
import { httpErrorHandler } from '../../utils';
// Styles
import './SignInPage.scss';

const { Text } = Typography;

const SignInPage = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const [isSubmitIsDisabled, setIsSubmitIsDisabled] = useState(true);
  const { signIn } = UserAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    const login = form.getFieldValue('loginInput');
    const password = form.getFieldValue('passwordInput');

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

  const onFormChange = (): void => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    const fieldsValues = form.getFieldsValue();
    const isAnyFieldIsEmpty = Object.values(fieldsValues).some(
      (item) => item === undefined,
    );

    setIsSubmitIsDisabled(hasErrors || isAnyFieldIsEmpty);
  };

  return (
    <div className="sign-in-page">
      <div className="error-wrapper">
        <Text type="danger">{error}</Text>
      </div>

      <h1>Conqueretica</h1>
      <h2>Sign in to your account</h2>

      <Form
        form={form}
        layout="horizontal"
        onFinish={handleFormSubmit}
        onFieldsChange={onFormChange}
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
          <Button
            type="primary"
            htmlType="submit"
            className="sign-in-button"
            disabled={isSubmitIsDisabled}
          >
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
