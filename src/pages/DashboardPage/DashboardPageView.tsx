import React, { FC } from 'react';
// Interfaces
import { IDaily } from '../../interfaces';
// Components
import DailyCard from '../../components/DailyCard';

const DashboardPageView: FC<{ dailies: IDaily[] | null }> = ({ dailies }) => (
  <div className="dashboard-page">
    {dailies &&
      dailies.map((daily: IDaily) => {
        return <DailyCard daily={daily} key={daily.id} />;
      })}
  </div>
);

export default DashboardPageView;
