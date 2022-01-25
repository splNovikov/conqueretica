import React from 'react';
import { shallow } from 'enzyme';
import { User } from 'firebase/auth';
// Components
import LinksPage from './LinksPage';
import LinksPageView from './LinksPageView';
// test data
import { columns, importantLinks } from './testDataLinks';

it('LinksPage is rendering', () => {
  shallow(<LinksPage />);
});

describe('LinksPageView - Messages should be rendered', () => {
  const user = {
    displayName: 'Pavel Novikov',
  };

  it('Messages should be rendered when user is in state', () => {
    const wrapper = shallow(
      <LinksPageView
        user={user as User}
        importantLinks={importantLinks}
        columns={columns}
      />,
    );
    const messagesElement = wrapper.find('Messages');
    expect(messagesElement.exists()).toEqual(true);
  });
});
