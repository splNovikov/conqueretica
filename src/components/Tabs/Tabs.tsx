import React, { FC } from 'react';
// Interfaces
import { ITab } from '../../interfaces';
// Components
import Tab from '../Tab';
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

export default Tabs;
