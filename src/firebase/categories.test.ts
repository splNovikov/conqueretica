import * as firestore from '@firebase/firestore';
import { addCategory, deleteCategory } from './categories';
// Interfaces
import { ICategory, IColumn } from '../interfaces';
// Test Data
import { categories, columns } from '../__test_data__';

describe('Firebase Categories Test', () => {
  const categoryDoc = { categoryDoc: 'test_categoryDoc' };
  const collectionRef = { colRef: 'test_collectionRef' };
  const origConsoleError = console.error;

  beforeEach(() => {
    jest.spyOn(firestore, 'doc').mockReturnValue(categoryDoc);
    jest.spyOn(firestore, 'collection').mockReturnValue(collectionRef);
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
    console.error = origConsoleError;
  });

  describe('Add Category', () => {
    const origSetDoc = firestore.setDoc;

    beforeEach(() => {
      firestore.setDoc = jest.fn();
    });

    afterEach(() => {
      firestore.setDoc = origSetDoc;
    });

    it('Should Add Category', async () => {
      const categoryTitle = 'category_title';
      const res = await addCategory(categoryTitle, columns[0]);

      expect(firestore.setDoc).toHaveBeenCalledWith(
        categoryDoc,
        expect.objectContaining({
          title: categoryTitle,
          columnId: columns[0].id,
          links: [],
        }),
      );
      expect(res?.title).toBe(categoryTitle);
    });

    it('Should Handle Exception', async () => {
      const err = new Error('Mocked error');

      firestore.setDoc = jest.fn(() => {
        throw err;
      });

      const res = await addCategory('title', columns[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when column not passed', async () => {
      const res = await addCategory('title');
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column');
    });

    it('Should Return Null when column passed as empty object', async () => {
      const res = await addCategory('title', {} as IColumn);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column');
    });

    it('Should Return Null when title is empty', async () => {
      const res = await addCategory(undefined, { id: '123' });
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Title');
    });
  });

  describe('Delete Category', () => {
    const origDelete = firestore.deleteDoc;

    beforeEach(() => {
      firestore.deleteDoc = jest.fn();
    });

    afterEach(() => {
      firestore.deleteDoc = origDelete;
    });

    it('Should Delete Category', async () => {
      const category = categories[0];
      const res = await deleteCategory(category);

      expect(firestore.deleteDoc).toHaveBeenCalledWith(categoryDoc);
      expect(res).toBe(category);
    });

    it('Should Handle Exception', async () => {
      const err = new Error('Mocked error');

      firestore.deleteDoc = jest.fn(() => {
        throw err;
      });

      const res = await deleteCategory(categories[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when category not passed', async () => {
      const res = await deleteCategory(undefined);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Category');
    });

    it('Should Return Null when category passed as empty object', async () => {
      const res = await deleteCategory({} as ICategory);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Category');
    });
  });
});
