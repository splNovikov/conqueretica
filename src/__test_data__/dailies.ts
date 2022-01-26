import { IDaily } from '../interfaces';

export const dailies: IDaily[] = [
  {
    text: 'Daily Task 1',
    completed: true,
    createdAt: '2021-10-01T13:13:45.115Z',
    notes: 'Daily Notes 1',
    startDate: '2021-09-30T21:00:00.000Z',
    type: 'daily',
    frequency: 'weekly',
    id: '9ee3aff6-0cf5-4656-b02e-f2eb60f51077',
    isDue: false,
    streak: 5,
  },
  {
    text: 'Daily Task 2',
    completed: false,
    createdAt: '2021-10-01T13:13:45.115Z',
    notes: '',
    startDate: '2021-09-30T21:00:00.000Z',
    type: 'daily',
    frequency: 'weekly',
    id: '9ee3aff6-0cf5-4656-b02e-f2eb60f51088',
    isDue: false,
    streak: 13,
  },
];
