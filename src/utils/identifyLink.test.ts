// Utils
import { identifyLink } from './identifyLink';
// Test Data:
import { links } from '../__test_data__';

const blablaHref = 'http://test.com/blablabla';

describe('Identify Links', () => {
  it('Should return "meet"', () => {
    const res = identifyLink('https://meet.google.com/uqp-cyyr-ymu');
    expect(res).toBe('meet');
  });

  it('Should return "docs"', () => {
    const res = identifyLink(links.docs.href);
    expect(res).toBe('docs');
  });

  it('Should return "docs - 2"', () => {
    const res = identifyLink(
      'https://docs.google.com/document/d/1cTy6GJtjZmf8V8-VTOeKKE0Y5CKKtrgDOz9DrXl9xFA/edit',
    );
    expect(res).toBe('docs');
  });

  it('Should return "gmail"', () => {
    const res = identifyLink('https://mail.google.com/mail/u/0/#all');
    expect(res).toBe('gmail');
  });

  it('Should return "sheets"', () => {
    const res = identifyLink(links.sheets.href);
    expect(res).toBe('sheets');
  });

  it('Should return "slides"', () => {
    const res = identifyLink(links.slides.href);
    expect(res).toBe('slides');
  });

  it('Should return "calendar"', () => {
    const res = identifyLink('https://calendar.google.com/calendar/u/0/r/week');
    expect(res).toBe('calendar');
  });

  it('Should return "youtube"', () => {
    const res = identifyLink('https://www.youtube.com/watch?v=fNEJmLhkt74');
    expect(res).toBe('youtube');
  });

  it('Should return "drive"', () => {
    const res = identifyLink(links.drive.href);
    expect(res).toBe('drive');
  });

  it('Should return "confluence"', () => {
    const res = identifyLink(
      'https://jaxel-inc.atlassian.net/wiki/spaces/OH/overview',
    );
    expect(res).toBe('confluence');
  });

  it('Should return "jira"', () => {
    const res = identifyLink(
      'https://jaxel-inc.atlassian.net/jira/software/c/projects/OH/boards/54',
    );
    expect(res).toBe('jira');
  });

  it('Should return "jira" when "browse"', () => {
    const res = identifyLink('https://jaxel-inc.atlassian.net/browse/JUBS-329');
    expect(res).toBe('jira');
  });

  it('Should return "jira" when servicedesk', () => {
    const res = identifyLink(
      'https://jaxel-inc.atlassian.net/servicedesk/customer/portal/3',
    );
    expect(res).toBe('jira');
  });

  it('Should return "lucid-charts"', () => {
    const res = identifyLink(
      'https://lucid.app/lucidchart/09eec516-5471-4093-880b-9ce58636cab6/edit?page=Y4GqplY9EZqp#',
    );
    expect(res).toBe('lucid-charts');
  });

  it('Should return "figma"', () => {
    const res = identifyLink(
      'https://www.figma.com/files/recent?fuid=1108475803596303519',
    );
    expect(res).toBe('figma');
  });

  https: it('Should return "empty string"', () => {
    const res = identifyLink(blablaHref);
    expect(res).toBe(undefined);
  });

  it('Should return "undefined"', () => {
    const res = identifyLink('http://test.com/blablabla');
    expect(res).toBe(undefined);
  });
});
