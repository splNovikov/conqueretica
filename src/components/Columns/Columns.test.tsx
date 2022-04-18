import React from 'react';
import { mount, shallow } from 'enzyme';
// Components
import Columns from './Columns';
// Test Data
import { columns, tabs } from '../../__test_data__';

describe('Columns', () => {
  it('Columns Component is rendering', () => {
    const wrapper = shallow(
      <Columns
        columns={columns}
        createColumnHandler={() => 1}
        deleteColumnHandler={() => 1}
        categoryFormSubmitHandler={() => 1}
        deleteCategoryHandler={() => 1}
        createLinkHandler={() => 1}
        updateLinkHandler={() => 1}
        deleteLinkHandler={() => 1}
      />,
    );
    expect(wrapper.hasClass('columns')).toEqual(true);
  });

  it('Columns Component is rendering necessary elements', () => {
    const wrapper = mount(
      <Columns
        columns={columns}
        selectedTab={tabs[0]}
        createColumnHandler={() => 1}
        deleteColumnHandler={() => 1}
        categoryFormSubmitHandler={() => 1}
        deleteCategoryHandler={() => 1}
        createLinkHandler={() => 1}
        updateLinkHandler={() => 1}
        deleteLinkHandler={() => 1}
      />,
    );

    const categoriesEl = wrapper.find('Column');
    expect(categoriesEl.length).toBe(2);

    const buttonEl = wrapper.find('button.columns-btn-add-new-column');
    expect(buttonEl.exists()).toBeTruthy();
  });

  it('Columns Component "Create Column" button should invoke "Create Column" method', () => {
    const handleCreateColumn = jest.fn();
    const wrapper = mount(
      <Columns
        columns={columns}
        selectedTab={tabs[0]}
        createColumnHandler={handleCreateColumn}
        deleteColumnHandler={() => 1}
        categoryFormSubmitHandler={() => 1}
        deleteCategoryHandler={() => 1}
        createLinkHandler={() => 1}
        updateLinkHandler={() => 1}
        deleteLinkHandler={() => 1}
      />,
    );

    const buttonEl = wrapper.find('button.columns-btn-add-new-column');

    buttonEl.simulate('click');

    expect(handleCreateColumn).toHaveBeenCalled();
  });
});
