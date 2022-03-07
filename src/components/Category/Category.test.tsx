import React from 'react';
import { shallow } from 'enzyme';
// Components
import Category from './Category';
// Test Data
import { columns } from '../../__test_data__';

describe('Column', () => {
  it('Column Component is rendering', () => {
    shallow(
      <Category
        category={columns[0].categories[0]}
        deleteCategoryHandler={() => {}}
        createLinkHandler={() => {}}
      />,
    );
  });
  // todo: more tests
});
