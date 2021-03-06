import * as firestore from '@firebase/firestore';

import {
  addLink,
  addLinkToCategory,
  updateLink,
  updateLinkInCategory,
  deleteLink,
  deleteLinkFromCategory,
  updateLinkLastUsed,
} from './links';
// Interfaces
import { ILink } from '../interfaces';
// Utils
import { firestoreMockImplementation as fsMock } from '../testUtils/firestore.test';
// Test Data
import { categories as categoriesTestData } from '../__test_data__';
// Firebase BeforeEach
import './_firebase.beforeEach.test';

describe('Links "Utils" Test', () => {
  // Test Data
  const category = categoriesTestData[0];

  it('Should Add Link To Category', () => {
    const link: ILink = {
      ...category.links[2],
      id: 'new-id',
      href: 'new-href',
      title: 'new-title',
    };

    const res = addLinkToCategory(category, link);
    expect(res).toEqual({ ...category, links: [...category.links, link] });
  });

  it('Should Update Link In Category', () => {
    const link: ILink = {
      ...category.links[1],
      href: 'href',
      title: 'title',
    };

    const res = updateLinkInCategory(category, link);
    expect(res).toEqual({
      ...category,
      links: [category.links[0], link, category.links[2]],
    });
  });

  it('Should Delete Link From Category', () => {
    const link: ILink = category.links[1];

    const res = deleteLinkFromCategory(category, link);
    expect(res).toEqual({
      ...category,
      links: [category.links[0], category.links[2]],
    });
  });
});

describe('Firebase Links Test', () => {
  firestore.updateDoc = jest.fn();
  // Test data
  const title = 'title';
  const href = 'https://ya.ru';
  const category = categoriesTestData[0];

  describe('Add Link', () => {
    it('Should Add Link', async () => {
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
      expect(firestore.updateDoc).not.toHaveBeenCalled();
    });

    it('Should Return Null when href not passed', async () => {
      const res = await addLink(title, undefined, category);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Create new link',
      );
      expect(firestore.updateDoc).not.toHaveBeenCalled();
    });

    it('Should Return Null when category not passed', async () => {
      const res = await addLink(title, href, undefined);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Create new link',
      );
      expect(firestore.updateDoc).not.toHaveBeenCalled();
    });

    it('Should Return Null when category.id not passed', async () => {
      const res = await addLink(title, href, {});
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Create new link',
      );
      expect(firestore.updateDoc).not.toHaveBeenCalled();
    });
  });

  describe('Update Link', () => {
    const updatedTitle = 'new-title';
    const updatedHref = 'https://ya.ru';
    const linkToUpdate: ILink = category.links[1];

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
      expect(firestore.updateDoc).not.toHaveBeenCalled();
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
      expect(firestore.updateDoc).not.toHaveBeenCalled();
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
      expect(firestore.updateDoc).not.toHaveBeenCalled();
    });

    it('Should Return Null when Link passed as an empty Object', async () => {
      const res = await updateLink(updatedTitle, updatedHref, {}, category);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Update a link',
      );
      expect(firestore.updateDoc).not.toHaveBeenCalled();
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
      expect(firestore.updateDoc).not.toHaveBeenCalled();
    });

    it('Should Return Null when Category passed as an empty Object', async () => {
      const res = await updateLink(updatedTitle, updatedHref, linkToUpdate, {});
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Update a link',
      );
      expect(firestore.updateDoc).not.toHaveBeenCalled();
    });
  });

  describe('Update Link Last Used', () => {
    const linkToUpdate: ILink = category.links[1];

    it('Should Update Link Last Used', async () => {
      const res = await updateLinkLastUsed(linkToUpdate, category);

      expect(firestore.updateDoc).toHaveBeenCalled();
      expect(res?.lastUsed).not.toBe(linkToUpdate.lastUsed);
    });

    it('Should Handle updateDoc Exception', async () => {
      const err = new Error('Mocked error');

      firestore.updateDoc = jest.fn(() => {
        throw err;
      });

      const res = await updateLinkLastUsed(linkToUpdate, category);

      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('Should Return Null when Link not passed', async () => {
      const res = await updateLinkLastUsed(undefined, category);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Update a link',
      );
      expect(firestore.updateDoc).not.toHaveBeenCalled();
    });

    it('Should Return Null when Link passed as an empty Object', async () => {
      const res = await updateLinkLastUsed({}, category);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Update a link',
      );
      expect(firestore.updateDoc).not.toHaveBeenCalled();
    });

    it('Should Return Null when Category not passed', async () => {
      const res = await updateLinkLastUsed(linkToUpdate, undefined);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Update a link',
      );
      expect(firestore.updateDoc).not.toHaveBeenCalled();
    });

    it('Should Return Null when Category passed as an empty Object', async () => {
      const res = await updateLinkLastUsed(linkToUpdate, {});
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Update a link',
      );
      expect(firestore.updateDoc).not.toHaveBeenCalled();
    });
  });

  describe('Delete Link', () => {
    const linkToDelete: ILink = {
      id: 'link-2',
      href: 'old-href',
      title: 'old-titletitle',
      createdAt: 'date',
    };

    it('Should Delete Link', async () => {
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
      expect(firestore.updateDoc).not.toHaveBeenCalled();
    });

    it('Should Return Null when Link passed as an empty Object', async () => {
      const res = await deleteLink({}, category);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Delete a link',
      );
      expect(firestore.updateDoc).not.toHaveBeenCalled();
    });

    it('Should Return Null when Category not passed', async () => {
      const res = await deleteLink(linkToDelete, undefined);
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Delete a link',
      );
      expect(firestore.updateDoc).not.toHaveBeenCalled();
    });

    it('Should Return Null when Category passed as an empty Object', async () => {
      const res = await deleteLink(linkToDelete, {});
      expect(res).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        'Invalid Parameters Passed to Delete a link',
      );
      expect(firestore.updateDoc).not.toHaveBeenCalled();
    });
  });
});
