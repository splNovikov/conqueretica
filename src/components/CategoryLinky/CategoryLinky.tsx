import React, { FC, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
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
      <div
        className={classNames('category-linky-form-wrapper', {
          'category-linky-form-wrapper-expand': isEditMode,
        })}
      >
        {isEditMode && (
          <LinkForm
            link={link.href}
            title={link.title}
            formSubmitHandler={handleSubmit}
            abortHandler={abortHandler}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryLinky;
