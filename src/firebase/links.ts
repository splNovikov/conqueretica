import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
// Firebase
import firebase from './index';
// Interfaces
import { ICategory, ILink } from '../interfaces';
// Utils
import { defaultErrorHandler, httpErrorHandler } from '../utils';

export const addLinkToCategory = (category: ICategory, link: ILink) => {
  return {
    ...category,
    links: [...category.links, link],
  };
};

export const updateLinkInCategory = (category: ICategory, link: ILink) => {
  return {
    ...category,
    links: category.links.reduce(
      (acc2, l) => (l.id === link.id ? [...acc2, link] : [...acc2, l]),
      [] as ILink[],
    ),
  };
};

export const deleteLinkFromCategory = (category: ICategory, link: ILink) => {
  return {
    ...category,
    links: category.links.reduce(
      (acc2, l) => (l.id === link.id ? acc2 : [...acc2, l]),
      [] as ILink[],
    ),
  };
};

export const addLink = async (
  title: string,
  href: string,
  category: ICategory,
): Promise<ILink | null> => {
  if (!title || !href || !category?.id) {
    defaultErrorHandler('Invalid Parameters Passed to Create new link');
    return null;
  }

  const link: ILink = {
    id: uuidv4(),
    title,
    href,
    createdAt: Timestamp.now(),
  };
  const updatedCategory = addLinkToCategory(category, link);
  try {
    const categoryRef = doc(firebase.firestoreDB, 'categories', category.id);

    await updateDoc(categoryRef, updatedCategory);
    return link;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};

export const updateLink = async (
  title: string,
  href: string,
  link: ILink,
  category: ICategory,
): Promise<ILink | null> => {
  if (!title || !href || !link?.id || !category?.id) {
    defaultErrorHandler('Invalid Parameters Passed to Update a link');
    return null;
  }

  const updatedLink = { ...link, title, href };
  const updatedCategory = updateLinkInCategory(category, updatedLink);
  try {
    const categoryRef = doc(firebase.firestoreDB, 'categories', category.id);

    await updateDoc(categoryRef, updatedCategory);
    return updatedLink;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};

export const deleteLink = async (
  link: ILink,
  category: ICategory,
): Promise<ILink | null> => {
  if (!link?.id || !category?.id) {
    defaultErrorHandler('Invalid Parameters Passed to Delete a link');
    return null;
  }

  const updatedCategory = deleteLinkFromCategory(category, link);
  try {
    const categoryRef = doc(firebase.firestoreDB, 'categories', category.id);

    await updateDoc(categoryRef, updatedCategory);
    return link;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};
