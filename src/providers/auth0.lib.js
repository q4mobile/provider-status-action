const httpm = require('@actions/http-client');
const cheerio = require('cheerio');
const status = require('../const');

module.exports.checkStatus = async (providerStatusIdentifier) => {
  const [prov, passedPid] = providerStatusIdentifier.split('.');
  const pid = passedPid || '749624'; // auth0 login
  const statusResponse = {
    service: pid,
    status: status.STATUS_WARNING,
    message: 'UNKNOWN: ',
  };

  try {
    const response = await getHttp(`http://uptime.auth0.com/${pid}`);
    const $ = cheerio.load(response);
    const lastChecked = $('#lastChecked') || null;
    const pidServiceName = $('h1.largeTitle').text() || pid;
    statusResponse.service = pidServiceName;
    if (lastChecked) {
      const icon = $('#statusIcon', lastChecked).attr('class');
      const title = $(icon).attr('title') || 'Status unknown';
      const date = $('p', lastChecked).text() || 'Now';

      switch (icon) {
        case 'up':
          statusResponse.status = status.STATUS_OK;
          statusResponse.message = `Service is operating normally`;
          break;

        case 'down':
          statusResponse.status = status.STATUS_ERROR;
          statusResponse.message = `[${date}] Service outage`;
          break;

        default:
        case 'paused':
        case 'unknown':
          statusResponse.status = status.STATUS_WARNING;
          statusResponse.message = `[${date}] ${title}`;
          break;
      }
    } else {
      statusResponse.status = status.STATUS_WARNING;
      statusResponse.message = `Couldn't retrive status`;
    }
    return Promise.resolve({ provider: prov, pid, ...statusResponse });
  } catch (e) {
    statusResponse.message = e.message;
    statusResponse.status = status.STATUS_WARNING;
    return Promise.resolve({ provider: prov, pid, ...statusResponse });
  }
};

const getHttp = async (url) => {
  const http = new httpm.HttpClient(url);
  const response = await http.get(url);
  if (response.message.statusCode != 200) {
    throw new Error(
      `${response.message.statusCode} ${response.message.statusMessage}`
    );
  }
  return response.readBody();
};
