import React, { FC, useState } from 'react';
import { Button, Col, Modal, Tooltip } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
// Interfaces
import { ICategory, IColumn } from '../../interfaces';
// Components
import Category from '../Category';
import SingleInputForm from '../SingleInputForm';
// Styles
import './Column.scss';

const Column: FC<{
  column: IColumn;
  span: number;
  deleteColumnHandler: (val: IColumn) => void;
  categoryFormSubmitHandler: (value: string, column: IColumn) => void;
  deleteCategoryHandler: (category: ICategory, column: IColumn) => void;
  createLinkHandler: (
    title: string,
    href: string,
    category: ICategory,
    column: IColumn,
  ) => void;
}> = ({
  column,
  span,
  deleteColumnHandler,
  categoryFormSubmitHandler,
  deleteCategoryHandler,
  createLinkHandler,
}) => {
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isAddCategoryMode, setIsAddCategoryMode] = useState(false);

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

  const handleCategoryFormSubmit = (value: string) => {
    categoryFormSubmitHandler(value, column);
    disableAddCategoryMode();
  };

  const handleCategoryDelete = (category: ICategory) =>
    deleteCategoryHandler(category, column);

  const handleLinkCreate = (title: string, href: string, category: ICategory) =>
    createLinkHandler(title, href, category, column);

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
        {column.categories.map((category: ICategory) => (
          <Category
            category={category}
            deleteCategoryHandler={handleCategoryDelete}
            key={category.id}
            createLinkHandler={handleLinkCreate}
          />
        ))}
      </div>
      {!isAddCategoryMode ? (
        <Button
          onClick={enableAddCategoryMode}
          type="link"
          icon={<PlusCircleOutlined />}
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
