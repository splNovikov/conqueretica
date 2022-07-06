import React, { FC, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
// Styles
import './AuthForm.scss';

const AuthForm: FC<{
  submitButtonText: string;
  submitHandler: (login: string, password: string) => void;
}> = ({ submitButtonText, submitHandler }) => {
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
    const isAnyFieldEmpty = Object.values(fieldsValues).some(
      (item) => item === undefined,
    );

    setIsSubmitIsDisabled(hasErrors || isAnyFieldEmpty);
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
        <Input placeholder="Login" autoFocus type="email" />
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
        <Input.Password
          placeholder="Password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="auth-form-submit-button"
          disabled={isSubmitIsDisabled}
        >
          {submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AuthForm;
