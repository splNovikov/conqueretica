import React, { FC, useState } from 'react';
import { Button, Dropdown, Menu, Modal } from 'antd';
import { MoreOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import classNames from 'classnames';
// Interfaces
import { ITab } from '../../interfaces';
// Components
import SingleInputForm from '../SingleInputForm';
// Styles
import './Tab.scss';

const actionsMenu = (
  tab: ITab,
  handleTabDelete: () => void,
  handleTabEdit: () => void,
) => (
  <Menu>
    <Menu.Item key="edit" onClick={handleTabEdit} className="edit-tab">
      <EditOutlined /> Edit Tab
    </Menu.Item>
    <Menu.Item key="delete" onClick={handleTabDelete} className="delete-tab">
      <DeleteOutlined /> Delete Tab
    </Menu.Item>
  </Menu>
);

const Tab: FC<{
  tab: ITab;
  selectedTab: ITab;
  selectTabHandler: (val: ITab) => void;
  updateTabHandler: (val: ITab, newTitle: string) => void;
  deleteTabHandler: (val: ITab) => void;
}> = ({
  tab,
  selectedTab,
  selectTabHandler,
  updateTabHandler,
  deleteTabHandler,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const showConfirmModal = () => {
    setIsConfirmModalVisible(true);
  };

  const handleConfirmModalOk = () => {
    setIsConfirmModalVisible(false);
    deleteTabHandler(tab);
  };

  const handleConfirmModalCancel = () => {
    setIsConfirmModalVisible(false);
  };

  const handleTabDelete = () => {
    showConfirmModal();
  };

  const handleTabSelect = () => {
    if (tab.id !== selectedTab.id) {
      selectTabHandler(tab);
    }
  };

  const handleTabUpdate = async (v: string) => {
    disableEditMode();

    if (tab.title !== v) {
      await updateTabHandler(tab, v);
    }
  };

  const handleCancelEdit = () => {
    disableEditMode();
  };

  const enableEditMode = () => setEditMode(true);

  const disableEditMode = () => setEditMode(false);

  return (
    <div
      className={classNames('tab', {
        'tab-selected': selectedTab.id === tab.id,
        'edit-mode': editMode,
      })}
    >
      <Modal
        title="Delete Tab Confirmation"
        visible={isConfirmModalVisible}
        onOk={handleConfirmModalOk}
        onCancel={handleConfirmModalCancel}
      >
        <p>Are you sure you want to delete tab &quot;{tab.title}&quot;?</p>
        <p>
          This action will permanently delete all this tab contains and cannot
          be undone
        </p>
      </Modal>
      {!editMode ? (
        <>
          <span role="none" onClick={handleTabSelect} className="tab-title">
            {tab.title}
          </span>
          <Dropdown
            key="actions"
            overlay={actionsMenu(tab, handleTabDelete, enableEditMode)}
            placement="bottomRight"
            arrow
          >
            <Button
              type="text"
              icon={<MoreOutlined />}
              className="actions-menu-trigger"
            />
          </Dropdown>
        </>
      ) : (
        <SingleInputForm
          value={tab.title}
          placeholder="Enter Tab Name"
          formSubmitHandler={handleTabUpdate}
          abortHandler={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default Tab;
