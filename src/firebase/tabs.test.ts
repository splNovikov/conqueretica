// @ts-nocheck
import * as firestore from '@firebase/firestore';
import { UserInfo } from 'firebase/auth';
import * as firebaseColumns from './columns';
import { addTab, deleteTab } from './tabs';
// Interfaces
// Test Data
import { tabs, user } from '../__test_data__';

describe('Firebase Tabs Test', () => {
  const tabDoc = { tabDoc: 'test_tabDoc' };
  const collectionRef = { colRef: 'test_collectionRef' };
  const origConsoleError = console.error;

  beforeEach(() => {
    // @ts-ignore
    jest.spyOn(firestore, 'collection').mockReturnValue(collectionRef);
    // @ts-ignore
    jest.spyOn(firestore, 'doc').mockReturnValue(tabDoc);
  });

  afterEach(() => {
    jest.resetAllMocks();
    console.error = origConsoleError;
  });

  describe('Add Tab', () => {
    const origSetDoc = firestore.setDoc;

    afterEach(() => {
      // @ts-ignore
      firestore.setDoc = origSetDoc;
    });

    it('Should Add Tab', async () => {
      // @ts-ignore
      firestore.setDoc = jest.fn();

      const tab = { title: 'tab_title' };
      const res = await addTab(tab.title, user);

      expect(firestore.setDoc).toHaveBeenCalledWith(
        tabDoc,
        expect.objectContaining({
          title: tab.title,
          ownerId: user.uid,
        }),
      );
      expect(res?.title).toBe(tab.title);
      expect(res?.ownerId).toBe(user.uid);
    });

    it('Should Handle Exception', async () => {
      const err = new Error('Mocked error');
      console.error = jest.fn();
      // @ts-ignore
      firestore.setDoc = jest.fn(() => {
        throw err;
      });

      const tab = { title: 'tab_title' };
      const res = await addTab(tab.title, user);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when title not passed', async () => {
      console.error = jest.fn();
      // @ts-ignore
      const res = await addTab();
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Title | User');
    });

    it('Should Return Null when user not passed', async () => {
      console.error = jest.fn();
      // @ts-ignore
      const res = await addTab('title');
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Title | User');
    });

    it('Should Return Null when user passed as empty object', async () => {
      console.error = jest.fn();
      const res = await addTab('title', {} as UserInfo);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Title | User');
    });
  });

  describe('Delete Tab', () => {
    const origGetColumnsQuery = firebaseColumns.getColumnsQuery;
    const origGetDocs = firestore.getDocs;
    const origDeleteColumns = firebaseColumns.deleteColumns;
    const origDelete = firestore.deleteDoc;

    afterEach(() => {
      firebaseColumns.getColumnsQuery = origGetColumnsQuery;
      firestore.getDocs = origGetDocs;
      firebaseColumns.deleteColumns = origDeleteColumns;
      firestore.deleteDoc = origDelete;
    });

    it('Should Delete Tab', async () => {
      firebaseColumns.getColumnsQuery = jest.fn();
      firestore.getDocs = jest.fn();
      firebaseColumns.deleteColumns = jest.fn();
      firestore.deleteDoc = jest.fn();

      const tab = tabs[0];
      const res = await deleteTab(tab);

      expect(firestore.deleteDoc).toHaveBeenCalledWith(tabDoc);
      // todo: fix for every delete - it should not return Null!!!
      expect(res).toBe(tab);
    });
  });
});
