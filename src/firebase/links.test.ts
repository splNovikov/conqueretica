import * as firestore from '@firebase/firestore';
import {
  addLink,
  addLinkToCategory,
  updateLink,
  updateLinkInCategory,
  deleteLink,
  deleteLinkFromCategory,
} from './links';
// Interfaces
import { ILink } from '../interfaces';
// Utils
import { firestoreMockImplementation as fsMock } from '../testUtils/firestore.test';
// Test Data
import { categories as categoriesTestData } from '../__test_data__';
// Firebase BeforeEach
import './_firebase.beforeEach.test';

// todo: add to all firebase tests firestore.updateDoc = jest.fn(); NOT TO HAVE BEEN CALLED
describe('Links "Utils" Test', () => {
  // Test Data
  const category = categoriesTestData[0];

  it('Should Add Link To Category', () => {
    const link: ILink = {
      id: 'id',
      href: 'href',
      title: 'title',
      // @ts-ignore
      createdAt: 'date',
    };

    const res = addLinkToCategory(category, link);
    expect(res).toEqual({ ...category, links: [...category.links, link] });
  });

  it('Should Update Link In Category', () => {
    const link: ILink = {
      id: 'link-2',
      href: 'href',
      title: 'title',
      // @ts-ignore
      createdAt: 'date',
    };

    const res = updateLinkInCategory(category, link);
    expect(res).toEqual({
      ...category,
      links: [category.links[0], link, category.links[2]],
    });
  });

  it('Should Delete Link From Category', () => {
    const link: ILink = {
      id: 'link-2',
      href: 'href',
      title: 'title',
      // @ts-ignore
      createdAt: 'date',
    };

    const res = deleteLinkFromCategory(category, link);
    expect(res).toEqual({
      ...category,
      links: [category.links[0], category.links[2]],
    });
  });
});

describe('Firebase Links Test', () => {
  // Test data
  const title = 'title';
  const href = 'https://ya.ru';
  const category = categoriesTestData[0];

  describe('Add Link', () => {
    it('Should Add Link', async () => {
      firestore.updateDoc = jest.fn();

      const res = await addLink(title, href, category);

      const updatedCategory = {
        ...category,
        links: [
          ...category.links,
          expect.objectContaining({
            title,
            href,
          }),
        ],
      };

      expect(firestore.updateDoc).toHaveBeenCalledWith(
        fsMock.categoryDoc,
        updatedCategory,
      );
      expect(res?.title).toBe(title);
      expect(res?.href).toBe(href);
    });

    it('Should Handle updateDoc Exception', async () => {
      const err = new Error('Mocked error');

      firestore.updateDoc = jest.fn(() => {
        throw err;
      });

      const res = await addLink(title, href, category);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when title not passed', async () => {
      const res = await addLink(undefined, href, category);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Create new link',
      );
    });

    it('Should Return Null when href not passed', async () => {
      const res = await addLink(title, undefined, category);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Create new link',
      );
    });

    it('Should Return Null when category not passed', async () => {
      const res = await addLink(title, href, undefined);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Create new link',
      );
    });

    it('Should Return Null when category.id not passed', async () => {
      const res = await addLink(title, href, {});
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Create new link',
      );
    });
  });

  describe('Update Link', () => {
    const updatedTitle = 'new-title';
    const updatedHref = 'https://ya.ru';
    const linkToUpdate: ILink = {
      id: 'link-2',
      href: 'old-href',
      title: 'old-titletitle',
      // @ts-ignore
      createdAt: 'date',
    };

    it('Should Update Link', async () => {
      firestore.updateDoc = jest.fn();

      const updatedLink = {
        ...linkToUpdate,
        title: updatedTitle,
        href: updatedHref,
      };

      const res = await updateLink(
        updatedTitle,
        updatedHref,
        linkToUpdate,
        category,
      );

      const updatedCategory = {
        ...category,
        links: [category.links[0], updatedLink, category.links[2]],
      };

      expect(firestore.updateDoc).toHaveBeenCalledWith(
        fsMock.categoryDoc,
        updatedCategory,
      );
      expect(res).toStrictEqual(updatedLink);
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
        category,
      );

      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when title not passed', async () => {
      const res = await updateLink(
        undefined,
        updatedHref,
        linkToUpdate,
        category,
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
        category,
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
        category,
      );
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Update a link',
      );
    });

    it('Should Return Null when Link passed as an empty Object', async () => {
      const res = await updateLink(updatedTitle, updatedHref, {}, category);
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
      );
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Update a link',
      );
    });

    it('Should Return Null when Category passed as an empty Object', async () => {
      const res = await updateLink(updatedTitle, updatedHref, linkToUpdate, {});
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Update a link',
      );
    });
  });

  describe('Delete Link', () => {
    const linkToDelete: ILink = {
      id: 'link-2',
      href: 'old-href',
      title: 'old-titletitle',
      // @ts-ignore
      createdAt: 'date',
    };

    it('Should Delete Link', async () => {
      firestore.updateDoc = jest.fn();

      const res = await deleteLink(linkToDelete, category);

      const updatedCategory = {
        ...category,
        links: [category.links[0], category.links[2]],
      };

      expect(firestore.updateDoc).toHaveBeenCalledWith(
        fsMock.categoryDoc,
        updatedCategory,
      );
      expect(res).toBe(linkToDelete);
    });

    it('Should Handle updateDoc Exception', async () => {
      const err = new Error('Mocked error');

      firestore.updateDoc = jest.fn(() => {
        throw err;
      });

      const res = await deleteLink(linkToDelete, category);

      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when Link not passed', async () => {
      const res = await deleteLink(undefined, category);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Delete a link',
      );
    });

    it('Should Return Null when Link passed as an empty Object', async () => {
      const res = await deleteLink({}, category);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Delete a link',
      );
    });

    it('Should Return Null when Category not passed', async () => {
      const res = await deleteLink(linkToDelete, undefined);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Delete a link',
      );
    });

    it('Should Return Null when Category passed as an empty Object', async () => {
      const res = await deleteLink(linkToDelete, {});
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Delete a link',
      );
    });
  });
});
