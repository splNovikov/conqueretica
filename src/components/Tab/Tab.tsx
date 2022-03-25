import React, { FC } from 'react';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import classNames from 'classnames';
// Interfaces
import { ITab } from '../../interfaces';
// Styles
import './Tab.scss';

const Tab: FC<{
  tab: ITab;
  selectedTab: ITab;
  selectTabHandler: (val: ITab) => void;
  deleteTabHandler: (val: ITab) => void;
}> = ({ tab, selectedTab, selectTabHandler, deleteTabHandler }) => {
  const handleTabSelect = () =>
    tab.id !== selectedTab.id && selectTabHandler(tab);

  const handleTabDelete = () => deleteTabHandler(tab);

  return (
    <div
      className={classNames('tab', {
        'tab-selected': selectedTab.id === tab.id,
      })}
    >
      <span role="none" onClick={handleTabSelect}>
        {tab.title}
      </span>
      <Tooltip title={`Delete Tab "${tab.title}"`}>
        <Button
          size="small"
          type="link"
          icon={<DeleteOutlined />}
          onClick={handleTabDelete}
          className="btn-delete-tab"
        />
      </Tooltip>
    </div>
  );
};

export default Tab;
