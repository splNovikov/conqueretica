import React, { FC, MouseEventHandler } from 'react';
import { Col } from 'antd';
// Interfaces
import { IColumn, ILink, ITab } from '../../interfaces';
// Components
import ImportantLinks from '../../components/ImportantLinks';
import AddForm from '../../components/AddForm';
import Tabs from '../../components/Tabs';
import Column from '../../components/Сolumn';
// Styles
import './LinksPageView.scss';

const LinksPage: FC<{
  tabs: ITab[];
  loadingTabs: boolean;
  selectedTab: ITab;
  selectTabHandler: (val: ITab) => void;
  tabsFormSubmitHandler: (val: string) => void;
  columns: IColumn[];
  loadingColumns: boolean;
  createColumnHandler: MouseEventHandler<HTMLButtonElement>;
  deleteColumnHandler: (val: IColumn) => void;
  importantLinks: ILink[];
}> = ({
  tabs,
  loadingTabs,
  selectedTab,
  selectTabHandler,
  tabsFormSubmitHandler,
  columns,
  loadingColumns,
  createColumnHandler,
  deleteColumnHandler,
  importantLinks,
}) => (
  <div className="links-page">
    <ImportantLinks links={importantLinks} />

    {loadingTabs && 'loading tabs progress...'}
    {tabs && tabs.length ? (
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        selectTabHandler={selectTabHandler}
      />
    ) : null}
    <AddForm formSubmitHandler={tabsFormSubmitHandler} />

    {loadingColumns && 'loading columns progress...'}
    {/* // "ant-row" class instead of Row component because Row component is failing tests */}
    <div className="ant-row">
      {columns.map((column: IColumn) => (
        <Column
          key={column.id}
          column={column}
          deleteColumnHandler={deleteColumnHandler}
        />
      ))}
      <Col span={6} className="create-column-wrapper">
        <button type="button" onClick={createColumnHandler}>
          Create Col
        </button>
      </Col>
    </div>
  </div>
);

export default LinksPage;
