import React, { FC, KeyboardEvent, RefObject } from 'react';
import { Form, Input, Button } from 'antd';
import OutsideClickHandler from 'react-outside-click-handler';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
// Styles
import './LinkForm.scss';

const LinkForm: FC<{
  /* eslint-disable react/require-default-props */
  outsideClickIgnoreElement?: RefObject<HTMLElement>;
  link?: string | undefined;
  title?: string | undefined;
  /* eslint-enable */
  formSubmitHandler: (title: string, href: string) => void;
  abortHandler: () => void;
}> = ({
  outsideClickIgnoreElement,
  link = '',
  title = '',
  formSubmitHandler,
  abortHandler,
}) => {
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

  const handleCancelClick = () => {
    abortHandler();
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      e.target instanceof Element &&
      outsideClickIgnoreElement?.current?.contains(e.target)
    ) {
      return;
    }

    abortHandler();
  };

  // todo: common esc handler
  const handleKeyboardEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      abortHandler();
    }
  };

  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      <Form
        form={form}
        initialValues={{ titleInput: title, linkInput: link }}
        layout="vertical"
        onFinish={handleFormSubmit}
        className="link-form"
      >
        <Form.Item
          name="titleInput"
          rules={[
            {
              max: 300,
              message: 'Max 300 ch.',
            },
          ]}
        >
          <Input
            placeholder="Title"
            autoFocus
            size="small"
            onKeyDown={handleKeyboardEvent}
            className="link-form-title-input"
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
            size="small"
            onKeyDown={handleKeyboardEvent}
            className="link-form-link-input"
          />
        </Form.Item>
        <div className="link-form-buttons-wrapper">
          <Button
            type="primary"
            htmlType="submit"
            icon={<CheckOutlined />}
            size="small"
            className="link-form-btn-submit"
          >
            Save
          </Button>
          <Button
            htmlType="button"
            onClick={handleCancelClick}
            size="small"
            className="link-form-btn-cancel"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </OutsideClickHandler>
  );
};

export default LinkForm;
