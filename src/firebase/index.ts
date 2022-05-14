import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { getFirebaseConfig } from './config';
import { signInWithGoogle, signOut } from './auth';
import { createUser } from './user';
import { addTab, updateTab, deleteTab } from './tabs';
import { addColumn, deleteColumn, deleteColumns } from './columns';
import { addCategory, deleteCategory, deleteCategories } from './categories';
import { addLink, updateLink, deleteLink } from './links';
import {
  addCategoryWithColumnScenario,
  deleteCategoryWithColumnScenario,
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
