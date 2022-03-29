import * as firestore from '@firebase/firestore';
import { UserInfo } from 'firebase/auth';
import * as firebaseColumns from './columns';
import { addTab, deleteTab, updateTab } from './tabs';
// Interfaces
import { ITab } from '../interfaces';
// Test Data
import { tabs, user } from '../__test_data__';

describe('Firebase Tabs Test', () => {
  const tabDoc = { tabDoc: 'test_tabDoc' };
  const collectionRef = { colRef: 'test_collectionRef' };
  const origConsoleError = console.error;

  beforeEach(() => {
    jest.spyOn(firestore, 'collection').mockReturnValue(collectionRef);
    jest.spyOn(firestore, 'doc').mockReturnValue(tabDoc);
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
    console.error = origConsoleError;
  });

  describe('Add Tab', () => {
    const origSetDoc = firestore.setDoc;

    beforeEach(() => {
      firestore.setDoc = jest.fn();
    });

    afterEach(() => {
      firestore.setDoc = origSetDoc;
    });

    it('Should Add Tab', async () => {
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

      firestore.setDoc = jest.fn(() => {
        throw err;
      });

      const tab = { title: 'tab_title' };
      const res = await addTab(tab.title, user);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when title not passed', async () => {
      const res = await addTab();
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Title | User');
    });

    it('Should Return Null when user not passed', async () => {
      const res = await addTab('title');
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Title | User');
    });

    it('Should Return Null when user passed as empty object', async () => {
      const res = await addTab('title', {} as UserInfo);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Title | User');
    });
  });

  describe('Update Tab', () => {
    const origUpdDoc = firestore.updateDoc;

    beforeEach(() => {
      firestore.updateDoc = jest.fn();
    });

    afterEach(() => {
      firestore.updateDoc = origUpdDoc;
    });

    it('Should Update Tab', async () => {
      const title = 'new_title';
      const res = await updateTab(tabs[0], title);

      const newTab = { ...tabs[0], title };

      expect(firestore.updateDoc).toHaveBeenCalledWith(tabDoc, newTab);
      expect(res?.title).toBe(title);
    });

    it('Should Handle Exception', async () => {
      const err = new Error('Mocked error');

      firestore.updateDoc = jest.fn(() => {
        throw err;
      });

      const title = 'new_title';
      const res = await updateTab(tabs[0], title);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when title not passed', async () => {
      const res = await updateTab(tabs[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('Tab Title is absent');
    });

    it('Should Return Null when tab not passed', async () => {
      const res = await updateTab(undefined, 'str');
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Tab');
    });

    it('Should Return Null when tab passed as empty object', async () => {
      const res = await updateTab({}, 'str');
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Tab');
    });
  });

  describe('Delete Tab', () => {
    const origGetColumnsQuery = firebaseColumns.getColumnsQuery;
    const origGetDocs = firestore.getDocs;
    const origDeleteColumns = firebaseColumns.deleteColumns;
    const origDelete = firestore.deleteDoc;

    beforeEach(() => {
      firebaseColumns.getColumnsQuery = jest.fn();
      firestore.getDocs = jest.fn();
      firebaseColumns.deleteColumns = jest.fn();
      firestore.deleteDoc = jest.fn();
    });

    afterEach(() => {
      firebaseColumns.getColumnsQuery = origGetColumnsQuery;
      firestore.getDocs = origGetDocs;
      firebaseColumns.deleteColumns = origDeleteColumns;
      firestore.deleteDoc = origDelete;
    });

    it('Should Delete Tab', async () => {
      const tab = tabs[0];
      const res = await deleteTab(tab);

      expect(firestore.deleteDoc).toHaveBeenCalledWith(tabDoc);
      expect(res).toBe(tab);
    });

    it('Should Handle Exception', async () => {
      const err = new Error('Mocked error');
      firestore.deleteDoc = jest.fn(() => {
        throw err;
      });

      const tab = tabs[0];
      const res = await deleteTab(tab);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when tab not passed', async () => {
      const res = await deleteTab();
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Tab');
    });

    it('Should Return Null when tab passed as empty object', async () => {
      const res = await deleteTab({} as ITab);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Tab');
    });
  });
});
