import React from 'react';
import { shallow } from 'enzyme';
// Components
import Column from './Column';
// Test Data
import { columns } from '../../__test_data__';

describe('Column', () => {
  it('Column Component is rendering', () => {
    shallow(<Column column={columns[0]} deleteColumnHandler={() => {}} />);
  });
  // todo: more tests
});
