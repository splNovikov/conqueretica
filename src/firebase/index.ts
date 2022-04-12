import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { FIREBASE_CONFIG } from './config';
import { signInWithGoogle, signOut } from './auth';
import { createUser } from './user';
import { getTabsQuery, addTab, updateTab, deleteTab } from './tabs';
import {
  getColumnsQuery,
  addColumn,
  deleteColumn,
  deleteColumns,
} from './columns';
import { addCategory, deleteCategory } from './categories';
import { addLink, updateLink } from './links';

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const firestoreDB = getFirestore(app);

export default {
  signInWithGoogle,
  signOut,
  createUser,

  getTabsQuery,
  addTab,
  updateTab,
  deleteTab,

  getColumnsQuery,
  addColumn,
  deleteColumn,
  deleteColumns,

  addCategory,
  deleteCategory,

  addLink,
  updateLink,

  auth,
  firestoreDB,
};
