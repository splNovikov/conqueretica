import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import * as firestoreHooks from 'react-firebase-hooks/firestore';
// Firebase
import firebase from '../../firebase';
// Components
import Columns from './Columns';
import Column from '../Column';
import ColumnsAddCategory from '../ColumnsAddCategory';
// Test Data
import { categories, columns, tabs } from '../../__test_data__';

describe('Columns Component', () => {
  const origConsoleError = console.error;
  // Test Data
  const tab = tabs[0];
  // Wrappers
  let wrapper: ReactWrapper;
  let columnWrappers: ReactWrapper<any>;
  let columnsAddCategoryWrapper: ReactWrapper<any>;

  beforeEach(() => {
    console.error = jest.fn();
    jest
      .spyOn(firestoreHooks, 'useCollectionData')
      // @ts-ignore
      .mockImplementation((query) => {
        if (!query) {
          return [];
        }

        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle
        const dataType = query._query.path.segments[0];

        if (dataType === 'columns') {
          return [columns, false, undefined];
        }

        if (dataType === 'categories') {
          return [categories, false, undefined];
        }

        return [];
      });

    wrapper = mount(<Columns selectedTab={tab} />);
    columnWrappers = wrapper.find(Column);
    columnsAddCategoryWrapper = wrapper.find(ColumnsAddCategory);
  });

  afterEach(() => {
    jest.resetAllMocks();
    console.error = origConsoleError;
    wrapper.unmount();
  });

  it('Columns Component is rendering', () => {
    expect(wrapper.exists()).toBe(true);
    expect(columnWrappers.length).toBe(2);
    expect(columnsAddCategoryWrapper.exists()).toBe(true);
  });

  it('Columns Component -> ColumnsAddCategory should not be shown', () => {
    // @ts-ignore
    wrapper = mount(<Columns selectedTab={undefined} />);

    const columnsAddCategoryWrapper2 = wrapper.find(ColumnsAddCategory);

    expect(columnsAddCategoryWrapper2.exists()).toBe(false);
  });

  it('Columns Component is handling errors when columns are not loading', () => {
    jest.resetAllMocks();
    jest
      .spyOn(firestoreHooks, 'useCollectionData')
      // @ts-ignore
      .mockImplementation(() => [[], false, { message: 'err' }]);

    wrapper.unmount();
    wrapper = mount(<Columns selectedTab={tab} />);

    expect(console.error).toHaveBeenCalledWith({ message: 'err' });
  });

  describe('Columns Component Handlers', () => {
    it('Should invoke "Add Category Scenario Handler"', () => {
      firebase.addCategoryWithColumnScenario = jest.fn();

      const addCategoryScenarioHandler = columnsAddCategoryWrapper.prop(
        'addCategoryScenarioHandler',
      );

      addCategoryScenarioHandler &&
        addCategoryScenarioHandler('category-title');

      expect(firebase.addCategoryWithColumnScenario).toHaveBeenCalledWith(
        'category-title',
        tab,
      );
    });
  });
});
