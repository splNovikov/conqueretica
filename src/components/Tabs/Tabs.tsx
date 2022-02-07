import React, { FC } from 'react';
// Interfaces
import { ITab } from '../../interfaces';
// Styles
import './Tab.scss';

const Tabs: FC<{ tabs: ITab[]; selectedTab: ITab }> = ({
  tabs,
  selectedTab,
}) => {
  return (
    <div className="tabs">
      {tabs &&
        tabs.map((tab) => (
          <span className="tab" key={tab.id}>
            {tab.title}
            {selectedTab.id === tab.id && '[Selected]'}
          </span>
        ))}
    </div>
  );
};

export default Tabs;
