import { Firestore } from 'firebase/firestore';
// Test Data
import { categories, columns, tabs } from '../__test_data__';
import {
  categoriesConverter,
  columnsConverter,
  tabsConverter,
} from '../firebase/queryBuilders';

const usersRef = { usersRef: 'test_usersRef' };
const tabsRef = { tabsRef: 'test_tabsRef', withConverter: () => tabsConverter };
const columnsRef = {
  columnRef: 'test_columnsRef',
  withConverter: () => columnsConverter,
};
const categoriesRef = {
  categoryRef: 'test_categoriesRef',
  withConverter: () => categoriesConverter,
};

const userDoc = { userDoc: 'test_userDoc' };
const tabDoc = { tabDoc: 'test_tabDoc' };
const columnDoc = { columnDoc: 'test_columnDoc' };
const categoryDoc = { categoryDoc: 'test_categoryDoc' };

const dataTab = () => tabs[0];
const tabsDocs = {
  docs: [{ data: dataTab }],
};
const dataCol = () => columns[0];
const columnsDocs = {
  docs: [{ data: dataCol }, { data: dataCol }],
};
const dataCat = () => categories[0];
const categoriesDocs = {
  docs: [{ data: dataCat }, { data: dataCat }, { data: dataCat }],
};

const tabsQuery = {
  query: 'tabs_q',
};
const columnsQuery = {
  query: 'columns_q',
};
const categoriesQuery = {
  query: 'categories_q',
};

const mockCollection = (firestore: Firestore, path: string) => {
  if (path === 'users') {
    return usersRef;
  }

  if (path === 'tabs') {
    return tabsRef;
  }

  if (path === 'columns') {
    return columnsRef;
  }

  if (path === 'categories') {
    return categoriesRef;
  }

  return null;
};

const mockDoc = (firestore: Firestore, path: string) => {
  if (firestore?.type !== 'firestore') {
    return null;
  }

  // todo: path should be a constant in separate file
  if (path === 'users') {
    return userDoc;
  }

  if (path === 'tabs') {
    return tabDoc;
  }

  if (path === 'columns') {
    return columnDoc;
  }

  if (path === 'categories') {
    return categoryDoc;
  }

  return null;
};

const mockGetDocs = ({ query }) => {
  if (query === 'tabs_q') {
    return tabsDocs;
  }
  if (query === 'columns_q') {
    return columnsDocs;
  }
  if (query === 'categories_q') {
    return categoriesDocs;
  }
};

const getTabsQuery = () => tabsQuery;
const getColumnsQuery = () => columnsQuery;
const getCategoriesQuery = () => categoriesQuery;

it('Dummy Firestore test', () => {
  expect(tabsDocs.docs.length).toBe(1);
  expect(columnsDocs.docs.length).toBe(2);
  expect(categoriesDocs.docs.length).toBe(3);
});

export const firestoreMockImplementation = {
  usersRef,

  userDoc,
  tabDoc,
  columnDoc,
  categoryDoc,

  columnsDocs,
  categoriesDocs,

  mockCollection,
  mockDoc,
  mockGetDocs,

  getTabsQuery,
  getColumnsQuery,
  getCategoriesQuery,
};
