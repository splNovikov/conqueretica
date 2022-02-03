import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
// Firebase
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from '../../firebase';
// Components
import LinksPageView from './LinksPageView';
// Test Data (should be fetched from BE)
import { columns, importantLinks } from '../../__test_data__';
import { httpErrorHandler } from '../../utils';

// todo: after release multi-rerendering!!!
const LinksPage = () => {
  const [user] = useAuthState(firebase.auth);
  const [selectedTab, selectTab] = useState({});

  let q;
  if (user) {
    q = firebase.getTabsQuery(user);
  }
  const [tabs = [], loadingTabs, tabsError] = useCollectionData(q, {
    idField: 'id',
  });

  if (tabsError?.message) {
    httpErrorHandler(tabsError);
  }

  if (tabs.length && !selectedTab) {
    selectTab(tabs[0]);
  }

  const sendMessage = (value: string) => firebase.sendMessage(value, user);

  const addTab = (value: string) => firebase.addTab(value, user);

  return (
    <LinksPageView
      user={user}
      // todo:
      // @ts-ignore
      tabs={tabs}
      loadingTabs={loadingTabs}
      importantLinks={importantLinks}
      columns={columns}
      messagesFormSubmitHandler={sendMessage}
      tabsFormSubmitHandler={addTab}
    />
  );
};

export default LinksPage;
