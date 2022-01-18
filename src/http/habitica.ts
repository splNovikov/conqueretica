import { HABITICA_ID, HABITICA_TOKEN } from '../constants/credentials';
import api from '../constants/apiRoutes';
import { httpErrorHandler } from '../utils';

// todo - wrap async request to try catch?

export const fetchDailies = async () => {
  const params = {
    method: 'get',
    headers: {
      'x-api-user': HABITICA_ID,
      'x-api-key': HABITICA_TOKEN,
    },
  };

  const response = await fetch(api.habiticaDailys, params);

  if (response.ok) {
    const responseData = await response.json();

    return responseData.data;
  }

  httpErrorHandler('FETCH DAILIES ERROR');

  return [];
};
