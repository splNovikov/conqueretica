import { ILink } from '../interfaces';

const links: { sheets: ILink; docs: ILink; slides: ILink } = {
  sheets: {
    id: 'link-1',
    title: 'sheets link',
    href: 'https://docs.google.com/spreadsheets/d/1b9QiKsZX1LNvZI1w9xODqjWqkV60MFo1vhRpNSEkxlg/edit',
    // @ts-ignore
    createdAt: '2021-10-01T13:13:45.115Z',
  },
  docs: {
    id: 'link-2',
    title: 'Docs',
    href: 'https://docs.google.com/document/d/1phIG2hMHXK5Cp1qFJlFtJs_uwEZHSiqoA8g3KJyKvu4/edit',
    // @ts-ignore
    createdAt: '2021-10-01T13:13:45.115Z',
  },
  slides: {
    id: 'link-3',
    title: 'Slides',
    href: 'https://docs.google.com/presentation/d/1iNOo-CbfSXOChIigg9Sx9txnTqUIaxoM7mnquANaS84',
    // @ts-ignore
    createdAt: '2021-10-01T13:13:45.115Z',
  },
};

export { links };
