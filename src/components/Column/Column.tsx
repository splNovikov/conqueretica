import React, { FC, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Button, Col, Modal, Tooltip } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
// Firebase
import firebase from '../../firebase';
// Interfaces
import { ICategory, IColumn, ILink } from '../../interfaces';
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
  deleteColumnHandler: (val: IColumn) => void;
  createLinkHandler: (
    title: string,
    href: string,
    category: ICategory,
    column: IColumn,
  ) => void;
  updateLinkHandler: (
    title: string,
    href: string,
    link: ILink,
    category: ICategory,
    column: IColumn,
  ) => void;
  deleteLinkHandler: (
    link: ILink,
    category: ICategory,
    column: IColumn,
  ) => void;
}> = ({
  column,
  span,
  deleteColumnHandler,
  createLinkHandler,
  updateLinkHandler,
  deleteLinkHandler,
}) => {
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
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
    await firebase.deleteCategory(category);
  };

  const enableAddCategoryMode = () => {
    setIsAddCategoryMode(true);
  };

  const disableAddCategoryMode = () => {
    setIsAddCategoryMode(false);
  };

  // region Modal Confirm Delete
  const showConfirmModal = () => {
    setIsConfirmModalVisible(true);
  };

  const handleConfirmModalOk = () => {
    setIsConfirmModalVisible(false);
    deleteColumnHandler(column);
  };

  const handleConfirmModalCancel = () => {
    setIsConfirmModalVisible(false);
  };

  const handleColumnDelete = () => {
    showConfirmModal();
  };
  // endregion Modal

  const handleLinkCreate = (title: string, href: string, category: ICategory) =>
    createLinkHandler(title, href, category, column);

  const handleLinkUpdate = (
    title: string,
    href: string,
    link: ILink,
    category: ICategory,
  ) => updateLinkHandler(title, href, link, category, column);

  const handleDeleteLink = (link: ILink, category: ICategory) =>
    deleteLinkHandler(link, category, column);

  return (
    <Col span={span} className="column">
      <Modal
        title="Delete Column Confirmation"
        visible={isConfirmModalVisible}
        onOk={handleConfirmModalOk}
        onCancel={handleConfirmModalCancel}
      >
        <p>Are you sure you want to delete this column?</p>
        <p>
          This action will permanently delete all this columns contains and
          cannot be undone
        </p>
      </Modal>

      <div className="column-header">
        <Tooltip title="Delete Column">
          <Button
            shape="circle"
            size="small"
            icon={<DeleteOutlined />}
            onClick={handleColumnDelete}
            className="btn-delete-column"
          />
        </Tooltip>
      </div>
      <div className="column-categories">
        {categories.map((category: ICategory) => (
          <Category
            category={category}
            deleteCategoryHandler={handleCategoryDelete}
            key={category.id}
            createLinkHandler={handleLinkCreate}
            updateLinkHandler={handleLinkUpdate}
            deleteLinkHandler={handleDeleteLink}
          />
        ))}
      </div>
      {!isAddCategoryMode ? (
        <Button
          onClick={enableAddCategoryMode}
          type="link"
          icon={<PlusCircleOutlined />}
          className="btn-enable-add-category"
        >
          New Category
        </Button>
      ) : (
        <SingleInputForm
          placeholder="Create a new category"
          formSubmitHandler={handleCategoryFormSubmit}
          abortHandler={disableAddCategoryMode}
        />
      )}
    </Col>
  );
};

export default Column;
