import React, { FC } from 'react';
// Interfaces
import { ITab } from '../../interfaces';

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
      <span role="none" onClick={handleTabSelect} className="tab-title">
        {tab.title}
        {selectedTab.id === tab.id && '[Selected]'}
      </span>
      <button type="button" onClick={handleTabDelete}>
        Delete Tab
      </button>
    </div>
  );
};

export default Tab;
