import { Timestamp } from 'firebase/firestore';
import moment from 'moment';

const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 30;
const year = day * 365;

export const deltaSeconds = (
  date?: Timestamp | undefined,
  today: Date | undefined = new Date(),
): number | undefined => {
  if (!date) {
    return undefined;
  }

  const createdUTC = moment.unix(date.seconds);
  const todayUTC = moment.utc(today);

  return todayUTC.diff(createdUTC, 'seconds');
};

export const deltaHumanTime = (
  seconds: number | undefined,
): string | undefined => {
  if (!seconds || typeof seconds !== 'number') {
    return undefined;
  }

  if (seconds >= year) {
    const years = Math.floor(seconds / year);
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  }

  if (seconds >= month) {
    const months = Math.floor(seconds / month);
    return `${months} ${months === 1 ? 'month' : 'months'}`;
  }

  if (seconds >= week) {
    const weeks = Math.floor(seconds / week);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
  }

  if (seconds >= day) {
    const days = Math.floor(seconds / day);
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  }

  if (seconds >= hour) {
    const hours = Math.floor(seconds / hour);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }

  if (seconds >= minute) {
    const minutes = Math.floor(seconds / minute);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  }

  return `less then a minute`;
};
