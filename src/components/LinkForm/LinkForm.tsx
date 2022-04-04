import React, { FC, KeyboardEvent } from 'react';
import { Form, Input, Button } from 'antd';
import OutsideClickHandler from 'react-outside-click-handler';
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

  const handleCancelEdit = () => {
    abortHandler();
  };

  // todo: common esc handler
  const handleKeyboardEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      abortHandler();
    }
  };

  return (
    <OutsideClickHandler onOutsideClick={handleCancelEdit}>
      <Form
        form={form}
        initialValues={{ titleInput: title, linkInput: link }}
        layout="inline"
        onFinish={handleFormSubmit}
        className="single-input-form"
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
              type: 'url',
              message: 'Invalid url',
            },
            {
              max: 300,
              message: 'Max 300 ch.',
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
    </OutsideClickHandler>
  );
};

export default LinkForm;
