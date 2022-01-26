import React from 'react';
import { shallow } from 'enzyme';
// Interfaces
import { IDaily } from '../../interfaces';
// Components
import DailyCard from './DailyCard';
// Test Data
import { dailies } from '../../__test_data__';

const daily: IDaily = dailies[0];

it('DailyCard is rendering', () => {
  const wrapper = shallow(<DailyCard daily={daily} />);
  expect(wrapper.hasClass('daily-card')).toEqual(true);
});

describe('DailyCard should has correct rendered daily fields', () => {
  it('Should have "text" property displayed', () => {
    const wrapper = shallow(<DailyCard daily={daily} />);
    const el = wrapper.find('.daily-card-title');

    expect(el.text()).toEqual('Daily Task 1');
  });

  it('Should have "createdAt" property displayed', () => {
    const wrapper = shallow(<DailyCard daily={daily} />);
    const el = wrapper.find('.daily-created-at');

    expect(el.text()).toEqual('Created At: 01/10/2021');
  });

  it('Should have "notes" property displayed', () => {
    const wrapper = shallow(<DailyCard daily={daily} />);
    const el = wrapper.find('.daily-notes');

    expect(el.text()).toEqual('Notes: Daily Notes 1');
  });

  it('Should have "startDate" property displayed', () => {
    const wrapper = shallow(<DailyCard daily={daily} />);
    const el = wrapper.find('.daily-start-date');

    expect(el.text()).toEqual('Start Date: 01/10/2021');
  });

  it('Should have "type" property displayed', () => {
    const wrapper = shallow(<DailyCard daily={daily} />);
    const el = wrapper.find('.daily-type');

    expect(el.text()).toEqual('Type: daily');
  });

  it('Should have "frequency" property displayed', () => {
    const wrapper = shallow(<DailyCard daily={daily} />);
    const el = wrapper.find('.daily-frequency');

    expect(el.text()).toEqual('Frequency: weekly');
  });

  it('Should have "streak" property displayed', () => {
    const wrapper = shallow(<DailyCard daily={daily} />);
    const el = wrapper.find('.daily-streak');

    expect(el.text()).toEqual('Streak: 5');
  });
});
