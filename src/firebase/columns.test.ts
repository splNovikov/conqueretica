import * as firestore from '@firebase/firestore';
import * as queryBuilders from './queryBuilders';
// Firebase
import { addColumn, deleteColumns } from './columns';
// Interfaces
import { IColumn, ITab } from '../interfaces';
// Utils
import { firestoreMockImplementation as fsMock } from '../testUtils/firestore.test';
// Test Data
import { tabs, columns } from '../__test_data__';
// Firebase BeforeEach
import './_firebase.beforeEach.test';

describe('Firebase Columns Test', () => {
  describe('Add Column', () => {
    it('Should Add Column', async () => {
      firestore.setDoc = jest.fn();

      const tab = tabs[0];
      const res = await addColumn(tab);

      expect(firestore.setDoc).toHaveBeenCalledWith(
        fsMock.columnDoc,
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

  describe('Delete ColumnS', () => {
    firestore.deleteDoc = jest.fn();

    it('Should Delete ColumnS', async () => {
      await deleteColumns(fsMock.columnsDocs);

      expect(firestore.deleteDoc).toHaveBeenCalledTimes(8);
    });

    it('Should Delete Only Valid ColumnS', async () => {
      const invalidDocs = {
        ...fsMock.columnsDocs,
        docs: [...fsMock.columnsDocs.docs, columns[0], undefined],
      };
      await deleteColumns(invalidDocs);

      expect(firestore.deleteDoc).toHaveBeenCalledTimes(8);
    });
  });
});
