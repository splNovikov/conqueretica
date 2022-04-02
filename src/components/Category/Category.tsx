import React, { FC } from 'react';
import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Typography } from 'antd';
// Interfaces
import { ICategory, ILink } from '../../interfaces';
// Components
import Linky from '../Linky';
import AddLinkForm from '../AddLinkForm';
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
  const handleCategoryDelete = () => deleteCategoryHandler(category);

  const handleLinkCreate = (title: string, href: string) =>
    createLinkHandler(title, href, category);

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
            <Linky link={l} ellipsed iconSize="xx-small" />
          </div>
        ))}
      </div>
      <AddLinkForm createLinkHandler={handleLinkCreate} />
    </div>
  );
};

export default Category;
