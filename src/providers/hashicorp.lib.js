const StatusPage = require("./_statuspage.lib");

class HashicorpStatus extends StatusPage {
  constructor() {
    super("https://status.hashicorp.com/api/v2/status.json");
  }
}

module.exports = HashicorpStatus;
