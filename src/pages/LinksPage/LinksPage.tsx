import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
// Firebase
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from '../../firebase';
// Interfaces
import { ITab } from '../../interfaces';
// Components
import LinksPageView from './LinksPageView';
// Utils
import { getNextSibling, httpErrorHandler } from '../../utils';

// todo: login and logout should be there as well:
// todo: when logout - we should reset everything - selectedTab
const LinksPage = () => {
  const [user] = useAuthState(firebase.auth);
  const [selectedTab, selectTab] = useState({} as ITab);

  let qTabs;
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
    await firebase.deleteTab(tab);

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
