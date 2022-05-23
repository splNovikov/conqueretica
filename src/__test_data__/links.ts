import { Timestamp } from 'firebase/firestore';

import { ILink } from '../interfaces';

const links: { sheets: ILink; docs: ILink; slides: ILink; drive: ILink } = {
  sheets: {
    id: 'link-1',
    title: 'sheets link',
    href: 'https://docs.google.com/spreadsheets/d/1b9QiKsZX1LNvZI1w9xODqjWqkV60MFo1vhRpNSEkxlg/edit',
    createdAt: { seconds: 1653305669, nanoseconds: 120000000 } as Timestamp,
    lastUsed: { seconds: 1653305669, nanoseconds: 120000000 } as Timestamp,
  },
  docs: {
    id: 'link-2',
    title: 'Docs',
    href: 'https://docs.google.com/document/d/1phIG2hMHXK5Cp1qFJlFtJs_uwEZHSiqoA8g3KJyKvu4/edit',
    createdAt: { seconds: 1653305669, nanoseconds: 120000000 } as Timestamp,
    lastUsed: { seconds: 1653305669, nanoseconds: 120000000 } as Timestamp,
  },
  slides: {
    id: 'link-3',
    title: 'Slides',
    href: 'https://docs.google.com/presentation/d/1iNOo-CbfSXOChIigg9Sx9txnTqUIaxoM7mnquANaS84',
    createdAt: { seconds: 1653305669, nanoseconds: 120000000 } as Timestamp,
    lastUsed: { seconds: 1653305669, nanoseconds: 120000000 } as Timestamp,
  },
  drive: {
    id: 'link-4',
    title: 'Drive',
    href: 'https://drive.google.com/drive/folders/0B-b8U__BG5ioNlRaUEkxb1plX3M?resourcekey=0-KAadas5EXVcKS2wl7eKMtQ',
    createdAt: { seconds: 1653305669, nanoseconds: 120000000 } as Timestamp,
    lastUsed: { seconds: 1653305669, nanoseconds: 120000000 } as Timestamp,
  },
};

export { links };
