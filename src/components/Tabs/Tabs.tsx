import React, { FC, useState } from 'react';
import { Button, Tooltip } from 'antd';
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
  // todo: edit handler
  const editTabHandler = selectTabHandler;

  return (
    <div className="tabs">
      {tabs &&
        tabs.map((tab) => (
          <Tab
            tab={tab}
            selectedTab={selectedTab}
            selectTabHandler={selectTabHandler}
            editTabHandler={editTabHandler}
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
          <AddForm
            formSubmitHandler={tabsFormSubmitHandler}
            placeholder="create a new tab"
          />
          <Tooltip title="Cancel Adding New Tab">
            <Button
              shape="circle"
              size="small"
              icon={<CloseCircleOutlined />}
              onClick={toggleDisplayForm}
              className="btn-hide-add-tab-form"
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default Tabs;
