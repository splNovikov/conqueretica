import * as auth from '@firebase/auth';
import * as firestore from '@firebase/firestore';
import { signInWithGoogle, signOut } from './auth';
import firebase from './index';
// Test Data
import { user } from '../__test_data__';

describe('Auth Test', () => {
  const collectionRef = { colRef: 'test' };

  beforeEach(() => {
    jest
      .spyOn(auth, 'signInWithPopup')
      // @ts-ignore
      .mockReturnValue(new Promise((resolve) => resolve({ user })));
    // @ts-ignore
    jest.spyOn(firestore, 'doc').mockReturnValue({});
    // @ts-ignore
    jest.spyOn(firestore, 'collection').mockReturnValue(collectionRef);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should Return User when user exist', async () => {
    // @ts-ignore
    jest.spyOn(firestore, 'getDoc').mockReturnValue({ exists: () => true });

    const res = await signInWithGoogle();
    expect(res).toEqual(user);
  });

  it('Should Return User when user not exist', async () => {
    // @ts-ignore
    jest.spyOn(firestore, 'getDoc').mockReturnValue({ exists: () => false });

    firebase.createUser = jest.fn();

    await signInWithGoogle();
    expect(firebase.createUser).toHaveBeenCalledWith(collectionRef, user);
  });

  it('Should Logout User', async () => {
    firebase.auth.signOut = jest.fn();

    await signOut();
    expect(firebase.auth.signOut).toHaveBeenCalled();
  });
});
