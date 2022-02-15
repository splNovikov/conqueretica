import * as firestore from '@firebase/firestore';
import { addCategory, deleteCategory } from './categories';
// Test Data
import { columns } from '../__test_data__';

describe('Firebase Categories Test', () => {
  const columnDoc = { columnDoc: 'test_columnDoc' };
  const collectionRef = { colRef: 'test_collectionRef' };

  beforeEach(() => {
    // @ts-ignore
    jest.spyOn(firestore, 'doc').mockReturnValue(columnDoc);
    // @ts-ignore
    jest.spyOn(firestore, 'collection').mockReturnValue(collectionRef);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Add Category', () => {
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
      // @ts-ignore
      const res = await addCategory('title', {});
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
});
