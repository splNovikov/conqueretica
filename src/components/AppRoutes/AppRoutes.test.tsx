import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Navigate, Route } from 'react-router-dom';
// Components
import AppRoutes from './AppRoutes';
import LinksPage from '../../pages/LinksPage';
import DashboardPage from '../../pages/DashboardPage';

describe('AppRoutes Component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<AppRoutes />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('AppRoutes is rendering', () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it('Renders correct routes', () => {
    const pathMap = wrapper.find(Route).reduce((acc, route) => {
      const routeProps = route.props();
      return {
        ...acc,
        // @ts-ignore
        [routeProps.path]: routeProps.element,
      };
    }, {});

    // @ts-ignore
    expect(pathMap['*']).toEqual(<Navigate to="/links" />);
    // @ts-ignore
    expect(pathMap['/links']).toEqual(<LinksPage />);
    // @ts-ignore
    expect(pathMap['/dashboard']).toEqual(<DashboardPage />);
  });
});
