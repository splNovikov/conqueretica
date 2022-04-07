import React, { FC, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Expand from 'react-expand-animated';
// Interfaces
import { ILink } from '../../interfaces';
// Components
import Linky from '../Linky';
import LinkForm from '../LinkForm';
// Styles
import './CategoryLinky.scss';

const CategoryLinky: FC<{
  link: ILink;
  formSubmitHandler: (title: string, href: string) => void;
}> = ({ link, formSubmitHandler }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const disableEditMode = () => {
    setIsEditMode(false);
  };

  const abortHandler = () => disableEditMode();

  const handleSubmit = (title: string, href: string) => {
    formSubmitHandler(title, href);
    disableEditMode();
  };

  return (
    <div className="category-linky">
      <div className="category-linky-title-wrapper">
        <Button
          type="text"
          size="small"
          icon={<EditOutlined />}
          className="category-linky-edit-trigger"
          onClick={toggleEditMode}
        />
        <Linky link={link} ellipsis iconSize="xx-small" />
      </div>
      <Expand
        open={isEditMode}
        duration={300}
        transitions={['height', 'opacity']}
      >
        <LinkForm
          link={link.href}
          title={link.title}
          formSubmitHandler={handleSubmit}
          abortHandler={abortHandler}
        />
      </Expand>
    </div>
  );
};

export default CategoryLinky;
