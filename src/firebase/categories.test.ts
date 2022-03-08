import * as firestore from '@firebase/firestore';
import {
  addCategory,
  deleteCategory,
  getCategoriesByColumnDoc,
} from './categories';
// Interfaces
import { ICategory, IColumn } from '../interfaces';
// Test Data
import { columns } from '../__test_data__';

describe('Firebase Categories Test', () => {
  const columnDoc = { columnDoc: 'test_columnDoc' };
  const collectionRef = { colRef: 'test_collectionRef' };
  const origUpdateDoc = firestore.updateDoc;
  const origConsoleError = console.error;

  beforeEach(() => {
    jest.spyOn(firestore, 'doc').mockReturnValue(columnDoc);
    jest.spyOn(firestore, 'collection').mockReturnValue(collectionRef);
    firestore.updateDoc = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
    firestore.updateDoc = origUpdateDoc;
    console.error = origConsoleError;
  });

  describe('Add Category', () => {
    it('Should Add Category', async () => {
      const categoryTitle = 'category_title';
      const categoryExpectedRes = {
        title: categoryTitle,
        links: [],
      };
      const arrayUnionRes = [categoryExpectedRes];

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

      firestore.updateDoc = jest.fn(() => {
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
    it('Should Delete Category', async () => {
      const arrayRemoveRes = [];

      jest.spyOn(firestore, 'arrayRemove').mockReturnValue(arrayRemoveRes);

      const res = await deleteCategory(columns[0], columns[0].categories[0]);
      expect(firestore.updateDoc).toHaveBeenCalledWith(columnDoc, {
        categories: arrayRemoveRes,
      });
      expect(res?.title).toBe(columns[0].categories[0].title);
      expect(res?.links.length).toBe(columns[0].categories[0].links.length);
    });

    it('Should Handle Exception', async () => {
      const err = new Error('Mocked error');

      firestore.updateDoc = jest.fn(() => {
        throw err;
      });

      const res = await deleteCategory(columns[0], columns[0].categories[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when column not passed', async () => {
      const res = await deleteCategory(undefined, columns[0].categories[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column || Category');
    });

    it('Should Return Null when column passed as empty object', async () => {
      const res = await deleteCategory({} as IColumn, columns[0].categories[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column || Category');
    });

    it('Should Return Null when category not passed', async () => {
      const res = await deleteCategory(columns[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column || Category');
    });

    it('Should Return Null when category passed as empty object', async () => {
      const res = await deleteCategory(columns[0], {} as ICategory);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith('No Column || Category');
    });
  });

  describe('Get Categories By Column Doc', () => {
    it('Should return categories', async () => {
      jest
        .spyOn(firestore, 'getDoc')
        .mockReturnValue({ data: () => columns[0] });

      const res = await getCategoriesByColumnDoc({});
      expect(res).toBe(columns[0].categories);
    });

    it('Should return empty array when categories are undefined', async () => {
      jest
        .spyOn(firestore, 'getDoc')
        .mockReturnValue({ data: () => undefined });

      const res = await getCategoriesByColumnDoc({});
      expect(res).toEqual([]);
    });
  });
});
