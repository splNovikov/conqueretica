// todo: let's create a fake service to get auth and use .env in it for a while
const HABITICA_ID = '';
const HABITICA_TOKEN = '';

const BASE_URL = 'https://habitica.com/api/v3/';
const HABITICA_API_DAILYS = `${BASE_URL}/tasks/user?type=dailys`;

export const fetchDailies = async () => {
  const response = await fetch(HABITICA_API_DAILYS, {
    method: 'get',
    headers: {
      'x-api-user': HABITICA_ID,
      'x-api-key': HABITICA_TOKEN,
    },
  });
  let dailies = [];
  if (response.ok) {
    const responseData = await response.json();
    dailies = responseData.data;
  } else {
    console.error('FETCH DAILIES ERROR');
  }

  return dailies;
};
