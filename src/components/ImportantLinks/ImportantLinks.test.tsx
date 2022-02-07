import React from 'react';
import { shallow } from 'enzyme';
// Components
import ImportantLinks from './ImportantLinks';
// Test Data
import { importantLinks } from '../../__test_data__';

it('ImportantLinks is rendering', () => {
  const wrapper = shallow(<ImportantLinks links={importantLinks} />);
  expect(wrapper.hasClass('important-links')).toEqual(true);
});

// todo: add more tests
