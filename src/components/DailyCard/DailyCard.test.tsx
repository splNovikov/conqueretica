import React from 'react';
import { shallow } from 'enzyme';
// Interfaces
import { IDaily } from '../../interfaces';
// Components
import DailyCard from './DailyCard';

const daily = {
  id: '9ee3aff6-0cf5-4656-b02e-f2eb60f51077',
  text: 'Daily Test',
  createdAt: '2021-10-01T13:13:45.115Z',
  notes: 'Daily Notes',
  startDate: '2021-09-30T21:00:00.000Z',
  type: 'daily',
  frequency: 'weekly',
  streak: 5,
};

it('DailyCard is rendering', () => {
  const wrapper = shallow(<DailyCard daily={daily as IDaily} />);
  expect(wrapper.hasClass('daily-card')).toEqual(true);
});

describe('DailyCard should has correct rendered daily fields', () => {
  it('Should have "text" property displayed', () => {
    const wrapper = shallow(<DailyCard daily={daily as IDaily} />);
    const el = wrapper.find('.daily-card-title');

    expect(el.text()).toEqual('Daily Test');
  });

  it('Should have "createdAt" property displayed', () => {
    const wrapper = shallow(<DailyCard daily={daily as IDaily} />);
    const el = wrapper.find('.daily-created-at');

    expect(el.text()).toEqual('Created At: 01/10/2021');
  });

  it('Should have "notes" property displayed', () => {
    const wrapper = shallow(<DailyCard daily={daily as IDaily} />);
    const el = wrapper.find('.daily-notes');

    expect(el.text()).toEqual('Notes: Daily Notes');
  });

  it('Should have "startDate" property displayed', () => {
    const wrapper = shallow(<DailyCard daily={daily as IDaily} />);
    const el = wrapper.find('.daily-start-date');

    expect(el.text()).toEqual('Start Date: 01/10/2021');
  });

  it('Should have "type" property displayed', () => {
    const wrapper = shallow(<DailyCard daily={daily as IDaily} />);
    const el = wrapper.find('.daily-type');

    expect(el.text()).toEqual('Type: daily');
  });

  it('Should have "frequency" property displayed', () => {
    const wrapper = shallow(<DailyCard daily={daily as IDaily} />);
    const el = wrapper.find('.daily-frequency');

    expect(el.text()).toEqual('Frequency: weekly');
  });

  it('Should have "streak" property displayed', () => {
    const wrapper = shallow(<DailyCard daily={daily as IDaily} />);
    const el = wrapper.find('.daily-streak');

    expect(el.text()).toEqual('Streak: 5');
  });
});
