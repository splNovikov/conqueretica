import React from 'react';
import { shallow } from 'enzyme';
// Components
import Columns from './Columns';
// Test Data
import { columns } from '../../__test_data__';

describe('Columns', () => {
  it('Columns Component is rendering', () => {
    shallow(
      <Columns
        columns={columns}
        createColumnHandler={() => {}}
        deleteColumnHandler={() => {}}
      />,
    );
  });
  // todo: more tests
});
