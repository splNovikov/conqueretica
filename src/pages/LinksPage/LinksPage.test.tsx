import React from 'react';
import { shallow } from 'enzyme';

import LinksPage from './LinksPage';

it('LinksPage is rendering', () => {
  const wrapper = shallow(<LinksPage />);
  expect(wrapper.hasClass('links-page')).toEqual(true);
});
