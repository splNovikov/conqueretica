import {
  DesktopOutlined,
  FileOutlined,
  TableOutlined,
} from '@ant-design/icons';

import { getIconByLink, identifyLink } from './identifyLink';

const sheets =
  'https://docs.google.com/spreadsheets/d/1x_S2AgTQTz5MRFseuZtM65HEPbDxMY-VT3eP5bglIB4/edit#gid=0';
const docs =
  'https://docs.google.com/document/d/1XLCAJj05ttZ6YV0VJ7p21FXYGqA8boXzycL9n5Vll48/edit';
const slides =
  'https://docs.google.com/presentation/d/1KMAophpPr3LP_oG5WQOmLewzmAa7g1WTIyP9IgcsDMc/edit#slide=id.gcfcf1c7cfc_0_185';

describe('Identify Links', () => {
  it('Should return "sheets"', () => {
    const res = identifyLink(sheets);
    expect(res).toBe('sheets');
  });

  it('Should return "docs"', () => {
    const res = identifyLink(docs);
    expect(res).toBe('docs');
  });

  it('Should return "slides"', () => {
    const res = identifyLink(slides);
    expect(res).toBe('slides');
  });

  it('Should return "undefined"', () => {
    const res = identifyLink('http://test.com/blablabla');
    expect(res).toBe('');
  });
});

describe('Get Icon By Link', () => {
  it('Should return "SheetsIcon"', () => {
    const res = getIconByLink(sheets);
    expect(res).toBe(TableOutlined);
  });

  it('Should return "DocsIcon"', () => {
    const res = getIconByLink(docs);
    expect(res).toBe(FileOutlined);
  });

  it('Should return "SlidesIcon"', () => {
    const res = getIconByLink(slides);
    expect(res).toBe(DesktopOutlined);
  });

  it('Should return "undefined"', () => {
    const res = getIconByLink('http://test.com/blablabla');
    expect(res).toBeUndefined();
  });
});
