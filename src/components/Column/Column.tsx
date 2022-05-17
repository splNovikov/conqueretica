import React, { FC, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Button, Col, Skeleton } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
// Firebase
import firebase from '../../firebase';
// Interfaces
import { ICategory, IColumn } from '../../interfaces';
// Components
import Category from '../Category';
import SingleInputForm from '../SingleInputForm';
// Utils
import { httpErrorHandler } from '../../utils';
// Styles
import './Column.scss';

const Column: FC<{
  column: IColumn;
  span: number;
}> = ({ column, span }) => {
  const [isAddCategoryMode, setIsAddCategoryMode] = useState(false);
  const qCategories = firebase.getCategoriesQuery(column);
  const [categories = [], loadingCategories, categoriesError] =
    useCollectionData<ICategory>(qCategories);

  if (categoriesError?.message) {
    httpErrorHandler(categoriesError);
  }

  const handleCategoryFormSubmit = async (value: string) => {
    disableAddCategoryMode();
    await firebase.addCategory(value, column);
  };

  const handleCategoryDelete = async (category: ICategory) => {
    // if last category in column:
    if (categories.length === 1) {
      return firebase.deleteColumnScenario(column);
    }

    return firebase.deleteCategory(category);
  };

  const enableAddCategoryMode = () => {
    setIsAddCategoryMode(true);
  };

  const disableAddCategoryMode = () => {
    setIsAddCategoryMode(false);
  };

  return (
    <Col span={span} className="column">
      <div className="column-header" />
      <Skeleton
        loading={loadingCategories || !categories?.length}
        active
        round
        className="categories-skeleton"
      >
        <div className="column-categories">
          {categories.map((category: ICategory) => (
            <Category
              category={category}
              deleteCategoryHandler={handleCategoryDelete}
              key={category.id}
            />
          ))}
        </div>
      </Skeleton>
      {!isAddCategoryMode ? (
        <Button
          onClick={enableAddCategoryMode}
          type="link"
          icon={<PlusCircleOutlined />}
          className="column-btn-enable-add-category"
        >
          New Category
        </Button>
      ) : (
        <SingleInputForm
          placeholder="Create a new category"
          formSubmitHandler={handleCategoryFormSubmit}
          abortHandler={disableAddCategoryMode}
          layout="vertical"
        />
      )}
    </Col>
  );
};

export default Column;
