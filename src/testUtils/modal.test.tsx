import { Modal } from 'antd';
import { ReactWrapper } from 'enzyme';

// Selectors:
const modalWrapperSelector = 'div.ant-modal-wrap';
const modalWrapperPrimaryButtonSelector =
  'div.ant-modal-footer button.ant-btn-primary';
const modalWrapperDefaultButtonSelector =
  'div.ant-modal-footer button.ant-btn-default';

export const getModalWrapper = (wrapper: ReactWrapper) => {
  const modal = wrapper.find(Modal);
  return modal.find(modalWrapperSelector);
};

export const getModalPrimaryButton = (modalWrapper: ReactWrapper) => {
  return modalWrapper.find(modalWrapperPrimaryButtonSelector);
};

export const getModalSecondaryButton = (modalWrapper: ReactWrapper) => {
  return modalWrapper.find(modalWrapperDefaultButtonSelector);
};

export const isModalDisplayed = (wrapper: ReactWrapper): boolean => {
  const modalWrapper = getModalWrapper(wrapper);
  return modalWrapper.prop('style')?.display === null;
};

export const isModalHidden = (wrapper: ReactWrapper): boolean => {
  const modalWrapper = getModalWrapper(wrapper);
  return modalWrapper.prop('style')?.display === 'none';
};
