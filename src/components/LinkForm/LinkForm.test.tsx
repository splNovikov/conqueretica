import React from 'react';
import { shallow } from 'enzyme';
// Components
import LinkForm from './LinkForm';
// Test Data

// todo: tests
it('LinkForm is rendering', () => {
  const wrapper = shallow(
    <LinkForm formSubmitHandler={() => 1} abortHandler={() => 1} />,
  );
  expect(wrapper.childAt(0).hasClass('link-form')).toBe(true);
});
