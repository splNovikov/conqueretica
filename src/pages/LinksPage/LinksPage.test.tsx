import React from 'react';
import { shallow } from 'enzyme';
// Components
import LinksPage from './LinksPage';
import LinksPageView from './LinksPageView';
// Test Data
import { columns, importantLinks } from './testDataLinks';
import { user } from '../../__test_data__';

it('LinksPage is rendering', () => {
  shallow(<LinksPage />);
});

describe('LinksPageView - Messages should be rendered', () => {
  it('Messages should be rendered when user is in state', () => {
    const wrapper = shallow(
      <LinksPageView
        user={user}
        importantLinks={importantLinks}
        columns={columns}
      />,
    );
    const messagesElement = wrapper.find('Messages');
    expect(messagesElement.exists()).toEqual(true);
  });
});
