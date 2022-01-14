import { FieldValue } from 'firebase/firestore';

export interface IMessage {
  id: string;
  ownerId: string;
  text: string;
  createdAt: FieldValue;
}
