import React from 'react';
import { shallow } from 'enzyme';

import AddForm from './AddForm';

it('AddForm is rendering', () => {
  const wrapper = shallow(<AddForm formSubmitHandler={() => 1} />);
  expect(wrapper.hasClass('send-form')).toEqual(true);
});
