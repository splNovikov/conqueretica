import React, { useEffect, useState } from 'react';
// Interfaces
import { IDaily } from '../../interfaces';
// Components
import DailyCard from '../../components/DailyCard';
import { fetchHabiticaDailies } from '../../http';

// todo: add tests
const DashboardPage = () => {
  const [dailiesData, setDailiesData] = useState<IDaily[]>([]);
  useEffect(() => {
    fetchHabiticaDailies().then((dailies) => {
      setDailiesData(dailies);
    });
  }, []);

  return (
    <>
      {dailiesData.map((daily: IDaily) => {
        return <DailyCard daily={daily} key={daily.id} />;
      })}
    </>
  );
};

export default DashboardPage;
