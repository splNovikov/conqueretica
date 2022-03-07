import { urlValidation } from './urlValidation';

describe('Url Validation', () => {
  it('Should return TRUE when HTTPS url is valid', () => {
    const res = urlValidation('https://docs.google.com/presentation');
    expect(res).toBe(true);
  });

  it('Should return TRUE when HTTP url is valid', () => {
    const res = urlValidation('http://docs.google.com/presentation');
    expect(res).toBe(true);
  });

  it('Should return TRUE when HTTP url is valid', () => {
    const res = urlValidation('https://ya.ru');
    expect(res).toBe(true);
  });

  it('Should return FALSE when url is invalid', () => {
    const res = urlValidation('blablacom/anythingelse');
    expect(res).toBe(false);
  });

  it('Should return FALSE when url is invalid', () => {
    const res = urlValidation('ssss');
    expect(res).toBe(false);
  });

  it('Should return FALSE when url is invalid', () => {
    const res = urlValidation('ya.ru');
    expect(res).toBe(false);
  });
});
