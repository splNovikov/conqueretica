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
import { httpErrorHandler } from '../../utils';
// Test Data (should be fetched from BE)
import { columns, importantLinks } from '../../__test_data__';

// todo: after release multi-rerendering!!!
const LinksPage = () => {
  const [user] = useAuthState(firebase.auth);
  const [selectedTab, selectTab] = useState({} as ITab);

  let q;
  if (user) {
    q = firebase.getTabsQuery(user);
  }
  const [tabs = [], loadingTabs, tabsError] = useCollectionData<ITab>(q);

  if (tabsError?.message) {
    httpErrorHandler(tabsError);
  }

  if (tabs.length && !selectedTab?.id) {
    selectTab(tabs[0]);
  }

  const addTab = (value: string) => firebase.addTab(value, user);

  return (
    <LinksPageView
      tabs={tabs}
      loadingTabs={loadingTabs}
      importantLinks={importantLinks}
      columns={columns}
      tabsFormSubmitHandler={addTab}
      selectedTab={selectedTab}
    />
  );
};

export default LinksPage;
