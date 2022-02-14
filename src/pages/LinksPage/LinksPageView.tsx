import React, { FC } from 'react';
import { UserInfo } from 'firebase/auth';
// Interfaces
import { IColumn, ILink, ITab } from '../../interfaces';
// Components
import ImportantLinks from '../../components/ImportantLinks';
import Tabs from '../../components/Tabs';
import Columns from '../../components/Columns';
// Styles
import './LinksPageView.scss';

const LinksPage: FC<{
  user: UserInfo | undefined | null;
  tabs: ITab[];
  loadingTabs: boolean;
  selectedTab: ITab;
  selectTabHandler: (val: ITab) => void;
  tabsFormSubmitHandler: (val: string) => void;
  columns: IColumn[];
  loadingColumns: boolean;
  createColumnHandler: () => void;
  deleteColumnHandler: (val: IColumn) => void;
  importantLinks: ILink[];
}> = ({
  user,
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

    {user ? (
      <>
        {loadingTabs && 'loading tabs progress...'}
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          selectTabHandler={selectTabHandler}
          tabsFormSubmitHandler={tabsFormSubmitHandler}
        />
        {loadingColumns && 'loading columns progress...'}
        <Columns
          columns={columns}
          createColumnHandler={createColumnHandler}
          deleteColumnHandler={deleteColumnHandler}
        />
      </>
    ) : null}
  </div>
);

export default LinksPage;
