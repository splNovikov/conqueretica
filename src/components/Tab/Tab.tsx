import React, { FC } from 'react';
// Interfaces
import { ITab } from '../../interfaces';

const Tab: FC<{
  tab: ITab;
  selectedTab: ITab;
  selectTabHandler: (val: ITab) => void;
}> = ({ tab, selectedTab, selectTabHandler }) => {
  const handleTabSelect = () =>
    tab.id !== selectedTab.id && selectTabHandler(tab);

  return (
    <span role="none" className="tab" onClick={handleTabSelect}>
      {tab.title}
      {selectedTab.id === tab.id && '[Selected]'}
    </span>
  );
};

export default Tab;
