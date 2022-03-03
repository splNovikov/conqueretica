import React from 'react';
import { shallow } from 'enzyme';
// Components
import AddLinkForm from './AddLinkForm';

describe('Add Link Form', () => {
  it('AddLinkForm is rendering', () => {
    shallow(<AddLinkForm />);
  });
  // todo: more tests
});
