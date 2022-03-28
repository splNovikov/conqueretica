export const acronym = (text: string | unknown): string =>
  typeof text !== 'string'
    ? 'n/a'
    : text
        .split(' ')
        .map((item) => item.charAt(0))
        .join('');
