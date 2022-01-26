import React from 'react';
import { UserInfo } from 'firebase/auth';
import { shallow } from 'enzyme';

import Messages from './Messages';

it('Messages is rendering', () => {
  // todo: figure out how can we mock Firestore request
  // const wrapper = shallow(<Messages user={user} />);
  // expect(wrapper.hasClass('messages')).toEqual(true);
});
