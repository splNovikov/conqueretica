import React, { FC, useRef, useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
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
  formSubmitHandler: (title: string, href: string, link: ILink) => void;
  deleteLinkHandler: (link: ILink) => void;
}> = ({ link, formSubmitHandler, deleteLinkHandler }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  // in case when we are trying to turn off editMode by clicking on Trigger - it would not be clicked because of
  // outside-click handlers. That is why we should put this element in "outsideClickIgnoreElement" to make us able to
  // turn off edit mode:
  const editTriggerRef = useRef<HTMLElement>(null);

  const handleDelete = () => {
    deleteLinkHandler(link);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const disableEditMode = () => {
    setIsEditMode(false);
  };

  const abortHandler = () => disableEditMode();

  const handleSubmit = (title: string, href: string) => {
    if (title !== link.title || href !== link.href) {
      formSubmitHandler(title, href, link);
    }
    disableEditMode();
  };

  return (
    <div className="category-linky">
      <div className="category-linky-title-wrapper">
        <Button
          onClick={toggleEditMode}
          type="text"
          ref={editTriggerRef}
          icon={
            <CaretRightOutlined
              className="menu-trigger-icon"
              rotate={!isEditMode ? 0 : 90}
            />
          }
          className="linky-actions-menu-trigger"
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
            outsideClickIgnoreElement={editTriggerRef}
            href={link.href}
            title={link.title}
            formSubmitHandler={handleSubmit}
            abortHandler={abortHandler}
            deleteHandler={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryLinky;
