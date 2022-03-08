import React, { FC } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
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
      <div className="category-header">
        <span className="category-title">{category.title}</span>
        <DeleteOutlined
          className="delete-category-icon"
          onClick={handleCategoryDelete}
        />
      </div>
      <div className="category-links">
        {category.links.map((l: ILink) => (
          <div key={l.id} className="linky-wrapper">
            <Linky link={l} ellipsed iconSize="xx-small" />
          </div>
        ))}
      </div>
      <AddLinkForm createLinkHandler={handleLinkCreate} />
    </div>
  );
};

export default Category;
