import * as firestore from '@firebase/firestore';
import * as firebaseColumns from './columns';
import { addColumn, deleteColumn } from './columns';
// Interfaces
import { IColumn, ITab } from '../interfaces';
// Test Data
import { tabs, columns } from '../__test_data__';

describe('Firebase Columns Test', () => {
  const columnDoc = { columnDoc: 'test_columnDoc' };
  const collectionRef = { colRef: 'test_collectionRef' };

  beforeEach(() => {
    // @ts-ignore
    jest.spyOn(firestore, 'collection').mockReturnValue(collectionRef);
    // @ts-ignore
    jest.spyOn(firestore, 'doc').mockReturnValue(columnDoc);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Add Column', () => {
    it('Should Add Column', async () => {
      // @ts-ignore
      firestore.setDoc = jest.fn();

      const tab = tabs[0];
      const res = await addColumn(tab);

      expect(firestore.setDoc).toHaveBeenCalledWith(
        columnDoc,
        expect.objectContaining({
          tabId: tab.id,
          categories: [],
        }),
      );
      expect(res?.tabId).toBe(tab.id);
      expect(res?.categories.length).toBe(0);
    });

    it('Should Handle Exception', async () => {
      const err = new Error('Mocked error');
      console.error = jest.fn();
      // @ts-ignore
      firestore.setDoc = jest.fn(() => {
        throw err;
      });

      const tab = tabs[0];
      const res = await addColumn(tab);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when tab not passed', async () => {
      console.error = jest.fn();
      // @ts-ignore
      const res = await addColumn();
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Tab');
    });

    it('Should Return Null when tab passed as empty object', async () => {
      console.error = jest.fn();
      const res = await addColumn({} as ITab);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Tab');
    });
  });

  describe('Delete Columns', () => {
    it('Should delete columns', async () => {
      const originalDelete = firebaseColumns.deleteColumn;
      // @ts-ignore
      firebaseColumns.deleteColumn = jest.fn();

      const data = () => columns[0];
      const toDelete = [{ data }, { data }, { data }];

      // @ts-ignore
      await firebaseColumns.deleteColumns(toDelete);
      expect(firebaseColumns.deleteColumn).toBeCalledTimes(3);

      // @ts-ignore
      firebaseColumns.deleteColumn = originalDelete;
    });
  });

  describe('Delete Column', () => {
    it('Should Delete Column', async () => {
      // @ts-ignore
      firestore.deleteDoc = jest.fn();

      const column = columns[0];
      const res = await deleteColumn(column);

      expect(firestore.deleteDoc).toHaveBeenCalledWith(columnDoc);
      expect(res).toBeNull();
    });

    it('Should Handle Exception', async () => {
      const err = new Error('Mocked error');
      console.error = jest.fn();
      // @ts-ignore
      firestore.deleteDoc = jest.fn(() => {
        throw err;
      });

      const column = columns[0];
      const res = await deleteColumn(column);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when column not passed', async () => {
      console.error = jest.fn();
      // @ts-ignore
      const res = await deleteColumn();
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column');
    });

    it('Should Return Null when column passed as empty object', async () => {
      console.error = jest.fn();
      const res = await deleteColumn({} as IColumn);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column');
    });
  });
});
