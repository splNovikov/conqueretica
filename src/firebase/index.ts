import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { FIREBASE_CONFIG_DEV, FIREBASE_CONFIG_PROD } from './config';
import { signInWithGoogle, signOut } from './auth';
import { createUser } from './user';
import { getTabsQuery, addTab, updateTab, deleteTab } from './tabs';
import {
  getColumnsQuery,
  addColumn,
  deleteColumn,
  deleteColumns,
} from './columns';
import {
  getCategoriesQuery,
  addCategory,
  deleteCategory,
  deleteCategories,
} from './categories';
import { addLink, updateLink, deleteLink } from './links';
import {
  addCategoryWithColumnScenario,
  deleteCategoryWithColumnScenario,
} from './scenarios';

const isProd = process.env.NODE_ENV === 'production';
const app = initializeApp(isProd ? FIREBASE_CONFIG_PROD : FIREBASE_CONFIG_DEV);
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
  // categories
  getCategoriesQuery,
  addCategory,
  deleteCategory,
  deleteCategories,

  addLink,
  updateLink,
  deleteLink,

  // scenarios
  addCategoryWithColumnScenario,
  deleteCategoryWithColumnScenario,

  auth,
  firestoreDB,
};
