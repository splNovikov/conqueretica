import React, { FC, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
// Interfaces
import { ITab } from '../../interfaces';
// Components
import Tab from '../Tab';
import SingleInputForm from '../SingleInputForm';
// Styles
import './Tabs.scss';

const Tabs: FC<{
  tabs: ITab[];
  selectedTab: ITab;
  selectTabHandler: (val: ITab) => void;
  updateTabHandler: (tab: ITab, newTitle: string) => void;
  deleteTabHandler: (val: ITab) => void;
  tabsFormSubmitHandler: (val: string) => void;
}> = ({
  tabs,
  selectedTab,
  selectTabHandler,
  deleteTabHandler,
  updateTabHandler,
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
            updateTabHandler={updateTabHandler}
            deleteTabHandler={deleteTabHandler}
            key={tab.id}
          />
        ))}
      {!displayForm ? (
        <Tooltip title="Add New Tab">
          <Button
            shape="circle"
            size="small"
            icon={<PlusCircleOutlined />}
            onClick={toggleDisplayForm}
            className="btn-show-add-tab-form"
          />
        </Tooltip>
      ) : (
        <div className="add-tab-form-wrapper">
          <SingleInputForm
            placeholder="Enter Tab Name"
            formSubmitHandler={tabsFormSubmitHandler}
            abortHandler={toggleDisplayForm}
          />
        </div>
      )}
    </div>
  );
};

export default Tabs;
