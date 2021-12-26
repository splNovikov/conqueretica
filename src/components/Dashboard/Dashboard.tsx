import React, { FC, useEffect, useState } from 'react';

import { fetchDailies } from '../../http/http.requests';

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
      {dailiesData.map((daily: any) => {
        return <DailyCard daily={daily} />;
      })}
    </>
  );
};

export default Dashboard;
