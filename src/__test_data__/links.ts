import { ILink } from '../interfaces';

const links: { sheets: ILink; docs: ILink; slides: ILink } = {
  sheets: {
    id: 'link-1',
    title: 'sheets link',
    href: 'https://docs.google.com/spreadsheets/d/1b9QiKsZX1LNvZI1w9xODqjWqkV60MFo1vhRpNSEkxlg/edit',
  },
  docs: {
    id: 'link-2',
    title: 'Docs',
    href: 'https://docs.google.com/document/d/1phIG2hMHXK5Cp1qFJlFtJs_uwEZHSiqoA8g3KJyKvu4/edit',
  },
  slides: {
    id: 'link-3',
    title: 'Slides',
    href: 'https://docs.google.com/presentation/d/1iNOo-CbfSXOChIigg9Sx9txnTqUIaxoM7mnquANaS84',
  },
};

const importantLinks: ILink[] = [
  {
    id: 'link-1',
    title: 'ST sync',
    href: 'https://docs.google.com/spreadsheets/d/1b9QiKsZX1LNvZI1w9xODqjWqkV60MFo1vhRpNSEkxlg/edit#gid=872659115',
  },
  {
    id: 'link-2',
    title: 'Team',
    href: 'https://docs.google.com/spreadsheets/d/1ptlJTQ_zXkfgkQKzBH5vzw_y16oAtGUjYJVfAjlgFhg/edit#gid=1498664601',
  },
  {
    id: 'link-3',
    title: 'Internship',
    href: 'https://docs.google.com/spreadsheets/d/1x5tFUbUnHiuu9TKSSp05AHKniZDKorD76dd9T_-Mus8/edit#gid=0',
  },
  {
    id: 'link-4',
    title: 'English',
    href: 'https://docs.google.com/spreadsheets/d/1ylyLMiDh5Qy7TDj3XNilwAh40oGLmHw9yZJJWJYXb1E/edit#gid=0',
  },
  {
    id: 'link-5',
    title: 'NuOrder',
    href: 'https://docs.google.com/spreadsheets/u/1/d/1x_S2AgTQTz5MRFseuZtM65HEPbDxMY-VT3eP5bglIB4/edit#gid=0',
  },
  {
    id: 'link-6',
    title: 'Me',
    href: 'https://docs.google.com/spreadsheets/d/1QaeDDWpmKeip0UdJsnL6B1A08k3w8nH96p6yt-GfpR8/edit#gid=0',
  },
  {
    id: 'link-7',
    title: 'Home things',
    href: 'https://docs.google.com/spreadsheets/d/18oZ-K68fKzTMd0r--auYo1-C2PMl7aFsE_bNr4vITok/edit#gid=0',
  },
];

export { links, importantLinks };
