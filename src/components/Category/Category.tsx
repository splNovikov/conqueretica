import React, { FC, useState } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu, Modal, Typography } from 'antd';
// Firebase
import firebase from '../../firebase';
// Interfaces
import { ICategory, ILink } from '../../interfaces';
// Components
import CategoryLinky from '../CategoryLinky';
import LinkForm from '../LinkForm';
import SingleInputForm from '../SingleInputForm';
// Utils
import { defaultConfirmModal } from '../../utils';
// Constants
import maxCharacters from '../../constants/maxLengthCharacters';
// Styles
import './Category.scss';

const { Text } = Typography;

const actionsMenu = (
  category: ICategory,
  handleCategoryEdit: () => void,
  handleCategoryDelete: () => void,
) => (
  <Menu>
    <Menu.Item
      key="edit"
      onClick={handleCategoryEdit}
      className="category-actions-menu-edit-category"
    >
      <EditOutlined /> Edit Category
    </Menu.Item>
    <Menu.Item
      key="delete"
      onClick={handleCategoryDelete}
      className="category-actions-menu-delete-category"
    >
      <DeleteOutlined /> Delete Category
    </Menu.Item>
  </Menu>
);

const Category: FC<{
  category: ICategory;
  deleteCategoryHandler: (val: ICategory) => void;
}> = ({ category, deleteCategoryHandler }) => {
  const [isEditCategoryMode, setIsEditCategoryMode] = useState(false);
  const [isAddLinkMode, setIsAddLinkMode] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  // region Modal Confirm Delete
  const { showConfirmModal, handleConfirmModalOk, handleConfirmModalCancel } =
    defaultConfirmModal(setIsConfirmModalVisible, () =>
      deleteCategoryHandler(category),
    );

  const handleCategoryDelete = () => {
    showConfirmModal();
  };
  // endregion Modal

  // Category:

  const handleCategoryEdit = () => {
    enableEditCategoryMode();
  };

  const enableEditCategoryMode = () => {
    setIsEditCategoryMode(true);
  };

  const disableEditCategoryMode = () => {
    setIsEditCategoryMode(false);
  };

  const enableAddLinkMode = () => {
    setIsAddLinkMode(true);
  };

  const handleCategoryFormSubmit = async (title: string) => {
    disableEditCategoryMode();
    await firebase.updateCategory(category, title);
  };

  // Links:

  const disableAddLinkMode = () => {
    setIsAddLinkMode(false);
  };

  const handleLinkCreate = async (title: string, href: string) => {
    disableAddLinkMode();
    await firebase.addLink(title, href, category);
  };

  const handleLinkUpdate = async (title: string, href: string, link: ILink) => {
    await firebase.updateLink(title, href, link, category);
  };

  const handleDeleteLink = async (link: ILink) => {
    await firebase.deleteLink(link, category);
  };

  return (
    <div className="category">
      <Modal
        title="Delete Category Confirmation"
        visible={isConfirmModalVisible}
        onOk={handleConfirmModalOk}
        onCancel={handleConfirmModalCancel}
        forceRender
      >
        <p>
          Are you sure you want to delete category &quot;{category.title}&quot;?
        </p>
        <p>
          This action will permanently delete all this category contains and
          cannot be undone
        </p>
      </Modal>
      {!isEditCategoryMode ? (
        <div className="category-header">
          <Text className="category-title" strong>
            {category.title}
          </Text>
          <Dropdown
            key="actions"
            overlay={actionsMenu(
              category,
              handleCategoryEdit,
              handleCategoryDelete,
            )}
            placement="bottomRight"
            trigger={['click']}
            arrow
          >
            <Button
              type="text"
              icon={<MoreOutlined />}
              className="category-actions-menu-trigger"
            />
          </Dropdown>
        </div>
      ) : (
        <SingleInputForm
          value={category.title}
          placeholder="Edit category"
          formSubmitHandler={handleCategoryFormSubmit}
          abortHandler={disableEditCategoryMode}
          layout="vertical"
          maxCharacters={maxCharacters.categoryTitle}
        />
      )}

      <div className="category-links">
        {category.links.map((l: ILink) => (
          <CategoryLinky
            key={l.id}
            link={l}
            formSubmitHandler={handleLinkUpdate}
            deleteLinkHandler={handleDeleteLink}
          />
        ))}
      </div>
      {!isAddLinkMode ? (
        <Button
          onClick={enableAddLinkMode}
          type="link"
          icon={<PlusCircleOutlined />}
          className="category-btn-enable-add-link"
        >
          New Link
        </Button>
      ) : (
        <LinkForm
          formSubmitHandler={handleLinkCreate}
          abortHandler={disableAddLinkMode}
        />
      )}
    </div>
  );
};

export default Category;
