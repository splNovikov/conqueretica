import { ComponentType } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  TableOutlined,
} from '@ant-design/icons';

const rules = {
  sheets: 'docs.google.com/spreadsheets',
  docs: 'https://docs.google.com/document',
  slides: 'https://docs.google.com/presentation',
};

const iconMap: {
  [key: string]: ComponentType;
} = {
  sheets: TableOutlined,
  docs: FileOutlined,
  slides: DesktopOutlined,
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

  return '';
};

export const getIconByLink = (href: string): ComponentType => {
  return iconMap[identifyLink(href)];
};
