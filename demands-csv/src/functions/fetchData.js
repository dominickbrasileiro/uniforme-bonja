const axios = require('axios');

async function fetchDemands(apiUrl, token) {
  const response = await axios({
    method: 'GET',
    url: `${apiUrl}/demands/paid`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

module.exports = fetchDemands;
