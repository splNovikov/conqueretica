// todo: tests
export const defaultConfirmModal = (
  toggleVisibility: (val: boolean) => void,
  okHandler: () => void,
) => {
  return {
    showConfirmModal: () => {
      toggleVisibility(true);
    },
    handleConfirmModalOk: () => {
      toggleVisibility(false);
      okHandler();
    },
    handleConfirmModalCancel: () => {
      toggleVisibility(false);
    },
  };
};
