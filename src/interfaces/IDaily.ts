import { IDailyHistory } from './IDailyHistory';

export interface IDaily {
  attribute?: string; // no idea
  byHabitica?: boolean;
  challenge?: unknown; // Object. what type of Object?
  checklist?: []; // array of... what?
  collapseChecklist?: boolean;
  completed: boolean;
  createdAt: string;
  daysOfMonth?: []; // array of... what?
  everyX?: number; // no idea
  frequency: string; // should be a enum. example: "weekly"
  group?: unknown; // I don't even care what type of object it is
  history?: Array<IDailyHistory>;
  id: string;
  isDue: boolean;
  nextDue?: Array<string>; // example: ['Sat Nov 13 2021 00:00:00 GMT+0300', 'Mon Nov 15 2021 00:00:00 GMT+0300']
  notes: string;
  priority?: number;
  reminders?: []; // array of... what?
  repeat?: unknown; // Object. example: {m: true, t: true, w: true, th: true, f: true, ...}
  startDate: string;
  streak: number; // useful
  tags?: Array<string>;
  text: string;
  type: string;
  updatedAt?: Date; // Date? Really  String - yes
  userId?: string; // guid
  value?: number; // Value?! example: 9.052314105367257
  weeksOfMonth?: []; // array of... what?
  yesterDaily?: boolean;
}
