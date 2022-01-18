import api from '../constants/apiRoutes';
import { HABITICA_ID, HABITICA_TOKEN } from '../constants/credentials';
import { httpErrorHandler } from '../utils';

// todo: the filename "http.requests" is not in cameCase naming - it should be called "habiticaDailies.ts"

// todo - wrap async request to try catch? axious?

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
