import React, { FC } from 'react';
import { Form, Input, Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
// Styles
import './SingleInputForm.scss';

const SingleInputForm: FC<{
  // eslint-disable-next-line react/require-default-props
  value?: string | undefined;
  placeholder: string;
  formSubmitHandler: (value: string) => void;
  abortHandler: () => void;
}> = ({ value = '', placeholder, formSubmitHandler, abortHandler }) => {
  const [form] = Form.useForm();

  const handleFormSubmit = async () => {
    const v = form.getFieldValue('singleInput');

    form.resetFields();

    await formSubmitHandler(v);
  };

  return (
    <Form
      form={form}
      initialValues={{ singleInput: value }}
      layout="inline"
      onFinish={handleFormSubmit}
      className="single-input-form"
    >
      <Form.Item
        name="singleInput"
        rules={[
          {
            required: true,
            message: 'Can not be empty',
          },
          {
            min: 2,
            message: 'Min 2 characters',
          },
        ]}
      >
        <Input
          placeholder={placeholder}
          autoFocus
          size="small"
          onBlur={abortHandler}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<CheckOutlined />}
          size="small"
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="button"
          icon={<CloseOutlined />}
          onClick={abortHandler}
          size="small"
        />
      </Form.Item>
    </Form>
  );
};

export default SingleInputForm;
