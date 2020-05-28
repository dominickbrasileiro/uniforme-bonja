const axios = require('axios');

async function getToken(apiUrl) {
  const email = process.env.EMAIL;
  const access_pin = process.env.ACCESS_PIN;

  const response = await axios({
    method: 'POST',
    url: `${apiUrl}/sessions`,
    data: {
      email,
      access_pin,
    },
  });

  return response.data.token;
}

module.exports = getToken;
