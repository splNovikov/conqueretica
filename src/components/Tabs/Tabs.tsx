import React, { FC } from 'react';
// Interfaces
import { ITab } from '../../interfaces';
// Styles
import './Tab.scss';

const Tabs: FC<{ tabs: ITab[] }> = ({ tabs }) => {
  return (
    <div className="tabs">
      {tabs &&
        tabs.map((tab) => (
          <span className="tab" key={tab.id}>
            {tab.title}
          </span>
        ))}
    </div>
  );
};

export default Tabs;
