import React, { FC } from 'react';
import { Col } from 'antd';
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
  categoryFormSubmitHandler: (value: string, column: IColumn) => void;
  deleteCategoryHandler: (category: ICategory, column: IColumn) => void;
}> = ({
  column,
  deleteColumnHandler,
  categoryFormSubmitHandler,
  deleteCategoryHandler,
}) => {
  const handleColumnDelete = () => deleteColumnHandler(column);

  const handleCategoryFormSubmit = (value: string) =>
    categoryFormSubmitHandler(value, column);

  const handleCategoryDelete = (category: ICategory) =>
    deleteCategoryHandler(category, column);

  return (
    <Col span={6} className="column">
      <button type="button" onClick={handleColumnDelete}>
        Delete Column
      </button>
      <AddForm
        formSubmitHandler={handleCategoryFormSubmit}
        placeholder="create a new category"
      />
      {column.categories.map((category: ICategory) => (
        <Category
          category={category}
          deleteCategoryHandler={handleCategoryDelete}
          key={category.id}
        />
      ))}
    </Col>
  );
};

export default Column;
