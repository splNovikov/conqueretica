import React, { FC } from 'react';
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
    <div className="tab">
      <span
        role="none"
        onClick={handleTabSelect}
        className={classNames('tab-title', {
          selected: selectedTab.id === tab.id,
        })}
      >
        {tab.title}
      </span>
      <DeleteOutlined onClick={handleTabDelete} className="delete-icon" />
    </div>
  );
};

export default Tab;
