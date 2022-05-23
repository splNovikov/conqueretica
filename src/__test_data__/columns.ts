import { Timestamp } from 'firebase/firestore';

import { IColumn } from '../interfaces';

export const columns: IColumn[] = [
  // col-1
  {
    id: 'column-id-1',
    tabId: 'tab-id-1',
    createdAt: { seconds: 1653305669, nanoseconds: 120000000 } as Timestamp,
  },
  // col - 2
  {
    id: 'column-id-2',
    tabId: 'tab-id-1',
    createdAt: { seconds: 1653305669, nanoseconds: 120000000 } as Timestamp,
  },
];
