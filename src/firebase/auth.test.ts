import * as auth from '@firebase/auth';
import * as firestore from '@firebase/firestore';
import { signInWithGoogle, signOut } from './auth';
// Firebase
import firebase from './index';
// Test Data
import { user } from '../__test_data__';
// Firebase BeforeEach
import './_firebase.beforeEach.test';

describe('Firebase Auth Test', () => {
  beforeEach(() => {
    jest
      .spyOn(auth, 'signInWithPopup')
      .mockReturnValue(new Promise((resolve) => resolve({ user })));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should Return User when user exist', async () => {
    jest.spyOn(firestore, 'getDoc').mockReturnValue({ exists: () => true });

    const res = await signInWithGoogle();
    expect(res).toEqual(user);
  });

  it('Should Return User when user not exist', async () => {
    jest.spyOn(firestore, 'getDoc').mockReturnValue({ exists: () => false });

    firebase.createUser = jest.fn();

    await signInWithGoogle();
    expect(firebase.createUser).toHaveBeenCalledWith(user);
  });

  it('Should Logout User', async () => {
    firebase.auth.signOut = jest.fn();

    await signOut();
    expect(firebase.auth.signOut).toHaveBeenCalled();
  });
});
