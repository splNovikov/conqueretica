import React, { FC, KeyboardEvent } from 'react';
import { Form, Input, Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const LinkForm: FC<{
  /* eslint-disable react/require-default-props */
  link?: string | undefined;
  title?: string | undefined;
  /* eslint-enable */
  formSubmitHandler: (title: string, href: string) => void;
  abortHandler: () => void;
}> = ({ link = '', title = '', formSubmitHandler, abortHandler }) => {
  const [form] = Form.useForm();

  const handleFormSubmit = async () => {
    const t = form.getFieldValue('titleInput');
    const l = form.getFieldValue('linkInput');
    const trimmedTitle = t.trim();
    const trimmedLink = l.trim();

    if (!trimmedLink.length) {
      form.setFieldsValue({ titleInput: '' });
      return;
    }

    form.resetFields();

    await formSubmitHandler(
      trimmedTitle.length ? trimmedTitle : trimmedLink,
      trimmedLink,
    );
  };

  const handleBlur = () => {
    abortHandler();
  };

  const handleCancelEdit = () => {
    abortHandler();
  };

  const handleKeyboardEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      abortHandler();
    }
  };

  return (
    <Form
      form={form}
      initialValues={{ titleInput: title, linkInput: link }}
      layout="inline"
      onFinish={handleFormSubmit}
      className="single-input-form"
      onBlur={handleBlur}
    >
      <Form.Item
        name="titleInput"
        rules={[
          {
            max: 30,
            message: 'Max 30 characters',
          },
        ]}
      >
        <Input
          placeholder="Title"
          size="small"
          onKeyDown={handleKeyboardEvent}
        />
      </Form.Item>
      <Form.Item
        name="linkInput"
        rules={[
          {
            required: true,
            message: 'Can not be empty',
          },
          {
            max: 3000,
            message: 'Max 3000 characters',
          },
        ]}
      >
        <Input
          placeholder="Href"
          autoFocus
          size="small"
          onKeyDown={handleKeyboardEvent}
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
          onClick={handleCancelEdit}
          size="small"
        />
      </Form.Item>
    </Form>
  );
};

export default LinkForm;
