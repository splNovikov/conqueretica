import { Timestamp } from 'firebase/firestore';

import { ITab } from '../interfaces';

const tabs: ITab[] = [
  {
    id: 'tab-id-1',
    ownerId: 'test_owner_id_1',
    title: 'test_tab_1',
    createdAt: { seconds: 1653305669, nanoseconds: 120000000 } as Timestamp,
  },
  {
    id: 'tab-id-2',
    ownerId: 'test_owner_id_1',
    title: 'test_tab_2',
    createdAt: { seconds: 1653305669, nanoseconds: 120000000 } as Timestamp,
  },
  {
    id: 'tab-id-3',
    ownerId: 'test_owner_id_2',
    title: 'test_tab_3',
    createdAt: { seconds: 1653305669, nanoseconds: 120000000 } as Timestamp,
  },
];

export { tabs };
