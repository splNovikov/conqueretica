const HABITICA_ID = '';
const HABITICA_TOKEN = '';
const headers = {
  'x-api-user': HABITICA_ID,
  'x-api-key': HABITICA_TOKEN,
  'Content-Type': 'application/json',
};
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
