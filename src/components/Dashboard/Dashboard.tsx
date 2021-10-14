import React, { FC, useEffect, useState } from 'react';
import ProgressBar from '../Progress/Progress';

// Requests
import { fetchDailies } from '../../http/http.requests';

const Dashboard: FC = () => {
  const [dailiesData, setDailiesData] = useState<any>({});
  useEffect(() => {
    fetchDailies().then((dailies) => setDailiesData(dailies));
  }, []);
  return <ProgressBar />;
};

export default Dashboard;
