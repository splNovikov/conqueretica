import React, { FC } from 'react';
import { UserInfo } from 'firebase/auth';
import { Layout, Skeleton } from 'antd';
// Interfaces
import { ICategory, IColumn, ITab } from '../../interfaces';
// Components
import Tabs from '../../components/Tabs';
import Columns from '../../components/Columns';
// Styles
import './LinksPageView.scss';

const { Content } = Layout;

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
}) =>
  user ? (
    <Layout className="links-page">
      <Skeleton
        loading={loadingTabs}
        active
        round
        className="tabs-skeleton"
        paragraph={false}
      >
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          selectTabHandler={selectTabHandler}
          deleteTabHandler={deleteTabHandler}
          tabsFormSubmitHandler={tabsFormSubmitHandler}
        />
      </Skeleton>
      <Content className="links-page-columns-wrapper">
        <Skeleton
          loading={loadingColumns}
          active
          round
          className="columns-skeleton"
        >
          <Columns
            columns={columns}
            createColumnHandler={createColumnHandler}
            deleteColumnHandler={deleteColumnHandler}
            categoryFormSubmitHandler={categoryFormSubmitHandler}
            deleteCategoryHandler={deleteCategoryHandler}
            createLinkHandler={createLinkHandler}
          />
        </Skeleton>
      </Content>
    </Layout>
  ) : null;

export default LinksPage;
