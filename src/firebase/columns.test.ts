import * as firestore from '@firebase/firestore';
// Firebase
import * as firebaseColumns from './columns';
import { addColumn, deleteColumn } from './columns';
import * as queryBuilders from './queryBuilders';
// Interfaces
import { IColumn, ITab } from '../interfaces';
// Test Data
import { tabs, columns, categories } from '../__test_data__';

describe('Firebase Columns Test', () => {
  const columnDoc = { columnDoc: 'test_columnDoc' };
  const collectionRef = { colRef: 'test_collectionRef' };
  const origConsoleError = console.error;

  beforeEach(() => {
    jest.spyOn(firestore, 'collection').mockReturnValue(collectionRef);
    jest.spyOn(firestore, 'doc').mockReturnValue(columnDoc);
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
    console.error = origConsoleError;
  });

  describe('Add Column', () => {
    const origSetDoc = firestore.setDoc;

    beforeEach(() => {
      firestore.setDoc = jest.fn();
    });

    afterEach(() => {
      firestore.setDoc = origSetDoc;
    });

    it('Should Add Column', async () => {
      const tab = tabs[0];
      const res = await addColumn(tab);

      expect(firestore.setDoc).toHaveBeenCalledWith(
        columnDoc,
        expect.objectContaining({
          tabId: tab.id,
        }),
      );
      expect(res?.tabId).toBe(tab.id);
    });

    it('Should Handle Exception', async () => {
      const err = new Error('Mocked error');

      firestore.setDoc = jest.fn(() => {
        throw err;
      });

      const tab = tabs[0];
      const res = await addColumn(tab);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when tab not passed', async () => {
      const res = await addColumn();
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Tab');
    });

    it('Should Return Null when tab passed as empty object', async () => {
      const res = await addColumn({} as ITab);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Tab');
    });
  });

  // todo:
  xdescribe('Delete Columns', () => {
    const originalDelete = firebaseColumns.deleteColumn;

    beforeEach(() => {
      firebaseColumns.deleteColumn = jest.fn();
    });

    afterEach(() => {
      firebaseColumns.deleteColumn = originalDelete;
    });

    it('Should delete columns', async () => {
      const data = () => columns[0];
      const toDelete = [{ data }, { data }, { data }];

      await firebaseColumns.deleteColumns(toDelete);
      expect(firebaseColumns.deleteColumn).toBeCalledTimes(3);
    });
  });

  describe('Delete Column', () => {
    const origGetCategoriesQuery = queryBuilders.getCategoriesQuery;
    const origGetDocs = firestore.getDocs;
    const origDelete = firestore.deleteDoc;
    const data = () => categories[0];
    const categoriesDocs = [{ data }, { data }, { data }];

    beforeEach(() => {
      queryBuilders.getCategoriesQuery = jest.fn();
      firestore.getDocs = jest.fn(() => categoriesDocs);
      firestore.deleteDoc = jest.fn();
    });

    afterEach(() => {
      queryBuilders.getCategoriesQuery = origGetCategoriesQuery;
      firestore.getDocs = origGetDocs;
      firestore.deleteDoc = origDelete;
    });

    it('Should Delete Column', async () => {
      const column = columns[0];
      const res = await deleteColumn(column);

      expect(firestore.deleteDoc).toHaveBeenCalledWith(columnDoc);
      expect(res).toBe(column);
    });

    it('Should Handle Exception', async () => {
      const err = new Error('Mocked error');
      firestore.deleteDoc = jest.fn(() => {
        throw err;
      });

      const column = columns[0];
      const res = await deleteColumn(column);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when column not passed', async () => {
      const res = await deleteColumn();
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column');
    });

    it('Should Return Null when column passed as empty object', async () => {
      const res = await deleteColumn({} as IColumn);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column');
    });
  });
});
