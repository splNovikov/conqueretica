import React, { FC, useState } from 'react';
import {
  DeleteOutlined,
  MoreOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu, Typography } from 'antd';
// Interfaces
import { ICategory, ILink } from '../../interfaces';
// Components
import Linky from '../Linky';
import LinkForm from '../LinkForm';
// Styles
import './Category.scss';

const { Text } = Typography;

const actionsMenu = (category: ICategory, handleCategoryDelete: () => void) => (
  <Menu>
    <Menu.Item
      key="delete"
      onClick={handleCategoryDelete}
      className="delete-category"
    >
      <DeleteOutlined /> Delete Category
    </Menu.Item>
  </Menu>
);

const Category: FC<{
  category: ICategory;
  deleteCategoryHandler: (val: ICategory) => void;
  createLinkHandler: (title: string, href: string, category: ICategory) => void;
}> = ({ category, deleteCategoryHandler, createLinkHandler }) => {
  const [isAddLinkMode, setIsAddLinkMode] = useState(false);

  const enableAddLinkMode = () => {
    setIsAddLinkMode(true);
  };

  const disableAddLinkMode = () => {
    setIsAddLinkMode(false);
  };

  const handleCategoryDelete = () => deleteCategoryHandler(category);

  const handleLinkCreate = (title: string, href: string) => {
    disableAddLinkMode();
    createLinkHandler(title, href, category);
  };

  return (
    <div className="category">
      <div className="category-header">
        <Text className="category-title" strong>
          {category.title}
        </Text>
        <Dropdown
          key="actions"
          overlay={actionsMenu(category, handleCategoryDelete)}
          placement="bottomRight"
          arrow
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
            className="category-actions-menu-trigger"
          />
        </Dropdown>
      </div>
      <div className="category-links">
        {category.links.map((l: ILink) => (
          <div key={l.id} className="linky-wrapper">
            <Linky link={l} ellipsis iconSize="xx-small" />
          </div>
        ))}
      </div>
      {!isAddLinkMode ? (
        <Button
          onClick={enableAddLinkMode}
          type="link"
          icon={<PlusCircleOutlined />}
          className="btn-enable-add-link"
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
