import React, { FC, useEffect, useState } from 'react';

import { fetchDailies } from '../../http/http.requests';

import ProgressBar from '../Progress/Progress';
import DailyCard from '../DailyCard/DailyCard';

const Dashboard: FC = () => {
  const [dailiesData, setDailiesData] = useState<any>([]);
  useEffect(() => {
    fetchDailies().then((dailies) => {
      setDailiesData(dailies);
    });
  }, []);

  return (
    <>
      <div style={{ height: '150px' }}>
        <ProgressBar />
      </div>
      <div>
        {dailiesData.map((daily: any) => {
          return <DailyCard daily={daily} />;
        })}
      </div>
    </>
  );
};

export default Dashboard;
