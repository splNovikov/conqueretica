import React, { useState } from 'react';
// Firebase
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from '../../firebase';
// Interfaces
import { ITab } from '../../interfaces';
// Context
import { UserAuth } from '../../context/authContext';
// Components
import LinksPageView from './LinksPageView';
// Utils
import { getNextSibling, httpErrorHandler } from '../../utils';

const LinksPage = () => {
  const { user } = UserAuth();
  const [selectedTab, selectTab] = useState({} as ITab);

  let qTabs;
  console.log(`user: ${user?.uid}`);
  if (user) {
    qTabs = firebase.getTabsQuery(user);
  }
  const [tabs = [], loadingTabs, tabsError] = useCollectionData<ITab>(qTabs);

  if (tabsError?.message) {
    httpErrorHandler(tabsError);
  }

  // set first tab as selected by default
  if (tabs.length && !selectedTab?.id) {
    selectTab(tabs[0]);
  }

  const addTab = async (value: string) => {
    const tab = await firebase.addTab(value, user);

    if (tab) {
      selectTab(tab);
    }
  };

  const handleTabUpdate = async (tab: ITab, newTitle: string) =>
    firebase.updateTab(tab, newTitle);

  const deleteTab = async (tab: ITab) => {
    await firebase.deleteTabScenario(tab);

    if (tab.id === selectedTab.id) {
      const next = getNextSibling(tabs, selectedTab, 'id');

      selectTab(next);
    }
  };

  return (
    <LinksPageView
      // user
      user={user}
      // tabs
      tabs={tabs}
      loadingTabs={loadingTabs}
      selectedTab={selectedTab}
      selectTabHandler={selectTab}
      updateTabHandler={handleTabUpdate}
      deleteTabHandler={deleteTab}
      tabsFormSubmitHandler={addTab}
    />
  );
};

export default LinksPage;
