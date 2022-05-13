import * as firestore from '@firebase/firestore';
import { UserInfo } from 'firebase/auth';
import { addTab, deleteTab, updateTab } from './tabs';
import * as queryBuilders from './queryBuilders';
// Interfaces
import { ITab } from '../interfaces';
// Test Data
import { categories, columns, tabs, user } from '../__test_data__';

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
    const origGetColumnsQuery = queryBuilders.getColumnsQuery;
    const origGetCategoriesQuery = queryBuilders.getCategoriesQuery;
    const origGetDocs = firestore.getDocs;
    const origDelete = firestore.deleteDoc;
    const dataCol = () => columns[0];
    const columnsDocs = {
      docs: [{ data: dataCol }, { data: dataCol }, { data: dataCol }],
    };
    const dataCat = () => categories[0];
    const categoriesDocs = {
      docs: [{ data: dataCat }, { data: dataCat }, { data: dataCat }],
    };

    beforeEach(() => {
      queryBuilders.getColumnsQuery = jest.fn(() => ({
        query: 'columns_q',
      }));
      queryBuilders.getCategoriesQuery = jest.fn(() => ({
        query: 'categories_q',
      }));
      firestore.getDocs = jest.fn(({ query }) => {
        if (query === 'columns_q') {
          return columnsDocs;
        }
        if (query === 'categories_q') {
          return categoriesDocs;
        }
      });
      firestore.deleteDoc = jest.fn();
    });

    afterEach(() => {
      queryBuilders.getColumnsQuery = origGetColumnsQuery;
      queryBuilders.getCategoriesQuery = origGetCategoriesQuery;
      firestore.getDocs = origGetDocs;
      firestore.deleteDoc = origDelete;
    });

    it('Should Delete Tab', async () => {
      const tab = tabs[0];
      const res = await deleteTab(tab);

      // 9 categories, 3 columns, 1 tab
      expect(firestore.deleteDoc).toHaveBeenCalledTimes(9 + 3 + 1);
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
