const HABITICA_ID = '';
const HABITICA_TOKEN = '';
const headers = {
  'x-api-user': HABITICA_ID,
  'x-api-key': HABITICA_TOKEN,
};
const HABITICA_API_DAILYS =
  'https://habitica.com/api/v3/tasks/user?type=dailys';

const fetchDailies = async () => {
  const response = await UrlFetchApp.fetch(HABITICA_API_DAILYS, {
    method: 'get',
    headers,
  });
  const { data } = JSON.parse(response);

  return data || [];
};

// tasks that should be finished this day (today (Due))
const getDueDailies = (dailies) => dailies.filter((daily) => daily.isDue);

// tasks which has been completed but they should not have been completed (not Due)
const getNotDueCompletedDailies = (dailies) =>
  dailies.filter((daily) => !daily.isDue && daily.completed);

// Get
const get = async () => {
  const dailies = await fetchDailies();

  return [...getDueDailies(dailies), ...getNotDueCompletedDailies(dailies)];
};
