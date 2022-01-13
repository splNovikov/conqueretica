import React from 'react';
import { shallow } from 'enzyme';

import SendForm from './SendForm';

it('SendForm is rendering', () => {
  const wrapper = shallow(<SendForm />);
  expect(wrapper.hasClass('send-form')).toEqual(true);
});
