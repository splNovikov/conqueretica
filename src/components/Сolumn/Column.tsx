import React, { FC } from 'react';
import { Col } from 'antd';
// Firebase
import firebase from '../../firebase';
// Interfaces
import { ICategory, IColumn, ILink } from '../../interfaces';
// Components
import Linky from '../Linky';
// Styles
import './Column.scss';
import AddForm from '../AddForm';

const Column: FC<{
  column: IColumn;
  deleteColumnHandler: (val: IColumn) => void;
}> = ({ column, deleteColumnHandler }) => {
  const handleColumnDelete = () => deleteColumnHandler(column);

  const categoryFormSubmitHandler = (value: string) =>
    firebase.addCategory(value, column);

  const deleteCategoryHandler = (category: ICategory) =>
    firebase.deleteCategory(column, category);

  return (
    <Col span={6} className="column">
      <div>Col</div>
      <button type="button" onClick={handleColumnDelete}>
        Delete Column
      </button>
      <AddForm
        formSubmitHandler={categoryFormSubmitHandler}
        placeholder="create a new category"
      />
      {column.categories.map((category: ICategory) => (
        <Category
          category={category}
          deleteCategoryHandler={deleteCategoryHandler}
          key={category.id}
        />
      ))}
    </Col>
  );
};

// todo: move to scss
const style = {
  display: 'flex',
};

// todo: own component
const Category: FC<{
  category: ICategory;
  deleteCategoryHandler: (val: ICategory) => void;
}> = ({ category, deleteCategoryHandler }) => {
  const handleCategoryDelete = () => deleteCategoryHandler(category);

  return (
    <div>
      <div>{category.title}</div>
      <button type="button" onClick={handleCategoryDelete}>
        Delete Category
      </button>
      {category.links.map((l: ILink) => (
        <div key={l.id} style={style}>
          <Linky link={l} ellipsed />
        </div>
      ))}
    </div>
  );
};

export default Column;
