import * as firestore from '@firebase/firestore';

import * as queryBuilders from './queryBuilders';
// Utils
import { firestoreMockImplementation as fsMock } from '../testUtils/firestore.test';

const origGetTabsQuery = queryBuilders.getTabsQuery;
const origGetColumnsQuery = queryBuilders.getColumnsQuery;
const origGetCategoriesQuery = queryBuilders.getCategoriesQuery;
const origConsoleError = console.error;

beforeEach(() => {
  firestore.collection = jest.fn(fsMock.mockCollection);
  firestore.doc = jest.fn(fsMock.mockDoc);
  firestore.getDocs = jest.fn(fsMock.mockGetDocs);

  queryBuilders.getTabsQuery = jest.fn(fsMock.getTabsQuery);
  queryBuilders.getColumnsQuery = jest.fn(fsMock.getColumnsQuery);
  queryBuilders.getCategoriesQuery = jest.fn(fsMock.getCategoriesQuery);
  console.error = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();

  queryBuilders.getTabsQuery = origGetTabsQuery;
  queryBuilders.getColumnsQuery = origGetColumnsQuery;
  queryBuilders.getCategoriesQuery = origGetCategoriesQuery;
  console.error = origConsoleError;
});

it('Dummy BeforeEach test', () => {
  console.error('Dummy Test');
  expect(console.error).toHaveBeenCalledWith('Dummy Test');
});
