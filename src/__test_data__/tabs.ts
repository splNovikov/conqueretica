import { ITab } from '../interfaces';

const tabs: ITab[] = [
  {
    id: 'tab-id-1',
    ownerId: 'test_owner_id_1',
    title: 'test_tab_1',
    // @ts-ignore
    createdAt: '2021-10-01T13:13:45.115Z',
  },
  {
    id: 'tab-id-2',
    ownerId: 'test_owner_id_1',
    title: 'test_tab_2',
    // @ts-ignore
    createdAt: '2021-10-01T13:13:45.115Z',
  },
  {
    id: 'tab-id-3',
    ownerId: 'test_owner_id_2',
    title: 'test_tab_3',
    // @ts-ignore
    createdAt: '2021-10-01T13:13:45.115Z',
  },
];

export { tabs };
