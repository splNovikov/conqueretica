import React, { FC } from 'react';
import { UserInfo } from 'firebase/auth';
import { Layout, Skeleton } from 'antd';
// Interfaces
import { ITab } from '../../interfaces';
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
  updateTabHandler: (val: ITab, newTitle: string) => void;
  deleteTabHandler: (val: ITab) => void;
  tabsFormSubmitHandler: (val: string) => void;
}> = ({
  user,
  tabs,
  loadingTabs,
  selectedTab,
  selectTabHandler,
  updateTabHandler,
  deleteTabHandler,
  tabsFormSubmitHandler,
}) =>
  user ? (
    <Layout className="links-page">
      {/* here possibly can be added sub-navigation */}

      <Content className="links-page-content-wrapper">
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
            updateTabHandler={updateTabHandler}
            deleteTabHandler={deleteTabHandler}
            tabsFormSubmitHandler={tabsFormSubmitHandler}
          />
        </Skeleton>

        <Content className="links-page-columns-wrapper">
          {selectedTab?.id ? <Columns selectedTab={selectedTab} /> : null}
        </Content>
      </Content>
    </Layout>
  ) : null;

export default LinksPage;
