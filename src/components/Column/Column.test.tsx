import React from 'react';
import { mount, shallow } from 'enzyme';
// Components
import Column from './Column';
// Test Data
import { columns } from '../../__test_data__';

describe('Column', () => {
  it('Column Component is rendering', () => {
    const wrapper = shallow(
      <Column
        column={columns[0]}
        deleteColumnHandler={() => 1}
        categoryFormSubmitHandler={() => 1}
        deleteCategoryHandler={() => 1}
        createLinkHandler={() => 1}
      />,
    );
    expect(wrapper.hasClass('column')).toEqual(true);
  });

  it('Column Component is rendering necessary elements', () => {
    const wrapper = mount(
      <Column
        column={columns[0]}
        deleteColumnHandler={() => 1}
        categoryFormSubmitHandler={() => 1}
        deleteCategoryHandler={() => 1}
        createLinkHandler={() => 1}
      />,
    );

    const deleteColEl = wrapper.find('button.btn-delete-column');
    expect(deleteColEl.exists()).toBeTruthy();

    const addFormEl = wrapper.find('AddForm');
    expect(addFormEl.exists()).toBeTruthy();

    const categoriesEl = wrapper.find('Category');
    expect(categoriesEl.length).toBe(2);
  });

  it('Column Component "Delete Column" button should invoke "Delete Column" method', () => {
    const handleDeleteColumn = jest.fn();
    const wrapper = mount(
      <Column
        column={columns[0]}
        deleteColumnHandler={handleDeleteColumn}
        categoryFormSubmitHandler={() => 1}
        deleteCategoryHandler={() => 1}
        createLinkHandler={() => 1}
      />,
    );

    // modal is closed
    const modalEl = wrapper.find('.ant-modal-root');
    expect(modalEl.exists()).toBe(false);

    // trigger delete icon to show modal
    const deleteColEl = wrapper.find('button.btn-delete-column');
    deleteColEl.simulate('click');

    // modal appeared
    const modalEl2 = wrapper.find('.ant-modal-root .ant-modal-wrap');
    expect(modalEl2.exists()).toBe(true);
    expect(modalEl2.prop('style')).not.toHaveProperty('display', 'none');

    // modal contains OK button
    const modalFooterEl = modalEl2.find('.ant-modal-footer');
    const confirmBtnEl = modalFooterEl.findWhere(
      (node) => node.type() === 'button' && node.text() === 'OK',
    );
    expect(confirmBtnEl.exists()).toBeTruthy();

    // click OK button
    confirmBtnEl.simulate('click');

    // expect calling delete function
    expect(handleDeleteColumn).toHaveBeenCalledWith(columns[0]);

    // modal is closed
    const modalEl3 = wrapper.find('.ant-modal-root .ant-modal-wrap');
    expect(modalEl3.exists()).toBe(true);
    expect(modalEl3.prop('style')).toHaveProperty('display', 'none');
  });

  it('Column Component - There is an ability to hide Confirmation Modal by clicking on Cancel Button', () => {
    const handleDeleteColumn = jest.fn();
    const wrapper = mount(
      <Column
        column={columns[0]}
        deleteColumnHandler={handleDeleteColumn}
        categoryFormSubmitHandler={() => 1}
        deleteCategoryHandler={() => 1}
        createLinkHandler={() => 1}
      />,
    );

    // modal is closed
    const modalEl = wrapper.find('.ant-modal-root');
    expect(modalEl.exists()).toBe(false);

    // trigger delete icon to show modal
    const deleteColEl = wrapper.find('button.btn-delete-column');
    deleteColEl.simulate('click');

    // modal appeared
    const modalEl2 = wrapper.find('.ant-modal-root .ant-modal-wrap');
    expect(modalEl2.exists()).toBe(true);
    expect(modalEl2.prop('style')).not.toHaveProperty('display', 'none');

    // modal contains OK button
    const modalFooterEl = modalEl2.find('.ant-modal-footer');
    const cancelBtnEl = modalFooterEl.findWhere(
      (node) => node.type() === 'button' && node.text() === 'Cancel',
    );
    expect(cancelBtnEl.exists()).toBeTruthy();

    // click OK button
    cancelBtnEl.simulate('click');

    // expect NOT calling delete function
    expect(handleDeleteColumn).toHaveBeenCalledTimes(0);

    // modal is closed
    const modalEl3 = wrapper.find('.ant-modal-root .ant-modal-wrap');
    expect(modalEl3.exists()).toBe(true);
    expect(modalEl3.prop('style')).toHaveProperty('display', 'none');
  });
});
