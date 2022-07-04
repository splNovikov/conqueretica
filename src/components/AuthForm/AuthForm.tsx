import React, { FC, useState } from 'react';
import { Button, Form, Input } from 'antd';
// Styles
import './AuthForm.scss';

const AuthForm: FC<{
  submitHandler: (login: string, password: string) => void;
}> = ({ submitHandler }) => {
  const [form] = Form.useForm();
  const [isSubmitIsDisabled, setIsSubmitIsDisabled] = useState(true);

  const handleFormSubmit = async () => {
    const login = form.getFieldValue('loginInput');
    const password = form.getFieldValue('passwordInput');

    await submitHandler(login, password);
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
    <Form
      name="auth-form"
      form={form}
      layout="horizontal"
      onFinish={handleFormSubmit}
      onFieldsChange={onFormChange}
      size="large"
      className="auth-form"
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
          className="auth-form-submit-button"
          disabled={isSubmitIsDisabled}
        >
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AuthForm;
