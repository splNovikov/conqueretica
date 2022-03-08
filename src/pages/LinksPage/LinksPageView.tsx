import React, { FC } from 'react';
import { UserInfo } from 'firebase/auth';
// Interfaces
import { ICategory, IColumn, ITab } from '../../interfaces';
// Components
import Tabs from '../../components/Tabs';
import Columns from '../../components/Columns';
// Styles
import './LinksPageView.scss';

const LinksPage: FC<{
  // user
  user: UserInfo | undefined | null;
  // tabs
  tabs: ITab[];
  loadingTabs: boolean;
  selectedTab: ITab;
  selectTabHandler: (val: ITab) => void;
  deleteTabHandler: (val: ITab) => void;
  tabsFormSubmitHandler: (val: string) => void;
  // columns
  columns: IColumn[];
  loadingColumns: boolean;
  createColumnHandler: () => void;
  deleteColumnHandler: (val: IColumn) => void;
  // categories
  categoryFormSubmitHandler: (value: string, column: IColumn) => void;
  deleteCategoryHandler: (category: ICategory, column: IColumn) => void;
  // links
  createLinkHandler: (
    title: string,
    href: string,
    category: ICategory,
    column: IColumn,
  ) => void;
}> = ({
  user,
  tabs,
  loadingTabs,
  selectedTab,
  selectTabHandler,
  deleteTabHandler,
  tabsFormSubmitHandler,
  columns,
  loadingColumns,
  createColumnHandler,
  deleteColumnHandler,
  categoryFormSubmitHandler,
  deleteCategoryHandler,
  createLinkHandler,
}) => (
  <div className="links-page">
    {user ? (
      <>
        {loadingTabs && 'loading tabs progress...'}
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          selectTabHandler={selectTabHandler}
          deleteTabHandler={deleteTabHandler}
          tabsFormSubmitHandler={tabsFormSubmitHandler}
        />
        {loadingColumns && 'loading columns progress...'}
        {tabs.length && selectedTab ? (
          <Columns
            columns={columns}
            createColumnHandler={createColumnHandler}
            deleteColumnHandler={deleteColumnHandler}
            categoryFormSubmitHandler={categoryFormSubmitHandler}
            deleteCategoryHandler={deleteCategoryHandler}
            createLinkHandler={createLinkHandler}
          />
        ) : null}
      </>
    ) : null}
  </div>
);

export default LinksPage;
