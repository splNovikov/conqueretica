import React, { FC, KeyboardEvent } from 'react';
import { Form, Input, Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import OutsideClickHandler from 'react-outside-click-handler';
// Styles
import './SingleInputForm.scss';

const SingleInputForm: FC<{
  /* eslint-disable react/require-default-props */
  value?: string | undefined;
  layout?: 'vertical' | 'inline';
  /* eslint-enable */
  placeholder: string;
  formSubmitHandler: (value: string) => void;
  abortHandler: () => void;
}> = ({
  value = '',
  layout = 'vertical',
  placeholder,
  formSubmitHandler,
  abortHandler,
}) => {
  const [form] = Form.useForm();

  const handleFormSubmit = async () => {
    const v = form.getFieldValue('singleInput');
    const trimmedV = v.trim();

    if (!trimmedV.length) {
      form.setFieldsValue({ singleInput: '' });
      return;
    }

    form.resetFields();

    await formSubmitHandler(trimmedV);
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
        initialValues={{ singleInput: value }}
        layout={layout}
        onFinish={handleFormSubmit}
        className="single-input-form custom-ant-form"
      >
        <Form.Item
          name="singleInput"
          rules={[
            {
              required: true,
              message: 'Can not be empty',
            },
            {
              max: 15,
              message: 'Max 15 characters',
            },
          ]}
        >
          <Input
            placeholder={placeholder}
            autoFocus
            size="small"
            onKeyDown={handleKeyboardEvent}
          />
        </Form.Item>
        <div className="custom-ant-form-buttons-wrapper">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<CheckOutlined />}
              size="small"
              className="single-input-form-submit-btn"
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="button"
              icon={<CloseOutlined />}
              onClick={handleCancelEdit}
              size="small"
              className="single-input-form-cancel-btn"
            />
          </Form.Item>
        </div>
      </Form>
    </OutsideClickHandler>
  );
};

export default SingleInputForm;
