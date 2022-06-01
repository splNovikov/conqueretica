import * as firestore from '@firebase/firestore';
// Firebase
import {
  addCategoryWithColumnScenario,
  deleteCategoriesScenario,
  deleteColumnScenario,
  deleteColumnsScenario,
  deleteTabScenario,
} from './scenarios';
import * as queryBuilders from './queryBuilders';
// Utils
import { firestoreMockImplementation as fsMock } from '../testUtils/firestore.test';
// Interfaces
import { IColumn, ITab } from '../interfaces';
// Test Data
import { categories, columns, tabs } from '../__test_data__';
// Firebase BeforeEach
import './_firebase.beforeEach.test';

describe('Firebase Scenarios', () => {
  firestore.setDoc = jest.fn();
  firestore.deleteDoc = jest.fn();

  describe('Add Category With Column Scenario', () => {
    const newCategoryTitle = 'new-category-title';
    const tab = tabs[0];

    it('Should add Category With Column Scenario', async () => {
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

    it('Should return null and delete column if category has not been created', async () => {
      firestore.setDoc = jest.fn((ref) => {
        if (ref === fsMock.categoryDoc) {
          throw new Error();
        }
      });
      firestore.deleteDoc = jest.fn();

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

      expect(res).toBe(null);
      expect(firestore.setDoc).toHaveBeenCalledTimes(2);
      expect(firestore.deleteDoc).toHaveBeenCalledTimes(1);
      expect(firestore.deleteDoc).toHaveBeenCalledWith(fsMock.columnDoc);
    });
  });

  describe('Delete CategorIES Scenario', () => {
    it('Should Delete Categories', async () => {
      await deleteCategoriesScenario(fsMock.categoriesDocs);

      expect(firestore.deleteDoc).toHaveBeenCalledTimes(3);
    });

    it('Should Delete Only Valid Categories', async () => {
      const invalidDocs = {
        ...fsMock.categoriesDocs,
        docs: [...fsMock.categoriesDocs.docs, categories[0], undefined],
      };
      await deleteCategoriesScenario(invalidDocs);

      expect(firestore.deleteDoc).toHaveBeenCalledTimes(3);
    });
  });

  describe('Delete Column Scenario', () => {
    it('Should Delete Column', async () => {
      const column = columns[0];
      const res = await deleteColumnScenario(column);

      expect(firestore.deleteDoc).toHaveBeenCalledWith(fsMock.columnDoc);
      // 3 categories + 1 column
      expect(firestore.deleteDoc).toHaveBeenCalledTimes(3 + 1);
      expect(res).toBe(column);
    });

    it('Should return null when Categories Query can not be formulated', async () => {
      queryBuilders.getCategoriesQuery = jest.fn(() => false);

      const column = columns[0];
      const res = await deleteColumnScenario(column);

      expect(console.error).toHaveBeenCalledWith(
        'Categories Query can not be formulated',
      );
      expect(firestore.deleteDoc).not.toHaveBeenCalled();
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
      expect(firestore.deleteDoc).not.toHaveBeenCalled();
    });

    it('Should Return Null when column passed as empty object', async () => {
      const res = await deleteColumnScenario({} as IColumn);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column');
      expect(firestore.deleteDoc).not.toHaveBeenCalled();
    });
  });

  describe('Delete ColumnS Scenario', () => {
    it('Should Delete ColumnS', async () => {
      await deleteColumnsScenario(fsMock.columnsDocs);

      expect(firestore.deleteDoc).toHaveBeenCalledTimes(8);
    });

    it('Should Delete Only Valid ColumnS', async () => {
      const invalidDocs = {
        ...fsMock.columnsDocs,
        docs: [...fsMock.columnsDocs.docs, columns[0], undefined],
      };
      await deleteColumnsScenario(invalidDocs);

      expect(firestore.deleteDoc).toHaveBeenCalledTimes(8);
    });
  });

  describe('Delete Tab Scenario', () => {
    it('Should Delete Tab', async () => {
      const tab = tabs[0];
      const res = await deleteTabScenario(tab);

      // 3 (cat)*2(col) categories, 2 columns, 1 tab
      expect(firestore.deleteDoc).toHaveBeenCalledTimes(3 * 2 + 2 + 1);
      expect(firestore.deleteDoc).toHaveBeenCalledWith(fsMock.tabDoc);
      expect(res).toBe(tab);
    });

    it('Should return null when columns query can not be formulated', async () => {
      queryBuilders.getColumnsQuery = jest.fn(() => false);

      const tab = tabs[0];
      const res = await deleteTabScenario(tab);

      expect(firestore.deleteDoc).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith(
        'Columns Query can not be formulated',
      );
      expect(res).toBe(null);
    });

    it('Should Handle Exception', async () => {
      const err = new Error('Mocked error');
      firestore.deleteDoc = jest.fn(() => {
        throw err;
      });

      const tab = tabs[0];
      const res = await deleteTabScenario(tab);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when tab not passed', async () => {
      const res = await deleteTabScenario();
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Tab');
      expect(firestore.deleteDoc).not.toHaveBeenCalled();
    });

    it('Should Return Null when tab passed as empty object', async () => {
      const res = await deleteTabScenario({} as ITab);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Tab');
      expect(firestore.deleteDoc).not.toHaveBeenCalled();
    });
  });
});
