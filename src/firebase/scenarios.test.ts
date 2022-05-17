import * as firestore from '@firebase/firestore';
// Firebase
import {
  addCategoryWithColumnScenario,
  deleteCategoryWithColumnScenario,
} from './scenarios';
// Utils
import { firestoreMockImplementation as fsMock } from '../testUtils/firestore.test';
// Test Data
import { categories, columns, tabs } from '../__test_data__';
// Firebase BeforeEach
import './_firebase.beforeEach.test';
import { deleteDoc } from 'firebase/firestore';

describe('Firebase Scenarios', () => {
  describe('Add Category With Column', () => {
    const newCategoryTitle = 'new-category-title';
    const tab = tabs[0];

    it('Should add Category With Column', async () => {
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

  describe('Delete Category With Column', () => {
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
});
