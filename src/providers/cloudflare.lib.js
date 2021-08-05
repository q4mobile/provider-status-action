const StatusPage = require("./_statuspage.lib");

class CloudFlareStatus extends StatusPage {
  constructor() {
    super("https://www.cloudflarestatus.com/api/v2/status.json");
  }
}

module.exports = CloudFlareStatus;
