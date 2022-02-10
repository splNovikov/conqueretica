import React, { FC } from 'react';
// Interfaces
import { ITab } from '../../interfaces';
// Styles
import './Tabs.scss';

const Tabs: FC<{
  tabs: ITab[];
  selectedTab: ITab;
  selectTabHandler: (val: ITab) => void;
}> = ({ tabs, selectedTab, selectTabHandler }) => {
  return (
    <div className="tabs">
      {tabs &&
        tabs.map((tab) => (
          <Tab
            tab={tab}
            selectedTab={selectedTab}
            selectTabHandler={selectTabHandler}
            key={tab.id}
          />
        ))}
    </div>
  );
};

// todo: separate component
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

export default Tabs;
