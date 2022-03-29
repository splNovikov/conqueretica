import React, { FC, useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
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
  deleteTabHandler: (val: ITab) => void;
  editTabHandler: (val: ITab, newTitle: string) => void;
}> = ({
  tab,
  selectedTab,
  selectTabHandler,
  deleteTabHandler,
  editTabHandler,
}) => {
  const [editMode, setEditMode] = useState(false);
  const handleTabSelect = () =>
    tab.id !== selectedTab.id && selectTabHandler(tab);

  const handleTabDelete = () => deleteTabHandler(tab);

  const handleTabEdit = async (v: string) => {
    disableEditMode();

    if (tab.title !== v) {
      await editTabHandler(tab, v);
    }
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
          formSubmitHandler={handleTabEdit}
          abortHandler={disableEditMode}
        />
      )}
    </div>
  );
};

export default Tab;
