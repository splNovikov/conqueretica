import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { getFirebaseConfig } from './config';
import { signInWithGoogle, signOut } from './auth';
import { createUser } from './user';
import { addTab, updateTab } from './tabs';
import { addCategory, updateCategory, deleteCategory } from './categories';
import { addLink, updateLink, updateLinkLastUsed, deleteLink } from './links';
import {
  addCategoryWithColumnScenario,
  deleteColumnScenario,
  deleteTabScenario,
} from './scenarios';
import {
  getCategoriesQuery,
  getColumnsQuery,
  getTabsQuery,
} from './queryBuilders';

const config = getFirebaseConfig(process.env.NODE_ENV);
const app = initializeApp(config);
const auth = getAuth(app);
const firestoreDB = getFirestore(app);

export default {
  // auth
  signInWithGoogle,
  signOut,
  // user
  createUser,
  // tabs
  addTab,
  updateTab,
  // categories
  addCategory,
  updateCategory,
  deleteCategory,
  // links
  addLink,
  updateLink,
  updateLinkLastUsed,
  deleteLink,
  // scenarios
  addCategoryWithColumnScenario,
  deleteColumnScenario,
  deleteTabScenario,
  // queryBuilders
  getTabsQuery,
  getColumnsQuery,
  getCategoriesQuery,

  auth,
  firestoreDB,
};
