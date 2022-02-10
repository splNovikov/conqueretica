import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
// Firebase
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from '../../firebase';
// Interfaces
import { IColumn, ITab } from '../../interfaces';
// Components
import LinksPageView from './LinksPageView';
// Utils
import { httpErrorHandler } from '../../utils';
// Test Data (should be fetched from BE)
import { importantLinks } from '../../__test_data__';

// todo: after release multi-rerendering!!!
const LinksPage = () => {
  const [user] = useAuthState(firebase.auth);
  const [selectedTab, selectTab] = useState({} as ITab);

  // region Tabs
  let qTabs;
  if (user) {
    qTabs = firebase.getTabsQuery(user);
  }
  const [tabs = [], loadingTabs, tabsError] = useCollectionData<ITab>(qTabs);

  if (tabsError?.message) {
    httpErrorHandler(tabsError);
  }

  if (tabs.length && !selectedTab?.id) {
    selectTab(tabs[0]);
  }

  const addTab = (value: string) => firebase.addTab(value, user);
  // endregion Tabs

  // region Columns
  let qColumns;
  if (selectedTab?.id) {
    qColumns = firebase.getColumnsQuery(selectedTab);
  }
  const [columns = [], loadingColumns, columnsError] =
    useCollectionData<IColumn>(qColumns);

  if (columnsError?.message) {
    httpErrorHandler(columnsError);
  }

  const addColumn = () => firebase.addColumn(selectedTab);

  const deleteColumn = (column: IColumn) => firebase.deleteColumn(column);
  // endregion Columns

  return (
    <LinksPageView
      tabs={tabs}
      loadingTabs={loadingTabs}
      selectedTab={selectedTab}
      selectTabHandler={selectTab}
      tabsFormSubmitHandler={addTab}
      columns={columns}
      loadingColumns={loadingColumns}
      createColumnHandler={addColumn}
      deleteColumnHandler={deleteColumn}
      importantLinks={importantLinks}
    />
  );
};

export default LinksPage;
