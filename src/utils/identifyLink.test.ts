import {
  DesktopOutlined,
  FileOutlined,
  TableOutlined,
} from '@ant-design/icons';

import { getIconByLink, identifyLink } from './identifyLink';
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

  it('Should return "undefined"', () => {
    const res = identifyLink('http://test.com/blablabla');
    expect(res).toBe('');
  });
});

describe('Get Icon By Link', () => {
  it('Should return "SheetsIcon"', () => {
    const res = getIconByLink(links.sheets.href);
    expect(res).toBe(TableOutlined);
  });

  it('Should return "DocsIcon"', () => {
    const res = getIconByLink(links.docs.href);
    expect(res).toBe(FileOutlined);
  });

  it('Should return "SlidesIcon"', () => {
    const res = getIconByLink(links.slides.href);
    expect(res).toBe(DesktopOutlined);
  });

  it('Should return "undefined"', () => {
    const res = getIconByLink(blablaHref);
    expect(res).toBeUndefined();
  });
});