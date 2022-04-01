const rules = {
  sheets: 'docs.google.com/spreadsheets',
  docs: 'https://docs.google.com/document',
  slides: 'https://docs.google.com/presentation',
  drive: 'https://drive.google.com/drive',
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

  return '';
};
