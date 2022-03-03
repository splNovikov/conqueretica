import React from 'react';
import { shallow } from 'enzyme';
// Components
import Columns from './Columns';
// Test Data
import { columns } from '../../__test_data__';

describe('Columns', () => {
  it('Columns Component is rendering', () => {
    const wrapper = shallow(
      <Columns
        columns={columns}
        createColumnHandler={() => {}}
        deleteColumnHandler={() => {}}
        categoryFormSubmitHandler={() => {}}
        deleteCategoryHandler={() => {}}
      />,
    );
    expect(wrapper.hasClass('columns')).toEqual(true);
  });

  it('Columns Component is rendering necessary elements', () => {
    const wrapper = shallow(
      <Columns
        columns={columns}
        createColumnHandler={() => {}}
        deleteColumnHandler={() => {}}
        categoryFormSubmitHandler={() => {}}
        deleteCategoryHandler={() => {}}
      />,
    );

    const categoriesEl = wrapper.find('Column');
    expect(categoriesEl.length).toBe(2);

    const buttonEl = wrapper.find('button');
    expect(buttonEl.exists()).toBeTruthy();
  });

  it('Columns Component "Delete Column" button should invoke "Delete Column" method', () => {
    const handleCreateColumn = jest.fn();
    const wrapper = shallow(
      <Columns
        columns={columns}
        createColumnHandler={handleCreateColumn}
        deleteColumnHandler={() => {}}
        categoryFormSubmitHandler={() => {}}
        deleteCategoryHandler={() => {}}
      />,
    );

    const buttonEl = wrapper.find('button');

    buttonEl.simulate('click');

    expect(handleCreateColumn).toHaveBeenCalled();
  });
});
