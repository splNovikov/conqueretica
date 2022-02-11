import React, { FC } from 'react';
import { Col } from 'antd';
// Firebase
import firebase from '../../firebase';
// Interfaces
import { ICategory, IColumn } from '../../interfaces';
// Components
import Category from '../Category';
import AddForm from '../AddForm';
// Styles
import './Column.scss';

const Column: FC<{
  column: IColumn;
  deleteColumnHandler: (val: IColumn) => void;
}> = ({ column, deleteColumnHandler }) => {
  const handleColumnDelete = () => deleteColumnHandler(column);

  // todo: should be moved out from dump component
  const categoryFormSubmitHandler = (value: string) =>
    firebase.addCategory(value, column);

  // todo: should be moved out from dump component
  const deleteCategoryHandler = (category: ICategory) =>
    firebase.deleteCategory(column, category);

  return (
    <Col span={6} className="column">
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

export default Column;
