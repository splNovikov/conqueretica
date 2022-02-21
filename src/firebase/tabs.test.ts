import * as firestore from '@firebase/firestore';
import { UserInfo } from 'firebase/auth';
import { addTab } from './tabs';
// Interfaces
// Test Data
import { user } from '../__test_data__';

describe('Firebase Columns Test', () => {
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
});
