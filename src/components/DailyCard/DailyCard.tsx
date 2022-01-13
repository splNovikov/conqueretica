import React, { FC } from 'react';
import moment from 'moment';
// Interfaces
import { IDaily } from '../../interfaces';
// Styles
import './DailyCard.scss';

const DailyCard: FC<{
  daily: IDaily;
}> = ({ daily }) => (
  <div className="daily-card">
    <div className="daily-card-title">{daily.text}</div>
    <div className="daily-created-at">
      Created At: {moment(daily.createdAt).format('DD/MM/YYYY')}
    </div>
    <div className="daily-notes">Notes: {daily.notes}</div>
    <div className="daily-start-date">
      Start Date: {moment(daily.startDate).format('DD/MM/YYYY')}
    </div>
    <div className="daily-type">Type: {daily.type}</div>
    <div className="daily-frequency">Frequency: {daily.frequency}</div>
    <div className="daily-streak">Streak: {daily.streak}</div>
  </div>
);

export default DailyCard;
