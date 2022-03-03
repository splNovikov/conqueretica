import * as firestore from '@firebase/firestore';
import { createUser } from './user';
// Test Data
import { user } from '../__test_data__';

describe('Firebase User Test', () => {
  const userDoc = { userDoc: 'test_userDoc' };
  const origConsoleError = console.error;

  beforeEach(() => {
    jest.spyOn(firestore, 'doc').mockReturnValue(userDoc);
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
    console.error = origConsoleError;
  });

  describe('Create User', () => {
    const origSetDoc = firestore.setDoc;

    beforeEach(() => {
      firestore.setDoc = jest.fn();
    });

    afterEach(() => {
      firestore.setDoc = origSetDoc;
    });

    it('Should Create User', async () => {
      const userNew = {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      };

      const userRef = {};
      const res = await createUser(userRef, user);

      expect(firestore.setDoc).toHaveBeenCalledWith(userDoc, userNew);
      expect(res?.uid).toBe(user.uid);
      expect(res?.displayName).toBe(user.displayName);
    });

    it('Should Handle Exception', async () => {
      const err = new Error('Mocked error');

      firestore.setDoc = jest.fn(() => {
        throw err;
      });

      const userRef = {};
      const res = await createUser(userRef, user);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when user not passed', async () => {
      const userRef = {};
      const res = await createUser(userRef);

      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No User');
    });

    it('Should Return Null when user passed as empty object with no uid', async () => {
      const userRef = {};
      const res = await createUser(userRef, {});

      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No User');
    });

    it('Should Return Null when usersRef not passed', async () => {
      const res = await createUser(undefined, user);

      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No User');
    });
  });
});
