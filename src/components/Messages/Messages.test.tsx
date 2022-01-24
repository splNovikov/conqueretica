import React from 'react';
import { User } from 'firebase/auth';
import { shallow } from 'enzyme';

import Messages from './Messages';

const user = {
  displayName: 'Pavel Novikov',
};

it('Messages is rendering', () => {
  // todo: figure out how can we mock Firestore request
  // const wrapper = shallow(<Messages user={user as User} />);
  // expect(wrapper.hasClass('messages')).toEqual(true);
});
