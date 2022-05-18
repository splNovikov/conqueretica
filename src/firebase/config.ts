// todo: this is a temporary solution - store it somewhere
const FIREBASE_CONFIG_PROD = {
  apiKey: 'dummy-prod-api-key',
  authDomain: 'conqueretica.firebaseapp.com',
  projectId: 'conqueretica',
  storageBucket: 'conqueretica.appspot.com',
  messagingSenderId: 'dummy-prod-messaging-sender-id',
  appId: 'dummy-prod-app-id',
};

const FIREBASE_CONFIG_DEV = {
  apiKey: 'dummy-dev-api-key',
  authDomain: 'conqueretica-dev.firebaseapp.com',
  projectId: 'conqueretica-dev',
  storageBucket: 'conqueretica-dev.appspot.com',
  messagingSenderId: 'dummy-dev-messaging-sender-id',
  appId: 'dummy-dev-app-id',
};

export const getFirebaseConfig = (env: string) => {
  if (env === 'production') {
    return FIREBASE_CONFIG_PROD;
  }

  return FIREBASE_CONFIG_DEV;
};
