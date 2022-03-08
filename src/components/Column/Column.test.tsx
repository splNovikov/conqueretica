import React from 'react';
import { shallow } from 'enzyme';
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
    const wrapper = shallow(
      <Column
        column={columns[0]}
        deleteColumnHandler={() => 1}
        categoryFormSubmitHandler={() => 1}
        deleteCategoryHandler={() => 1}
        createLinkHandler={() => 1}
      />,
    );

    const buttonEl = wrapper.find('button');
    expect(buttonEl.exists()).toBeTruthy();

    const addFormEl = wrapper.find('AddForm');
    expect(addFormEl.exists()).toBeTruthy();

    const categoriesEl = wrapper.find('Category');
    expect(categoriesEl.length).toBe(2);
  });

  it('Column Component "Delete Column" button should invoke "Delete Column" method', () => {
    const handleDeleteColumn = jest.fn();
    const wrapper = shallow(
      <Column
        column={columns[0]}
        deleteColumnHandler={handleDeleteColumn}
        categoryFormSubmitHandler={() => 1}
        deleteCategoryHandler={() => 1}
        createLinkHandler={() => 1}
      />,
    );

    const buttonEl = wrapper.find('button');

    buttonEl.simulate('click');

    expect(handleDeleteColumn).toHaveBeenCalledWith(columns[0]);
  });
});
