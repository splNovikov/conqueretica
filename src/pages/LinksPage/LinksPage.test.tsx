import React from 'react';
import { shallow } from 'enzyme';
import LinksPage from './LinksPage';

it('LinksPage is rendering', () => {
  const wrapper = shallow(<LinksPage />);
  expect(wrapper.hasClass('links-page')).toEqual(true);

  const imLinksElement = wrapper.find('ImportantLinks');
  expect(imLinksElement.exists()).toEqual(true);
});

// todo: figure out how can we set state for pure function
// describe('LinksPage - Messages should be rendered', () => {
//   it('Messages should be rendered when user is in state', () => {
//     const wrapper = mount(<LinksPage />);
//     const messagesElement = wrapper.find('Messages');
//     expect(messagesElement.exists()).toEqual(true);
//   });
// });
