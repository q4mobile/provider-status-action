const StatusPage = require("./_statuspage.lib");

class PendoStatus extends StatusPage {
  constructor() {
    super("https://status.pendo.io/api/v2/status.json");
  }
}

module.exports = PendoStatus;
