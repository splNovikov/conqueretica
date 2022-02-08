import React, { useEffect, useState } from 'react';
// Interfaces
import { IDaily } from '../../interfaces';
// Components
import DashboardPageView from './DashboardPageView';
// Getting data
import { fetchHabiticaDailies } from '../../http';

const DashboardPage = () => {
  const [dailiesData, setDailiesData] = useState<IDaily[]>([]);
  useEffect(() => {
    fetchHabiticaDailies().then((dailies) => {
      setDailiesData(dailies);
    });
  }, []);

  return <DashboardPageView dailies={dailiesData} />;
};

export default DashboardPage;
