const StatusPage = require("./_statuspage.lib");

class NewrelicStatus extends StatusPage {
  constructor() {
    super("https://status.newrelic.com/api/v2/status.json");
  }
}

module.exports = NewrelicStatus;
