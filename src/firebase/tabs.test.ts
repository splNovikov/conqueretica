import * as firestore from '@firebase/firestore';
import { UserInfo } from 'firebase/auth';
import { addTab, deleteTabScenario, updateTab } from './tabs';
import * as queryBuilders from './queryBuilders';
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
});
