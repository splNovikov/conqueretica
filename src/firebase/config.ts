// todo: this is a temporary solution - store it somewhere
const FIREBASE_CONFIG_PROD = {
  apiKey: '',
  authDomain: 'conqueretica.firebaseapp.com',
  projectId: 'conqueretica',
  storageBucket: 'conqueretica.appspot.com',
  messagingSenderId: '',
  appId: '',
};

const FIREBASE_CONFIG_DEV = {
  apiKey: '',
  authDomain: 'conqueretica-dev.firebaseapp.com',
  projectId: 'conqueretica-dev',
  storageBucket: 'conqueretica-dev.appspot.com',
  messagingSenderId: '',
  appId: '',
};

export const getFirebaseConfig = (env: string) => {
  if (env === 'production') {
    return FIREBASE_CONFIG_PROD;
  }

  return FIREBASE_CONFIG_DEV;
};
