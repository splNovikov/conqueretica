import React, { FC } from 'react';
// Interfaces
import { ICategory, ILink } from '../../interfaces';
// Components
import Linky from '../Linky';
import AddLinkForm from '../AddLinkForm';
// Styles
import './Category.scss';

const Category: FC<{
  category: ICategory;
  deleteCategoryHandler: (val: ICategory) => void;
  createLinkHandler: (title: string, href: string, category: ICategory) => void;
}> = ({ category, deleteCategoryHandler, createLinkHandler }) => {
  const handleCategoryDelete = () => deleteCategoryHandler(category);

  const handleLinkCreate = (title: string, href: string) =>
    createLinkHandler(title, href, category);

  return (
    <div className="category">
      <div>
        {category.title}
        <button type="button" onClick={handleCategoryDelete}>
          Delete Category
        </button>
      </div>
      {category.links.map((l: ILink) => (
        <div key={l.id} className="linky-wrapper">
          <Linky link={l} ellipsed />
        </div>
      ))}
      <AddLinkForm createLinkHandler={handleLinkCreate} />
    </div>
  );
};

export default Category;
