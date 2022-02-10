import React, { FC, MouseEventHandler } from 'react';
import { Col } from 'antd';
// Interfaces
import { IColumn, ICategory, ILink, ITab } from '../../interfaces';
// Components
import ImportantLinks from '../../components/ImportantLinks';
import Linky from '../../components/Linky';
import AddForm from '../../components/AddForm';
import Tabs from '../../components/Tabs';
// Styles
import './LinksPageView.scss';

// todo: remove this:
const style = {
  border: '1px solid #0092ff',
};

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
      <Col span={6} style={style}>
        <button type="button" onClick={createColumnHandler}>
          Create
        </button>
      </Col>
    </div>
  </div>
);

const Column: FC<{
  column: IColumn;
  deleteColumnHandler: (val: IColumn) => void;
}> = ({ column, deleteColumnHandler }) => {
  const handleColumnDelete = () => deleteColumnHandler(column);

  return (
    <Col span={6} style={style}>
      <div>Col</div>
      <button type="button" onClick={handleColumnDelete}>
        Delete Column
      </button>
      {column.categories.map((category: ICategory) => (
        <div key={category.id}>
          <div>{category.title}</div>
          {category.links.map((l: ILink) => (
            <div key={l.id} className="linky-wrapper">
              <Linky link={l} ellipsed />
            </div>
          ))}
        </div>
      ))}
    </Col>
  );
};

export default LinksPage;
