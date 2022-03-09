import React, { FC, useState } from 'react';
import { Button, Col, Modal, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
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
  createLinkHandler: (
    title: string,
    href: string,
    category: ICategory,
    column: IColumn,
  ) => void;
}> = ({
  column,
  deleteColumnHandler,
  categoryFormSubmitHandler,
  deleteCategoryHandler,
  createLinkHandler,
}) => {
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

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

  const handleCategoryFormSubmit = (value: string) =>
    categoryFormSubmitHandler(value, column);

  const handleCategoryDelete = (category: ICategory) =>
    deleteCategoryHandler(category, column);

  const handleLinkCreate = (title: string, href: string, category: ICategory) =>
    createLinkHandler(title, href, category, column);

  return (
    <Col span={6} className="column">
      <Modal
        title="Delete Column Confirmation"
        visible={isConfirmModalVisible}
        onOk={handleConfirmModalOk}
        onCancel={handleConfirmModalCancel}
      >
        <p>Are you sure you want to delete this column?</p>
      </Modal>

      <div className="column-header">
        <Tooltip title="Delete Column">
          <Button
            shape="circle"
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
      <AddForm
        formSubmitHandler={handleCategoryFormSubmit}
        placeholder="create a new category"
      />
    </Col>
  );
};

export default Column;
