import { getFirebaseConfig } from './config';

describe('Firebase config', () => {
  it('Should return Production config', () => {
    const res = getFirebaseConfig('production');

    expect(res.authDomain).toBe('conqueretica.firebaseapp.com');
    expect(res.projectId).toBe('conqueretica');
    expect(res.storageBucket).toBe('conqueretica.appspot.com');
  });

  it('Should return Dev config', () => {
    const res = getFirebaseConfig('');

    expect(res.authDomain).toBe('conqueretica-dev.firebaseapp.com');
    expect(res.projectId).toBe('conqueretica-dev');
    expect(res.storageBucket).toBe('conqueretica-dev.appspot.com');
  });
});
