import React from 'react';
import moment from 'moment';
// Styles
import './DailyCard.scss';

const DailyCard = ({ daily }: any) => {
  return (
    <div>
      <div className="dayly-card-title">{daily.text}</div>
      <div>Created At: {moment(daily.createdAt).format('DD/MM/YYYY')}</div>
      <div>Notes: {daily.notes}</div>
      <div>Start Date: {moment(daily.startDate).format('DD/MM/YYYY')}</div>
      <div>Type: {daily.type}</div>
      <div>Frequency: {daily.frequency}</div>
    </div>
  );
};

export default DailyCard;
