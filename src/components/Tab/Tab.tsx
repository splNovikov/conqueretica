import React, { FC } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { MoreOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import classNames from 'classnames';
// Interfaces
import { ITab } from '../../interfaces';
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
  editTabHandler: (val: ITab) => void;
}> = ({
  tab,
  selectedTab,
  selectTabHandler,
  deleteTabHandler,
  editTabHandler,
}) => {
  const handleTabSelect = () =>
    tab.id !== selectedTab.id && selectTabHandler(tab);

  const handleTabDelete = () => deleteTabHandler(tab);

  const handleTabEdit = () => editTabHandler(tab);

  return (
    <div
      className={classNames('tab', {
        'tab-selected': selectedTab.id === tab.id,
      })}
    >
      <span role="none" onClick={handleTabSelect} className="tab-title">
        {tab.title}
      </span>
      <Dropdown
        key="actions"
        overlay={actionsMenu(tab, handleTabDelete, handleTabEdit)}
        placement="bottomRight"
        arrow
      >
        <Button
          type="text"
          icon={<MoreOutlined />}
          className="actions-menu-trigger"
        />
      </Dropdown>
    </div>
  );
};

export default Tab;
