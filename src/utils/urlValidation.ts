const urlRegex = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /https?:\/\/(www\.)?[-a-zA-Z0–9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0–9@:%_\+.~#()?&//=]*)/,
);

export const urlValidation = (url: string) => urlRegex.test(url);
