import * as firestore from '@firebase/firestore';
import { createUser } from './user';
// Utils
import { firestoreMockImplementation as fsMock } from '../testUtils/firestore.test';
// Test Data
import { user } from '../__test_data__';
// Firebase BeforeEach
import './_firebase.beforeEach.test';

describe('Firebase User Test', () => {
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

      const res = await createUser(fsMock.usersRef, user);

      expect(firestore.setDoc).toHaveBeenCalledWith(fsMock.userDoc, userNew);
      expect(res?.uid).toBe(user.uid);
      expect(res?.displayName).toBe(user.displayName);
    });

    it('Should Handle Exception', async () => {
      const err = new Error('Mocked error');

      firestore.setDoc = jest.fn(() => {
        throw err;
      });

      const res = await createUser(fsMock.usersRef, user);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when user not passed', async () => {
      const res = await createUser(fsMock.usersRef);

      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No User');
    });

    it('Should Return Null when user passed as empty object with no uid', async () => {
      const res = await createUser(fsMock.usersRef, {});

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
