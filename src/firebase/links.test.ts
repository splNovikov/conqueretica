import * as firestore from '@firebase/firestore';
import {
  addLink,
  addLinkToCategory,
  updateLink,
  updateLinkInCategory,
  deleteLink,
  deleteLinkFromCategory,
} from './links';
import * as categories from './categories';
// Interfaces
import { ICategory, ILink } from '../interfaces';
// Test Data
import { columns } from '../__test_data__';

describe('Links "Utils" Test', () => {
  it('Should Add Link To Category', () => {
    const cats: ICategory[] = columns[0].categories;
    const link: ILink = {
      id: 'id',
      href: 'href',
      title: 'title',
      // @ts-ignore
      createdAt: 'date',
    };

    const res = addLinkToCategory(cats, cats[0], link);
    expect(res).toEqual([
      { ...cats[0], links: [...cats[0].links, link] },
      cats[1],
    ]);
  });

  it('Should Update Link In Category', () => {
    const cats: ICategory[] = columns[0].categories;
    const link: ILink = {
      id: 'link-2',
      href: 'href',
      title: 'title',
      // @ts-ignore
      createdAt: 'date',
    };

    const res = updateLinkInCategory(cats, cats[0], link);
    expect(res).toEqual([
      { ...cats[0], links: [cats[0].links[0], link, cats[0].links[2]] },
      cats[1],
    ]);
  });

  it('Should Delete Link From Category', () => {
    const cats: ICategory[] = columns[0].categories;
    const link: ILink = {
      id: 'link-2',
      href: 'href',
      title: 'title',
      // @ts-ignore
      createdAt: 'date',
    };

    const res = deleteLinkFromCategory(cats, cats[0], link);
    expect(res).toEqual([
      { ...cats[0], links: [cats[0].links[0], cats[0].links[2]] },
      cats[1],
    ]);
  });
});

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

  describe('Update Link', () => {
    const origSetDoc = firestore.updateDoc;
    const updatedTitle = 'new-title';
    const updatedHref = 'https://ya.ru';
    const linkToUpdate: ILink = {
      id: 'link-2',
      href: 'old-href',
      title: 'old-titletitle',
      // @ts-ignore
      createdAt: 'date',
    };

    beforeEach(() => {
      firestore.updateDoc = jest.fn();
    });

    afterEach(() => {
      firestore.updateDoc = origSetDoc;
    });

    it('Should Update Link', async () => {
      const updatedLink = {
        ...linkToUpdate,
        title: updatedTitle,
        href: updatedHref,
      };

      const res = await updateLink(
        updatedTitle,
        updatedHref,
        linkToUpdate,
        columns[0].categories[0],
        columns[0],
      );

      const updatedCategories = [
        {
          ...columns[0].categories[0],
          links: [
            columns[0].categories[0].links[0],
            updatedLink,
            columns[0].categories[0].links[2],
          ],
        },
        columns[0].categories[1],
      ];

      expect(firestore.updateDoc).toHaveBeenCalledWith(columnDoc, {
        categories: updatedCategories,
      });
      expect(res).toStrictEqual(updatedLink);
    });

    it('Should Handle getCategoriesByColumnDoc Exception', async () => {
      const err = new Error('Mocked error');
      jest
        .spyOn(categories, 'getCategoriesByColumnDoc')
        .mockReturnValue(Promise.reject(err));

      const res = await updateLink(
        updatedTitle,
        updatedHref,
        linkToUpdate,
        columns[0].categories[0],
        columns[0],
      );

      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Handle updateDoc Exception', async () => {
      const err = new Error('Mocked error');

      firestore.updateDoc = jest.fn(() => {
        throw err;
      });

      const res = await updateLink(
        updatedTitle,
        updatedHref,
        linkToUpdate,
        columns[0].categories[0],
        columns[0],
      );

      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Handle Not Found Categories with Exception', async () => {
      jest
        .spyOn(categories, 'getCategoriesByColumnDoc')
        .mockReturnValue(Promise.resolve(undefined));

      const res = await updateLink(
        updatedTitle,
        updatedHref,
        linkToUpdate,
        columns[0].categories[0],
        columns[0],
      );

      expect(res).toBeNull();
    });

    it('Should Return Null when title not passed', async () => {
      const res = await updateLink(
        undefined,
        updatedHref,
        linkToUpdate,
        columns[0].categories[0],
        columns[0],
      );
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Update a link',
      );
    });

    it('Should Return Null when Href not passed', async () => {
      const res = await updateLink(
        updatedTitle,
        undefined,
        linkToUpdate,
        columns[0].categories[0],
        columns[0],
      );
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Update a link',
      );
    });

    it('Should Return Null when Link not passed', async () => {
      const res = await updateLink(
        updatedTitle,
        updatedHref,
        undefined,
        columns[0].categories[0],
        columns[0],
      );
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Update a link',
      );
    });

    it('Should Return Null when Link passed as an empty Object', async () => {
      const res = await updateLink(
        updatedTitle,
        updatedHref,
        {},
        columns[0].categories[0],
        columns[0],
      );
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Update a link',
      );
    });

    it('Should Return Null when Category not passed', async () => {
      const res = await updateLink(
        updatedTitle,
        updatedHref,
        linkToUpdate,
        undefined,
        columns[0],
      );
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Update a link',
      );
    });

    it('Should Return Null when Category passed as an empty Object', async () => {
      const res = await updateLink(
        updatedTitle,
        updatedHref,
        linkToUpdate,
        {},
        columns[0],
      );
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Update a link',
      );
    });

    it('Should Return Null when Column not passed', async () => {
      const res = await updateLink(
        updatedTitle,
        updatedHref,
        linkToUpdate,
        columns[0].categories[0],
        undefined,
      );
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Update a link',
      );
    });

    it('Should Return Null when Column passed as an empty Object', async () => {
      const res = await updateLink(
        updatedTitle,
        updatedHref,
        linkToUpdate,
        columns[0].categories[0],
        {},
      );
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Update a link',
      );
    });
  });

  describe('Delete Link', () => {
    const origSetDoc = firestore.updateDoc;
    const linkToDelete: ILink = {
      id: 'link-2',
      href: 'old-href',
      title: 'old-titletitle',
      // @ts-ignore
      createdAt: 'date',
    };

    beforeEach(() => {
      firestore.updateDoc = jest.fn();
    });

    afterEach(() => {
      firestore.updateDoc = origSetDoc;
    });

    it('Should Delete Link', async () => {
      const res = await deleteLink(
        linkToDelete,
        columns[0].categories[0],
        columns[0],
      );

      const updatedCategories = [
        {
          ...columns[0].categories[0],
          links: [
            columns[0].categories[0].links[0],
            columns[0].categories[0].links[2],
          ],
        },
        columns[0].categories[1],
      ];

      expect(firestore.updateDoc).toHaveBeenCalledWith(columnDoc, {
        categories: updatedCategories,
      });
      expect(res).toBe(linkToDelete);
    });

    it('Should Handle getCategoriesByColumnDoc Exception', async () => {
      const err = new Error('Mocked error');
      jest
        .spyOn(categories, 'getCategoriesByColumnDoc')
        .mockReturnValue(Promise.reject(err));

      const res = await deleteLink(
        linkToDelete,
        columns[0].categories[0],
        columns[0],
      );

      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Handle updateDoc Exception', async () => {
      const err = new Error('Mocked error');

      firestore.updateDoc = jest.fn(() => {
        throw err;
      });

      const res = await deleteLink(
        linkToDelete,
        columns[0].categories[0],
        columns[0],
      );

      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Handle Not Found Categories with Exception', async () => {
      jest
        .spyOn(categories, 'getCategoriesByColumnDoc')
        .mockReturnValue(Promise.resolve(undefined));

      const res = await deleteLink(
        linkToDelete,
        columns[0].categories[0],
        columns[0],
      );

      expect(res).toBeNull();
    });

    it('Should Return Null when Link not passed', async () => {
      const res = await deleteLink(
        undefined,
        columns[0].categories[0],
        columns[0],
      );
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Delete a link',
      );
    });

    it('Should Return Null when Link passed as an empty Object', async () => {
      const res = await deleteLink({}, columns[0].categories[0], columns[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Delete a link',
      );
    });

    it('Should Return Null when Category not passed', async () => {
      const res = await deleteLink(linkToDelete, undefined, columns[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Delete a link',
      );
    });

    it('Should Return Null when Category passed as an empty Object', async () => {
      const res = await deleteLink(linkToDelete, {}, columns[0]);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Delete a link',
      );
    });

    it('Should Return Null when Column not passed', async () => {
      const res = await deleteLink(
        linkToDelete,
        columns[0].categories[0],
        undefined,
      );
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Delete a link',
      );
    });

    it('Should Return Null when Column passed as an empty Object', async () => {
      const res = await deleteLink(linkToDelete, columns[0].categories[0], {});
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Delete a link',
      );
    });
  });
});
