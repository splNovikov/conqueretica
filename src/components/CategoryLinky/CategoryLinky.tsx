import React, { FC, useRef, useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
// Interfaces
import { ILink } from '../../interfaces';
// Components
import Linky from '../Linky';
import LinkForm from '../LinkForm';
// Utils
import { deltaSeconds, getDeltaSecondsClassName } from '../../utils';
// Styles
import './CategoryLinky.scss';

const CategoryLinky: FC<{
  link: ILink;
  updateLinkLastUsedHandler: (link: ILink) => void;
  formSubmitHandler: (title: string, href: string, link: ILink) => void;
  deleteLinkHandler: (link: ILink) => void;
}> = ({
  link,
  updateLinkLastUsedHandler,
  formSubmitHandler,
  deleteLinkHandler,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  // in case when we are trying to turn off editMode by clicking on Trigger - it would not be clicked because of
  // outside-click handlers. That is why we should put this element in "outsideClickIgnoreElement" to make us able to
  // turn off edit mode:
  const editTriggerRef = useRef<HTMLElement>(null);
  const deleteCategoryLayerRef = useRef<HTMLElement>(null);
  const lastUsedDeltaSeconds = deltaSeconds(link.lastUsed);
  const [linkFormErrors, setLinkFormErrors] = useState(0);
  const [isDeleteConfirmationDisplayed, setDeleteConfirmationDisplayed] =
    useState(false);

  const handleDelete = () => {
    enableDeleteMode();
  };

  const handleCancelDelete = () => {
    disableDeleteMode();
  };

  const handleDeleteConfirmed = () => {
    deleteLinkHandler(link);
  };

  const enableDeleteMode = () => {
    setDeleteConfirmationDisplayed(true);
  };

  const disableDeleteMode = () => {
    setDeleteConfirmationDisplayed(false);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const disableEditMode = () => {
    setIsEditMode(false);
  };

  const abortHandler = () => {
    disableDeleteMode();
    disableEditMode();
  };

  const handleSubmit = (title: string, href: string) => {
    if (title !== link.title || href !== link.href) {
      formSubmitHandler(title, href, link);
    }
    disableEditMode();
  };

  const handleLinkFormErrors = (count: number) => {
    setLinkFormErrors(count);
  };

  return (
    <div className="category-linky">
      {isDeleteConfirmationDisplayed ? (
        <div
          className="category-linky-delete-confirmation"
          ref={deleteCategoryLayerRef as React.RefObject<HTMLDivElement>}
        >
          <div>Confirm Delete Link:</div>
          <Linky
            link={link}
            ellipsis
            iconSize="xx-small"
            updateLinkLastUsedHandler={updateLinkLastUsedHandler}
          />
          <div className="category-linky-delete-confirmation-footer">
            <Button
              type="primary"
              size="small"
              onClick={handleDeleteConfirmed}
              className="category-linky-delete-confirmation-btn-confirm"
            >
              Confirm
            </Button>
            <Button
              size="small"
              onClick={handleCancelDelete}
              className="category-linky-delete-confirmation-btn-cancel"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : null}
      <div
        className={classNames(
          'category-linky-title-wrapper',
          getDeltaSecondsClassName(lastUsedDeltaSeconds),
        )}
      >
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
        <Linky
          link={link}
          ellipsis
          iconSize="xx-small"
          updateLinkLastUsedHandler={updateLinkLastUsedHandler}
        />
      </div>

      <div
        className={classNames(
          'category-linky-form-wrapper',
          `link-form-errors-${linkFormErrors}`,
          {
            'category-linky-form-wrapper-expand': isEditMode,
          },
        )}
      >
        {isEditMode && (
          <LinkForm
            outsideClickIgnoreElements={[
              editTriggerRef,
              deleteCategoryLayerRef,
            ]}
            href={link.href}
            title={link.title}
            formSubmitHandler={handleSubmit}
            abortHandler={abortHandler}
            deleteHandler={handleDelete}
            formErrorsHandler={handleLinkFormErrors}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryLinky;
