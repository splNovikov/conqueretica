import React from 'react';
import { shallow } from 'enzyme';
// Components
import AddLinkForm from './AddLinkForm';

describe('Add Link Form', () => {
  it('Add Link Form is rendering', () => {
    const wrapper = shallow(<AddLinkForm createLinkHandler={() => {}} />);
    expect(wrapper.hasClass('toggle-form-display-button')).toEqual(true);
  });
  // todo: more tests
});
