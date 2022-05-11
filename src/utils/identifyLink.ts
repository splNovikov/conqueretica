const rules = {
  sheets: 'docs.google.com/spreadsheets',
  docs: 'https://docs.google.com/document',
  slides: 'https://docs.google.com/presentation',
  drive: 'https://drive.google.com/drive',
  confluence: 'atlassian.net/wiki',
  jira: 'atlassian.net/jira',
  youtube: 'youtube.com/watch',
};

export const identifyLink = (href: string): string => {
  if (href.includes(rules.sheets)) {
    return 'sheets';
  }
  if (href.includes(rules.docs)) {
    return 'docs';
  }
  if (href.includes(rules.slides)) {
    return 'slides';
  }
  if (href.includes(rules.drive)) {
    return 'drive';
  }
  if (href.includes(rules.confluence)) {
    return 'confluence';
  }
  if (href.includes(rules.jira)) {
    return 'jira';
  }
  if (href.includes(rules.youtube)) {
    return 'youtube';
  }

  return '';
};
