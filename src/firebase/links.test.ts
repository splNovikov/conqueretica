import * as firestore from '@firebase/firestore';
import { addLink } from './links';
import * as categories from './categories';
// Test Data
import { columns } from '../__test_data__';

describe('Firebase Links Test', () => {
  const collectionRef = { colRef: 'test_collectionRef' };
  const columnDoc = { columnDoc: 'test_columnDoc' };
  const origConsoleError = console.error;

  beforeEach(() => {
    jest.spyOn(firestore, 'collection').mockReturnValue(collectionRef);
    jest.spyOn(firestore, 'doc').mockReturnValue(columnDoc);
    jest
      .spyOn(categories, 'getCategoriesByColumnDoc')
      .mockReturnValue(Promise.resolve(columns[0].categories));
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
    console.error = origConsoleError;
  });

  describe('Add Link', () => {
    const origSetDoc = firestore.updateDoc;

    beforeEach(() => {
      firestore.updateDoc = jest.fn();
    });

    afterEach(() => {
      firestore.updateDoc = origSetDoc;
    });

    it('Should Add Link', async () => {
      const title = 'title';
      const href = 'https://ya.ru';
      const res = await addLink(
        title,
        href,
        columns[0].categories[0],
        columns[0],
      );

      const updatedCategories = [
        {
          ...columns[0].categories[0],
          links: [
            ...columns[0].categories[0].links,
            expect.objectContaining({
              title,
              href,
            }),
          ],
        },
        columns[0].categories[1],
      ];

      expect(firestore.updateDoc).toHaveBeenCalledWith(columnDoc, {
        categories: updatedCategories,
      });
      expect(res?.title).toBe(title);
      expect(res?.href).toBe(href);
    });

    it('Should Handle getCategoriesByColumnDoc Exception', async () => {
      const err = new Error('Mocked error');
      jest
        .spyOn(categories, 'getCategoriesByColumnDoc')
        .mockReturnValue(Promise.reject(err));

      const res = await addLink('1', '1', columns[0].categories[0], columns[0]);

      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Handle updateDoc Exception', async () => {
      const err = new Error('Mocked error');

      firestore.updateDoc = jest.fn(() => {
        throw err;
      });

      const res = await addLink('1', '1', columns[0].categories[0], columns[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Handle Not Found Categories with Exception', async () => {
      jest
        .spyOn(categories, 'getCategoriesByColumnDoc')
        .mockReturnValue(Promise.resolve(undefined));

      const res = await addLink('1', '1', columns[0].categories[0], columns[0]);

      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Categories not found for this Column: column-1',
      );
    });

    it('Should Return Null when title not passed', async () => {
      const res = await addLink(
        undefined,
        '1',
        columns[0].categories[0],
        columns[0],
      );
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Create new link',
      );
    });

    it('Should Return Null when href not passed', async () => {
      const res = await addLink(
        '1',
        undefined,
        columns[0].categories[0],
        columns[0],
      );
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Create new link',
      );
    });

    it('Should Return Null when category not passed', async () => {
      const res = await addLink('1', '1', undefined, columns[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Create new link',
      );
    });

    it('Should Return Null when category.id not passed', async () => {
      const res = await addLink('1', '1', {}, columns[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Create new link',
      );
    });

    it('Should Return Null when column not passed', async () => {
      const res = await addLink('1', '1', columns[0].categories[0], undefined);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Create new link',
      );
    });

    it('Should Return Null when column.id not passed', async () => {
      const res = await addLink('1', '1', columns[0].categories[0], {});
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Create new link',
      );
    });
  });
});
