import * as firestore from '@firebase/firestore';
import { UserInfo } from 'firebase/auth';
import { addTab, deleteTab, updateTab } from './tabs';
// Interfaces
import { ITab } from '../interfaces';
// Utils
import { firestoreMockImplementation as fsMock } from '../testUtils/firestore.test';
// Test Data
import { tabs, user } from '../__test_data__';
// Firebase BeforeEach
import './_firebase.beforeEach.test';

describe('Firebase Tabs Test', () => {
  describe('Add Tab', () => {
    it('Should Add Tab', async () => {
      firestore.setDoc = jest.fn();

      const tab = { title: 'tab_title' };
      const res = await addTab(tab.title, user);

      expect(firestore.setDoc).toHaveBeenCalledWith(
        fsMock.tabDoc,
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
    it('Should Update Tab', async () => {
      firestore.updateDoc = jest.fn();

      const title = 'new_title';
      const res = await updateTab(tabs[0], title);

      const newTab = { ...tabs[0], title };

      expect(firestore.updateDoc).toHaveBeenCalledWith(fsMock.tabDoc, newTab);
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
    it('Should Delete Tab', async () => {
      firestore.deleteDoc = jest.fn();

      const tab = tabs[0];
      const res = await deleteTab(tab);

      // 3 (cat)*2(col) categories, 2 columns, 1 tab
      expect(firestore.deleteDoc).toHaveBeenCalledTimes(3 * 2 + 2 + 1);
      expect(firestore.deleteDoc).toHaveBeenCalledWith(fsMock.tabDoc);
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
