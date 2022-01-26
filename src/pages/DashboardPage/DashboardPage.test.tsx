import React from 'react';
import { shallow } from 'enzyme';
// Components
import DashboardPage from './DashboardPage';
import DashboardPageView from './DashboardPageView';
// Test Data
import { dailies } from '../../__test_data__';

it('DashboardPage is rendering', () => {
  shallow(<DashboardPage />);
});

describe('DashboardPageView - Dailies should be rendered', () => {
  it('Should render dailies if dailies passed', () => {
    const wrapper = shallow(<DashboardPageView dailies={dailies} />);
    const dailiesElements = wrapper.find('DailyCard');
    expect(dailiesElements.length).toBe(2);
  });

  it('Should render 0 dailies if passed dailies array is empty', () => {
    const wrapper = shallow(<DashboardPageView dailies={[]} />);
    const dailiesElements = wrapper.find('DailyCard');
    expect(dailiesElements.length).toBe(0);
  });

  it('Should render 0 dailies if passed dailies array is null', () => {
    const wrapper = shallow(<DashboardPageView dailies={null} />);
    const dailiesElements = wrapper.find('DailyCard');
    expect(dailiesElements.length).toBe(0);
  });
});
