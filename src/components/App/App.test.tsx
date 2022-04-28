import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
import * as authHooks from 'react-firebase-hooks/auth';
import { act } from 'react-dom/test-utils';
// Components
import App from './App';
// Test Data
import { user } from '../../__test_data__';

describe('App Component', () => {
  const appSelector = 'section.app';
  const appHeaderSelector = 'header.app-header';
  const appContentSelector = 'main.app-content-wrapper';
  const appFooter = 'footer.app-footer';
  let wrapper: ReactWrapper;
  let app: ReactWrapper;
  let header: ReactWrapper;
  let content: ReactWrapper;
  let footer: ReactWrapper;

  beforeEach(async () => {
    jest
      .spyOn(authHooks, 'useAuthState')
      // @ts-ignore
      .mockImplementation(() => [user]);

    await act(async () => {
      wrapper = mount(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );
    });

    app = wrapper.find(appSelector);
    header = wrapper.find(appHeaderSelector);
    content = wrapper.find(appContentSelector);
    footer = wrapper.find(appFooter);
  });

  afterEach(() => {
    jest.resetAllMocks();
    wrapper.unmount();
  });

  it('App is rendering', () => {
    expect(wrapper.exists()).toEqual(true);
    expect(app.exists()).toEqual(true);
    expect(header.exists()).toEqual(true);
    expect(content.exists()).toEqual(true);
    expect(footer.exists()).toEqual(true);
  });
});
