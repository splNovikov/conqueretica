import React, { FC } from 'react';
// Interfaces
import { ITab } from '../../interfaces';
// Components
import Tab from '../Tab';
import AddForm from '../AddForm';
// Styles
import './Tabs.scss';

const Tabs: FC<{
  tabs: ITab[];
  selectedTab: ITab;
  selectTabHandler: (val: ITab) => void;
  deleteTabHandler: (val: ITab) => void;
  tabsFormSubmitHandler: (val: string) => void;
}> = ({
  tabs,
  selectedTab,
  selectTabHandler,
  deleteTabHandler,
  tabsFormSubmitHandler,
}) => {
  return (
    <div className="tabs">
      {tabs &&
        tabs.map((tab) => (
          <Tab
            tab={tab}
            selectedTab={selectedTab}
            selectTabHandler={selectTabHandler}
            deleteTabHandler={deleteTabHandler}
            key={tab.id}
          />
        ))}
      <AddForm
        formSubmitHandler={tabsFormSubmitHandler}
        placeholder="create a new tab"
      />
    </div>
  );
};

export default Tabs;
