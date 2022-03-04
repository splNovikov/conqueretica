import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
// Firebase
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from '../../firebase';
// Interfaces
import { ICategory, IColumn, ITab } from '../../interfaces';
// Components
import LinksPageView from './LinksPageView';
// Utils
import { getNextSibling, httpErrorHandler } from '../../utils';
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

  const deleteTab = async (tab: ITab) => {
    await firebase.deleteTab(tab);

    if (tab.id === selectedTab.id) {
      const next = getNextSibling(tabs, selectedTab, 'id');

      selectTab(next);
    }
  };
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

  // region Categories
  const categoryFormSubmitHandler = (value: string, column: IColumn) =>
    firebase.addCategory(value, column);

  const deleteCategoryHandler = (category: ICategory, column: IColumn) =>
    firebase.deleteCategory(column, category);
  // endregion Categories

  // region Links
  const createLinkHandler = (
    title: string,
    href: string,
    category: ICategory,
    column: IColumn,
  ) => firebase.addLink(title, href, category, column);
  // endregion Links

  return (
    <LinksPageView
      // user
      user={user}
      // tabs
      tabs={tabs}
      loadingTabs={loadingTabs}
      selectedTab={selectedTab}
      selectTabHandler={selectTab}
      deleteTabHandler={deleteTab}
      tabsFormSubmitHandler={addTab}
      // columns
      columns={columns}
      loadingColumns={loadingColumns}
      createColumnHandler={addColumn}
      deleteColumnHandler={deleteColumn}
      // categories
      categoryFormSubmitHandler={categoryFormSubmitHandler}
      deleteCategoryHandler={deleteCategoryHandler}
      // links
      createLinkHandler={createLinkHandler}
      // other stuff
      importantLinks={importantLinks}
    />
  );
};

export default LinksPage;
