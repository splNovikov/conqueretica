import React, { FC, useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
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
  const [displayForm, setDisplayForm] = useState(false);
  const toggleDisplayForm = () => setDisplayForm(!displayForm);

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
      {!displayForm ? (
        <PlusCircleOutlined
          className="add-tab-icon"
          onClick={toggleDisplayForm}
        />
      ) : (
        <AddForm
          formSubmitHandler={tabsFormSubmitHandler}
          placeholder="create a new tab"
        />
      )}
    </div>
  );
};

export default Tabs;
