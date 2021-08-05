const httpm = require("@actions/http-client");
const status = require("../const");

class StatusPage {
  constructor(url) {
    this.url = url;
  }

  checkStatus = async (providerStatusIdentifier) => {
    const [prov] = providerStatusIdentifier.split(".");
    const pid = "All Systems";
    const statusResponse = {
      service: pid,
      status: status.STATUS_WARNING,
      message: "UNKNOWN: ",
    };

    try {
      const httpResponse = await this.getHttp(this.url);
      const response = JSON.parse(httpResponse);

      if (response && response.status) {
        const icon = response.status.indicator || null;
        const date = response.page.updated_at;
        const title = response.status.description;

        switch (icon) {
          case "none":
            statusResponse.status = status.STATUS_OK;
            statusResponse.message = title;
            break;

          case "critical":
          case "major":
            statusResponse.status = status.STATUS_ERROR;
            statusResponse.message = `[${date}] ${title}`;
            break;

          default:
          case "minor":
          case "maintenance":
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

  getHttp = async (url) => {
    const http = new httpm.HttpClient(url);
    const response = await http.get(url);
    if (response.message.statusCode != 200) {
      throw new Error(
        `${response.message.statusCode} ${response.message.statusMessage}`
      );
    }
    return response.readBody();
  };
}

module.exports = StatusPage;
