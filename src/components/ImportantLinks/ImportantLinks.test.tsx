import React from 'react';
import { shallow } from 'enzyme';

import ImportantLinks from './ImportantLinks';

import { ILink } from '../../interfaces';

const importantLinks: ILink[] = [
  {
    id: 'link-1',
    title: 'ST sync',
    href: 'https://docs.google.com/spreadsheets/d/1b9...',
  },
  {
    id: 'link-2',
    title: 'Team',
    href: 'https://docs.google.com/spreadsheets/d/1pt...',
  },
];

it('ImportantLinks is rendering', () => {
  const wrapper = shallow(<ImportantLinks links={importantLinks} />);
  expect(wrapper.hasClass('important-links')).toEqual(true);
});

// todo: add more tests
