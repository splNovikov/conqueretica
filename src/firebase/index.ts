import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { FIREBASE_CONFIG } from './config';
import { signInWithGoogle, signOut } from './auth';
import { createUser } from './user';
import { getTabsQuery, addTab } from './tabs';
import { getColumnsQuery, addColumn, deleteColumn } from './columns';
import { addCategory, deleteCategory } from './categories';

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const firestoreDB = getFirestore(app);

export default {
  signInWithGoogle,
  signOut,
  createUser,

  getTabsQuery,
  addTab,

  getColumnsQuery,
  addColumn,
  deleteColumn,

  addCategory,
  deleteCategory,

  auth,
  firestoreDB,
};
