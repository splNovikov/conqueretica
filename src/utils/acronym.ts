import { UserInfo } from 'firebase/auth';

export const acronym = (text: string | unknown): string =>
  typeof text !== 'string'
    ? 'n/a'
    : text
        .split(' ')
        .map((item) => item.charAt(0))
        .join('');

export const userAcronym = (user: UserInfo) => {
  return acronym(user.displayName || user.email).toUpperCase();
};
