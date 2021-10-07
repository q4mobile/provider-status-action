const StatusPage = require("./_statuspage.lib");

class NpmjsStatus extends StatusPage {
  constructor() {
    super("https://status.npmjs.org/api/v2/status.json");
  }
}

module.exports = NpmjsStatus;
