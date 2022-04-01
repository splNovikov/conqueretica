import { acronym } from './acronym';

describe('Get Acronym', () => {
  it('Positive case - get acronym', () => {
    expect(acronym('Pavel Novikov')).toBe('PN');
  });

  it('Positive case - get acronym - single word', () => {
    expect(acronym('Pavel')).toBe('P');
  });

  it('Negative case - get acronym - text is empty string', () => {
    expect(acronym('')).toBe('');
  });

  it('Negative case - get acronym - text is undefined', () => {
    // @ts-ignore
    expect(acronym()).toBe('n/a');
  });

  it('Negative case - get acronym - text is null', () => {
    expect(acronym(null)).toBe('n/a');
  });

  it('Negative case - get acronym - text is Object', () => {
    expect(acronym({})).toBe('n/a');
  });
});
