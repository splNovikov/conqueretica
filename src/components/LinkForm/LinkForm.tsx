import React, { FC, KeyboardEvent, RefObject } from 'react';
import { Form, Input, Button } from 'antd';
import OutsideClickHandler from 'react-outside-click-handler';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
// Styles
import './LinkForm.scss';

const LinkForm: FC<{
  outsideClickIgnoreElement?: RefObject<HTMLElement>;
  href?: string | undefined;
  title?: string | undefined;
  deleteHandler?: () => void;
  formSubmitHandler: (title: string, href: string) => void;
  formErrorsHandler?: (count: number) => void;
  abortHandler: () => void;
}> = ({
  outsideClickIgnoreElement,
  href = '',
  title = '',
  deleteHandler,
  formSubmitHandler,
  formErrorsHandler,
  abortHandler,
}) => {
  const [form] = Form.useForm();

  const handleFormSubmit = () => {
    const t = form.getFieldValue('titleInput');
    const l = form.getFieldValue('linkInput');
    const trimmedTitle = t.trim();
    const trimmedLink = l.trim();

    form.resetFields();

    formSubmitHandler(
      trimmedTitle.length ? trimmedTitle : trimmedLink,
      trimmedLink,
    );
  };

  const handleCancelClick = () => {
    abortHandler();
  };

  const handleDeleteClick = () => {
    if (deleteHandler && typeof deleteHandler === 'function') {
      deleteHandler();
    }
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

  const handleFormValuesChange = () => {
    if (!formErrorsHandler) {
      return;
    }

    const [{ errors: tErrs }, { errors: lErrs }] = form.getFieldsError([
      'titleInput',
      'linkInput',
    ]);

    formErrorsHandler(tErrs.length + lErrs.length);
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
        initialValues={{ titleInput: title, linkInput: href }}
        layout="vertical"
        onFinish={handleFormSubmit}
        className="link-form custom-ant-form"
        onFieldsChange={handleFormValuesChange}
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
              max: 1500,
              message: 'Max 1500 ch.',
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
        <div className="custom-ant-form-buttons-wrapper">
          {deleteHandler ? (
            <Form.Item>
              <Button
                htmlType="button"
                icon={<DeleteOutlined />}
                onClick={handleDeleteClick}
                size="small"
                className="link-form-btn-delete"
              />
            </Form.Item>
          ) : null}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<CheckOutlined />}
              size="small"
              className="link-form-btn-submit"
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="button"
              icon={<CloseOutlined />}
              onClick={handleCancelClick}
              size="small"
              className="link-form-btn-cancel"
            />
          </Form.Item>
        </div>
      </Form>
    </OutsideClickHandler>
  );
};

export default LinkForm;
