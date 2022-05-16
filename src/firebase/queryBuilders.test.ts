import * as firestore from '@firebase/firestore';
import {
  getCategoriesQuery,
  getColumnsQuery,
  getTabsQuery,
} from './queryBuilders';
// Test Data
import { columns, tabs, user } from '../__test_data__';
// todo: 16-17,40-41,62-63
describe('Query Builders', () => {
  const withConverterResult = { ref: 'test_ref' };
  const ref = { withConverter: () => withConverterResult };
  const whereResults = 'where_res';
  const orderByResults = 'orderBy_res';
  const origQuery = firestore.query;
  const origWhere = firestore.where;
  const origOrderBy = firestore.orderBy;

  beforeEach(() => {
    firestore.query = jest.fn();
    firestore.where = jest.fn();
    firestore.orderBy = jest.fn();
    jest.spyOn(firestore, 'collection').mockReturnValue(ref);
    jest.spyOn(firestore, 'where').mockReturnValue(whereResults);
    jest.spyOn(firestore, 'orderBy').mockReturnValue(orderByResults);
  });

  afterEach(() => {
    firestore.query = origQuery;
    firestore.where = origWhere;
    firestore.orderBy = origOrderBy;
    jest.resetAllMocks();
  });

  describe('Categories Queries', () => {
    it('Get Categories Query', () => {
      const column = columns[0];
      getCategoriesQuery(column);

      expect(firestore.where).toHaveBeenCalledWith('columnId', '==', column.id);
      expect(firestore.orderBy).toHaveBeenCalledWith('createdAt', 'asc');
      expect(firestore.query).toHaveBeenCalledWith(
        withConverterResult,
        whereResults,
        orderByResults,
      );
    });

    it('Get Categories Query Should return Null when column is undefined', () => {
      const res = getCategoriesQuery();

      expect(res).toBe(null);
      expect(firestore.where).not.toHaveBeenCalled();
      expect(firestore.orderBy).not.toHaveBeenCalled();
      expect(firestore.query).not.toHaveBeenCalled();
    });

    it('Get Categories Query Should return Null when column doesnt have id', () => {
      const res = getCategoriesQuery({});

      expect(res).toBe(null);
      expect(firestore.where).not.toHaveBeenCalled();
      expect(firestore.orderBy).not.toHaveBeenCalled();
      expect(firestore.query).not.toHaveBeenCalled();
    });
  });

  describe('Columns Queries', () => {
    it('Get Column Query', () => {
      const tab = tabs[0];
      getColumnsQuery(tab);

      expect(firestore.where).toHaveBeenCalledWith('tabId', '==', tab.id);
      expect(firestore.orderBy).toHaveBeenCalledWith('createdAt', 'asc');
      expect(firestore.query).toHaveBeenCalledWith(
        withConverterResult,
        whereResults,
        orderByResults,
      );
    });

    it('Get Columns Query Should return Null when tab is undefined', () => {
      const res = getColumnsQuery();

      expect(res).toBe(null);
      expect(firestore.where).not.toHaveBeenCalled();
      expect(firestore.orderBy).not.toHaveBeenCalled();
      expect(firestore.query).not.toHaveBeenCalled();
    });

    it('Get Columns Query Should return Null when tab doesnt have id', () => {
      const res = getColumnsQuery({});

      expect(res).toBe(null);
      expect(firestore.where).not.toHaveBeenCalled();
      expect(firestore.orderBy).not.toHaveBeenCalled();
      expect(firestore.query).not.toHaveBeenCalled();
    });
  });

  describe('Tabs Queries', () => {
    it('Get Tabs Query', () => {
      getTabsQuery(user);

      expect(firestore.where).toHaveBeenCalledWith('ownerId', '==', user.uid);
      expect(firestore.orderBy).toHaveBeenCalledWith('createdAt', 'asc');
      expect(firestore.query).toHaveBeenCalledWith(
        withConverterResult,
        whereResults,
        orderByResults,
      );
    });
  });
});
