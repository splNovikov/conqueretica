import React from 'react';
import * as hooks from 'react-firebase-hooks/firestore';
import { mount } from 'enzyme';
// Components
import Tabs from './Tabs';

// todo: tests!!!
describe('Tabs', () => {
  it('Tabs Component is rendering', () => {
    jest
      .spyOn(hooks, 'useCollectionData')
      .mockImplementation(() => [[], false, undefined]);

    mount(<Tabs tabs={[]} />);
  });
});
