import React, { FC } from 'react';
// Interfaces
import { ICategory, ILink } from '../../interfaces';
// Components
import Linky from '../Linky';
// Styles
import './Category.scss';

const Category: FC<{
  category: ICategory;
  deleteCategoryHandler: (val: ICategory) => void;
}> = ({ category, deleteCategoryHandler }) => {
  const handleCategoryDelete = () => deleteCategoryHandler(category);

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
    </div>
  );
};

export default Category;
