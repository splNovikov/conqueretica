import { Timestamp } from 'firebase/firestore';

import { deltaSeconds, deltaHumanTime } from './deltaTime';

describe('Delta Seconds', () => {
  const date = { seconds: 1653305669 } as Timestamp; // 23 May 2022
  const today = new Date('2022-05-24 15:00'); // 24 May 2022

  it('Should return Seconds', () => {
    expect(deltaSeconds(date, today)).toBe(87931);
  });

  it('Should return undefined when date is not passed', () => {
    expect(deltaSeconds()).toBe(undefined);
  });
});

describe('Time Ago Human String', () => {
  const minute = 60;

  it('Should return Less A Minute', () => {
    expect(deltaHumanTime(minute - 1)).toBe('less then a minute');
  });

  it('Should return Minutes', () => {
    expect(deltaHumanTime(minute + 1)).toBe('1 minute');
  });

  it('Should return Minutes - 2', () => {
    expect(deltaHumanTime(minute * 10 + minute - 1)).toBe('10 minutes');
  });

  it('Should return Minutes - 3', () => {
    expect(deltaHumanTime(minute * 10 + minute)).toBe('11 minutes');
  });

  const hour = minute * 60;

  it('Should return Hours', () => {
    expect(deltaHumanTime(hour)).toBe('1 hour');
  });

  it('Should return Hours - 2', () => {
    expect(deltaHumanTime(hour + hour - 1)).toBe('1 hour');
  });

  it('Should return Hours - 3', () => {
    expect(deltaHumanTime(hour * 2)).toBe('2 hours');
  });

  const day = hour * 24;

  it('Should return Hours - 4', () => {
    expect(deltaHumanTime(day - 1)).toBe('23 hours');
  });

  it('Should return Days', () => {
    expect(deltaHumanTime(day)).toBe('1 day');
  });

  it('Should return Days - 2', () => {
    expect(deltaHumanTime(day + day - 1)).toBe('1 day');
  });

  it('Should return Days - 3', () => {
    expect(deltaHumanTime(day * 2)).toBe('2 days');
  });

  const week = day * 7;

  it('Should return Days - 4', () => {
    expect(deltaHumanTime(week - 1)).toBe('6 days');
  });

  it('Should return Weeks', () => {
    expect(deltaHumanTime(week)).toBe('1 week');
  });

  it('Should return Weeks - 2', () => {
    expect(deltaHumanTime(week + week - 1)).toBe('1 week');
  });

  it('Should return Weeks - 3', () => {
    expect(deltaHumanTime(week * 2)).toBe('2 weeks');
  });

  it('Should return Weeks - 4', () => {
    expect(deltaHumanTime(week * 4 + day * 2 - 1)).toBe('4 weeks');
  });

  const month = day * 30;

  it('Should return Weeks - 5', () => {
    expect(deltaHumanTime(month - 1)).toBe('4 weeks');
  });

  it('Should return Month', () => {
    expect(deltaHumanTime(month)).toBe('1 month');
  });

  it('Should return Month - 2', () => {
    expect(deltaHumanTime(month + month - 1)).toBe('1 month');
  });

  it('Should return Month - 3', () => {
    expect(deltaHumanTime(month * 2)).toBe('2 months');
  });

  it('Should return Month - 4', () => {
    expect(deltaHumanTime(month * 12 - 1)).toBe('11 months');
  });

  it('Should return Month - 5', () => {
    expect(deltaHumanTime(29547269)).toBe('11 months');
  });

  const year = day * 365;

  it('Should return Year', () => {
    expect(deltaHumanTime(year)).toBe('1 year');
  });

  it('Should return Year - 2', () => {
    expect(deltaHumanTime(year * 2)).toBe('2 years');
  });

  it('Should return Year - 3', () => {
    expect(deltaHumanTime(year * 10)).toBe('10 years');
  });

  it('Should Error Message when value is undefined', () => {
    expect(deltaHumanTime()).toBe(undefined);
  });

  it('Should Error Message when value is object', () => {
    expect(deltaHumanTime({})).toBe(undefined);
  });
});
