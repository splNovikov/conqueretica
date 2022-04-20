import { collection, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
// Firebase
import firebase from './index';
// Interfaces
import { ICategory, IColumn, ILink } from '../interfaces';
// Utils
import { defaultErrorHandler, httpErrorHandler } from '../utils';

export const addLinkToCategory = (
  categories: ICategory[],
  category: ICategory,
  link: ILink,
): ICategory[] => {
  return categories.reduce((acc, cat) => {
    return cat.id === category.id
      ? [...acc, { ...cat, links: [...cat.links, link] }]
      : [...acc, cat];
  }, [] as ICategory[]);
};

export const updateLinkInCategory = (
  categories: ICategory[],
  category: ICategory,
  link: ILink,
): ICategory[] => {
  return categories.reduce((acc, cat) => {
    if (cat.id !== category.id) {
      return [...acc, cat];
    }

    const updatedLinks = cat.links.reduce(
      (acc2, l) => (l.id === link.id ? [...acc2, link] : [...acc2, l]),
      [] as ILink[],
    );

    return [...acc, { ...cat, links: updatedLinks }];
  }, [] as ICategory[]);
};

export const deleteLinkFromCategory = (
  categories: ICategory[],
  category: ICategory,
  link: ILink,
): ICategory[] => {
  return categories.reduce((acc, cat) => {
    if (cat.id !== category.id) {
      return [...acc, cat];
    }

    const updatedLinks = cat.links.reduce(
      (acc2, l) => (l.id === link.id ? acc2 : [...acc2, l]),
      [] as ILink[],
    );

    return [...acc, { ...cat, links: updatedLinks }];
  }, [] as ICategory[]);
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
  const updatedCategory = {
    ...category,
    links: [...category.links, link],
  };
  try {
    const categoriesRef = collection(firebase.firestoreDB, 'categories');
    const categoriesDoc = doc(categoriesRef, category.id);

    await updateDoc(categoriesDoc, updatedCategory);
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
  column: IColumn,
): Promise<ILink | null> => {
  if (!title || !href || !link?.id || !category?.id || !column?.id) {
    defaultErrorHandler('Invalid Parameters Passed to Update a link');
    return null;
  }

  const updatedLink = { ...link, title, href };

  try {
    const columnsRef = collection(firebase.firestoreDB, 'columns');
    const columnDoc = doc(columnsRef, column.id);
    // const categories = await getCategoriesByColumnDoc(columnDoc);

    // if (!categories) {
    //   return null;
    // }

    // const updatedCategories = updateLinkInCategory(
    //   categories,
    //   category,
    //   updatedLink,
    // );

    // await updateDoc(columnDoc, { categories: updatedCategories });
    await updateDoc(columnDoc, { categories: [] });
    return updatedLink;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};

export const deleteLink = async (
  link: ILink,
  category: ICategory,
  column: IColumn,
): Promise<ILink | null> => {
  if (!link?.id || !category?.id || !column?.id) {
    defaultErrorHandler('Invalid Parameters Passed to Delete a link');
    return null;
  }

  try {
    const columnsRef = collection(firebase.firestoreDB, 'columns');
    const columnDoc = doc(columnsRef, column.id);
    // const categories = await getCategoriesByColumnDoc(columnDoc);
    const categories: ICategory[] = [];
    const updatedCategories = deleteLinkFromCategory(
      categories,
      category,
      link,
    );

    await updateDoc(columnDoc, { categories: updatedCategories });
    return link;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};
