// Interfaces, Types
import { IconName } from '../types';

const rules = {
  meet: 'meet.google.com',
  docs: 'docs.google.com/document',
  gmail: 'mail.google.com',
  sheets: 'docs.google.com/spreadsheets',
  slides: 'docs.google.com/presentation',
  calendar: 'calendar.google.com/calendar',
  youtube: 'youtube.com/watch',
  drive: 'drive.google.com/drive',
  confluence: 'atlassian.net/wiki',
  jira: 'atlassian.net/jira',
  jiraBrowse: 'atlassian.net/browse',
  jiraProjects: 'atlassian.net/projects',
  jiraIssues: 'atlassian.net/issues',
  serviceDesk: 'atlassian.net/servicedesk',
  lucidCharts: 'lucid.app/lucidchart',
  figma: 'figma.com',
  github: 'github.',
  gitlab: 'gitlab.',
  codeCommit: 'codesuite/codecommit',
  drawings: 'docs.google.com/drawings',
  trello: 'trello.com',
  zoom: 'zoom.us',
  slack: 'slack.com',
  telegram: 't.me',
};

export const identifyLink = (href: string): IconName | undefined => {
  if (href.includes(rules.meet)) {
    return 'meet';
  }
  if (href.includes(rules.docs)) {
    return 'docs';
  }
  if (href.includes(rules.gmail)) {
    return 'gmail';
  }
  if (href.includes(rules.sheets)) {
    return 'sheets';
  }
  if (href.includes(rules.slides)) {
    return 'slides';
  }
  if (href.includes(rules.calendar)) {
    return 'calendar';
  }
  if (href.includes(rules.youtube)) {
    return 'youtube';
  }
  if (href.includes(rules.drive)) {
    return 'drive';
  }
  if (href.includes(rules.confluence)) {
    return 'confluence';
  }
  if (
    href.includes(rules.jira) ||
    href.includes(rules.jiraBrowse) ||
    href.includes(rules.jiraProjects) ||
    href.includes(rules.jiraIssues) ||
    href.includes(rules.serviceDesk)
  ) {
    return 'jira';
  }
  if (href.includes(rules.lucidCharts)) {
    return 'lucid-charts';
  }
  if (href.includes(rules.figma)) {
    return 'figma';
  }
  if (href.includes(rules.github)) {
    return 'github';
  }
  if (href.includes(rules.gitlab)) {
    return 'gitlab';
  }
  if (href.includes(rules.codeCommit)) {
    return 'code-commit';
  }
  if (href.includes(rules.drawings)) {
    return 'drawings';
  }
  if (href.includes(rules.trello)) {
    return 'trello';
  }
  if (href.includes(rules.zoom)) {
    return 'zoom';
  }
  if (href.includes(rules.slack)) {
    return 'slack';
  }
  if (href.includes(rules.telegram)) {
    return 'telegram';
  }

  return undefined;
};
