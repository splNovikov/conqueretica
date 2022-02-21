import * as firestore from '@firebase/firestore';
import { addCategory, deleteCategory } from './categories';
// Interfaces
import { ICategory, IColumn } from '../interfaces';
// Test Data
import { columns } from '../__test_data__';

describe('Firebase Categories Test', () => {
  const columnDoc = { columnDoc: 'test_columnDoc' };
  const collectionRef = { colRef: 'test_collectionRef' };
  const origConsoleError = console.error;

  beforeEach(() => {
    // @ts-ignore
    jest.spyOn(firestore, 'doc').mockReturnValue(columnDoc);
    // @ts-ignore
    jest.spyOn(firestore, 'collection').mockReturnValue(collectionRef);
  });

  afterEach(() => {
    jest.resetAllMocks();
    console.error = origConsoleError;
  });

  describe('Add Category', () => {
    const origUpdateDoc = firestore.updateDoc;

    afterEach(() => {
      // @ts-ignore
      firestore.updateDoc = origUpdateDoc;
    });

    it('Should Add Category', async () => {
      // @ts-ignore
      firestore.updateDoc = jest.fn();

      const categoryTitle = 'category_title';

      const categoryExpectedRes = {
        title: categoryTitle,
        links: [],
      };

      const arrayUnionRes = [categoryExpectedRes];
      // @ts-ignore
      jest.spyOn(firestore, 'arrayUnion').mockReturnValue(arrayUnionRes);

      const res = await addCategory(categoryTitle, columns[0]);
      expect(firestore.updateDoc).toHaveBeenCalledWith(columnDoc, {
        categories: arrayUnionRes,
      });
      expect(res?.title).toBe(categoryExpectedRes.title);
      expect(res?.links.length).toBe(0);
    });

    it('Should Handle Exception', async () => {
      const err = new Error('Mocked error');
      console.error = jest.fn();
      // @ts-ignore
      firestore.updateDoc = jest.fn(() => {
        throw err;
      });

      const res = await addCategory('title', columns[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when column not passed', async () => {
      console.error = jest.fn();
      // @ts-ignore
      const res = await addCategory('title');
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column');
    });

    it('Should Return Null when column passed as empty object', async () => {
      console.error = jest.fn();
      const res = await addCategory('title', {} as IColumn);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column');
    });

    it('Should Return Null when title is empty', async () => {
      console.error = jest.fn();
      // @ts-ignore
      const res = await addCategory(undefined, { id: '123' });
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Title');
    });
  });

  describe('Delete Category', () => {
    const origUpdateDoc = firestore.updateDoc;

    afterEach(() => {
      // @ts-ignore
      firestore.updateDoc = origUpdateDoc;
    });

    it('Should Delete Category', async () => {
      // @ts-ignore
      firestore.updateDoc = jest.fn();

      // @ts-ignore
      const arrayRemoveRes = [];
      // @ts-ignore
      jest.spyOn(firestore, 'arrayRemove').mockReturnValue(arrayRemoveRes);

      const res = await deleteCategory(columns[0], columns[0].categories[0]);
      expect(firestore.updateDoc).toHaveBeenCalledWith(columnDoc, {
        // @ts-ignore
        categories: arrayRemoveRes,
      });
      expect(res?.title).toBe(columns[0].categories[0].title);
      expect(res?.links.length).toBe(columns[0].categories[0].links.length);
    });

    it('Should Handle Exception', async () => {
      const err = new Error('Mocked error');
      console.error = jest.fn();
      // @ts-ignore
      firestore.updateDoc = jest.fn(() => {
        throw err;
      });

      const res = await deleteCategory(columns[0], columns[0].categories[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when column not passed', async () => {
      console.error = jest.fn();
      // @ts-ignore
      const res = await deleteCategory(undefined, columns[0].categories[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column || Category');
    });

    it('Should Return Null when column passed as empty object', async () => {
      console.error = jest.fn();
      const res = await deleteCategory({} as IColumn, columns[0].categories[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column || Category');
    });

    it('Should Return Null when category not passed', async () => {
      console.error = jest.fn();
      // @ts-ignore
      const res = await deleteCategory(columns[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column || Category');
    });

    it('Should Return Null when category passed as empty object', async () => {
      console.error = jest.fn();
      const res = await deleteCategory(columns[0], {} as ICategory);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column || Category');
    });
  });
});
