const StatusPage = require("./_statuspage.lib");

class AtlassianStatus extends StatusPage {
  constructor() {
    super("https://status.atlassian.com/api/v2/status.json");
  }
}

module.exports = AtlassianStatus;
