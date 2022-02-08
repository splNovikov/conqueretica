import { HABITICA_ID, HABITICA_TOKEN } from './credentials';
import api from '../constants/apiRoutes';
// Interfaces
import { IDaily } from '../interfaces';
// Utils
import { httpErrorHandler } from '../utils';

export const fetchDailies = async (): Promise<IDaily[]> => {
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

  httpErrorHandler(response);
  return [];
};
