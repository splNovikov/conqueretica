const FIREBASE_CONFIG_PROD = {
  apiKey: process.env.REACT_APP_FIREBASE_PROD_API_KEY,
  authDomain: 'conqueretica.firebaseapp.com',
  projectId: 'conqueretica',
  storageBucket: 'conqueretica.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_PROD_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_PROD_APP_ID,
};

const FIREBASE_CONFIG_DEV = {
  apiKey: process.env.REACT_APP_FIREBASE_DEV_API_KEY,
  authDomain: 'conqueretica-dev.firebaseapp.com',
  projectId: 'conqueretica-dev',
  storageBucket: 'conqueretica-dev.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_DEV_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_DEV_APP_ID,
};

export const getFirebaseConfig = (env: string) => {
  if (env === 'production') {
    return FIREBASE_CONFIG_PROD;
  }

  return FIREBASE_CONFIG_DEV;
};
