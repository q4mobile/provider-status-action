const httpm = require("@actions/http-client");
const status = require("../const");

class StatusBase {
  constructor(url) {
    this.url = url;
  }

  checkStatus = async (providerStatusIdentifier) => {};

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

module.exports = StatusBase;
