const StatusPage = require("./_statuspage.lib");

class DataDogStatus extends StatusPage {
  constructor() {
    super("https://status.datadoghq.com/api/v2/status.json");
  }
}

module.exports = DataDogStatus;
