import * as firestore from '@firebase/firestore';
import {
  categoriesConverter,
  columnsConverter,
  getCategoriesQuery,
  getColumnsQuery,
  getTabsQuery,
  tabsConverter,
} from './queryBuilders';
// Test Data
import { categories, columns, tabs, user } from '../__test_data__';

describe('Query Builders', () => {
  const whereResults = 'where_res';
  const orderByResults = 'orderBy_res';
  const origQuery = firestore.query;
  const origWhere = firestore.where;
  const origOrderBy = firestore.orderBy;

  beforeEach(() => {
    firestore.query = jest.fn();
    firestore.where = jest.fn();
    firestore.orderBy = jest.fn();
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
    beforeEach(() => {
      jest
        .spyOn(firestore, 'collection')
        .mockReturnValue({ withConverter: () => categoriesConverter });
    });

    it('Get Categories Query', () => {
      const column = columns[0];
      getCategoriesQuery(column);

      expect(firestore.where).toHaveBeenCalledWith('columnId', '==', column.id);
      expect(firestore.orderBy).toHaveBeenCalledWith('createdAt', 'asc');
      expect(firestore.query).toHaveBeenCalledWith(
        categoriesConverter,
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

    it('Categories Converter Dummy Test', () => {
      const category = categories[0];
      const res = categoriesConverter.toFirestore(category);
      const res2 = categoriesConverter.fromFirestore({ data: () => category });

      expect(res).toBe(category);
      expect(res2).toBe(category);
    });
  });

  describe('Columns Queries', () => {
    beforeEach(() => {
      jest
        .spyOn(firestore, 'collection')
        .mockReturnValue({ withConverter: () => columnsConverter });
    });

    it('Get Column Query', () => {
      const tab = tabs[0];
      getColumnsQuery(tab);

      expect(firestore.where).toHaveBeenCalledWith('tabId', '==', tab.id);
      expect(firestore.orderBy).toHaveBeenCalledWith('createdAt', 'asc');
      expect(firestore.query).toHaveBeenCalledWith(
        columnsConverter,
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

    it('Columns Converter Dummy Test', () => {
      const column = columns[0];
      const res = columnsConverter.toFirestore(column);
      const res2 = columnsConverter.fromFirestore({ data: () => column });

      expect(res).toBe(column);
      expect(res2).toBe(column);
    });
  });

  describe('Tabs Queries', () => {
    beforeEach(() => {
      jest
        .spyOn(firestore, 'collection')
        .mockReturnValue({ withConverter: () => tabsConverter });
    });

    it('Get Tabs Query', () => {
      getTabsQuery(user);

      expect(firestore.where).toHaveBeenCalledWith('ownerId', '==', user.uid);
      expect(firestore.orderBy).toHaveBeenCalledWith('createdAt', 'asc');
      expect(firestore.query).toHaveBeenCalledWith(
        tabsConverter,
        whereResults,
        orderByResults,
      );
    });

    it('Tabs Converter Dummy Test', () => {
      const tab = tabs[0];
      const res = tabsConverter.toFirestore(tab);
      const res2 = tabsConverter.fromFirestore({ data: () => tab });

      expect(res).toBe(tab);
      expect(res2).toBe(tab);
    });
  });
});
