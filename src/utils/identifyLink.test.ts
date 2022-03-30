// Utils
import { identifyLink } from './identifyLink';
// Test Data:
import { links } from '../__test_data__';

const blablaHref = 'http://test.com/blablabla';

describe('Identify Links', () => {
  it('Should return "empty string"', () => {
    const res = identifyLink(blablaHref);
    expect(res).toBe('');
  });

  it('Should return "sheets"', () => {
    const res = identifyLink(links.sheets.href);
    expect(res).toBe('sheets');
  });

  it('Should return "docs"', () => {
    const res = identifyLink(links.docs.href);
    expect(res).toBe('docs');
  });

  it('Should return "slides"', () => {
    const res = identifyLink(links.slides.href);
    expect(res).toBe('slides');
  });

  it('Should return "drive"', () => {
    const res = identifyLink(links.drive.href);
    expect(res).toBe('drive');
  });

  it('Should return "undefined"', () => {
    const res = identifyLink('http://test.com/blablabla');
    expect(res).toBe('');
  });
});
