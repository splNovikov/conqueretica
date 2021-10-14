// todo: let's create a fake service to get auth and use .env in it for a while
const HABITICA_ID = '';
const HABITICA_TOKEN = '';
const headers = {
  'x-api-user': HABITICA_ID,
  'x-api-key': HABITICA_TOKEN,
  'Content-Type': 'application/json',
};
// todo: let's use api prefix variable for https://habitica.com/api/v3/
const HABITICA_API_DAILYS =
  'https://habitica.com/api/v3/tasks/user?type=dailys';

export const fetchDailies = async () => {
  const response = await fetch(HABITICA_API_DAILYS, {
    method: 'get',
    headers,
  });
  let data = [];
  if (response.ok) {
    data = await response.json();
  } else {
    console.error('FETCH DAILIES ERROR');
  }

  return data;
};
