import * as firestore from '@firebase/firestore';
// Firebase
import {
  addCategoryWithColumnScenario,
  deleteCategoryWithColumnScenario,
  deleteColumnScenario,
} from './scenarios';
import * as queryBuilders from './queryBuilders';
// Utils
import { firestoreMockImplementation as fsMock } from '../testUtils/firestore.test';
// Interfaces
import './_firebase.beforeEach.test';
// Test Data
import { categories, columns, tabs } from '../__test_data__';
// Firebase BeforeEach

import { IColumn } from '../interfaces';

describe('Firebase Scenarios', () => {
  describe('Add Category With Column', () => {
    const newCategoryTitle = 'new-category-title';
    const tab = tabs[0];

    it('Should add Category With Column Scenario', async () => {
      firestore.setDoc = jest.fn();

      const res = await addCategoryWithColumnScenario(newCategoryTitle, tab);

      // add column
      expect(firestore.setDoc).toHaveBeenCalledWith(
        fsMock.columnDoc,
        expect.objectContaining({
          tabId: tab.id,
        }),
      );
      // add category
      expect(firestore.setDoc).toHaveBeenCalledWith(
        fsMock.categoryDoc,
        expect.objectContaining({
          title: newCategoryTitle,
        }),
      );

      expect(res?.title).toBe(newCategoryTitle);
      expect(res?.links.length).toBe(0);
      expect(firestore.setDoc).toHaveBeenCalledTimes(2);
    });

    it("Should return null if column didn't added", async () => {
      firestore.setDoc = jest.fn((ref) => {
        if (ref === fsMock.columnDoc) {
          throw new Error();
        }
      });

      const res = await addCategoryWithColumnScenario(newCategoryTitle, tab);

      // add column
      expect(firestore.setDoc).toHaveBeenCalledWith(
        fsMock.columnDoc,
        expect.objectContaining({
          tabId: tab.id,
        }),
      );
      // add category
      expect(firestore.setDoc).not.toHaveBeenCalledWith(
        fsMock.categoryDoc,
        expect.objectContaining({
          title: newCategoryTitle,
        }),
      );

      expect(res).toBe(null);
      expect(firestore.setDoc).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete Category With Column Scenario', () => {
    const category = categories[0];
    const column = columns[0];

    it('Should delete category with column', async () => {
      firestore.deleteDoc = jest.fn();

      const res = await deleteCategoryWithColumnScenario(category, column);

      expect(res).toBe(category);
      expect(firestore.deleteDoc).toHaveBeenCalledWith(fsMock.categoryDoc);
      expect(firestore.deleteDoc).toHaveBeenCalledWith(fsMock.columnDoc);
      // 1 category, 1 column with 3 categories
      expect(firestore.deleteDoc).toHaveBeenCalledTimes(1 + 1 + 3);
    });
  });

  describe('Delete Column Scenario', () => {
    it('Should Delete Column', async () => {
      firestore.deleteDoc = jest.fn();

      const column = columns[0];
      const res = await deleteColumnScenario(column);

      expect(firestore.deleteDoc).toHaveBeenCalledWith(fsMock.columnDoc);
      expect(res).toBe(column);
    });

    it('Should return null when Categories Query can not be formulated', async () => {
      firestore.deleteDoc = jest.fn();
      queryBuilders.getCategoriesQuery = jest.fn(() => false);

      const column = columns[0];
      const res = await deleteColumnScenario(column);

      expect(console.error).toHaveBeenCalledWith(
        'Categories Query can not be formulated',
      );
      expect(firestore.deleteDoc).toHaveBeenCalledTimes(0);
      expect(res).toBe(null);
    });

    it('Should Handle Exception', async () => {
      const err = new Error('Mocked error');
      firestore.deleteDoc = jest.fn(() => {
        throw err;
      });

      const column = columns[0];
      const res = await deleteColumnScenario(column);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when column not passed', async () => {
      const res = await deleteColumnScenario();
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column');
    });

    it('Should Return Null when column passed as empty object', async () => {
      const res = await deleteColumnScenario({} as IColumn);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column');
    });
  });
});
