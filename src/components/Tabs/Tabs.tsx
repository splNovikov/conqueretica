import React, { FC, useState } from 'react';
import { CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
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
          className="show-add-tab-form-icon"
          onClick={toggleDisplayForm}
        />
      ) : (
        <div className="add-tab-form-wrapper">
          <AddForm
            formSubmitHandler={tabsFormSubmitHandler}
            placeholder="create a new tab"
          />
          <CloseCircleOutlined
            className="hide-add-tab-form-icon"
            onClick={toggleDisplayForm}
          />
        </div>
      )}
    </div>
  );
};

export default Tabs;
