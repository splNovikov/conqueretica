import React from 'react';
import { shallow } from 'enzyme';
// Components
import Tab from './Tab';
// Test Data
import { tabs } from '../../__test_data__';

describe('Tab', () => {
  it('Tab Component is rendering', () => {
    shallow(
      <Tab tab={tabs[0]} selectedTab={tabs[0]} selectTabHandler={() => {}} />,
    );
  });

  // todo: tests
});
