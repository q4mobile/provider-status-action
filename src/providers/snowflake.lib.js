const StatusPage = require("./_statuspage.lib");

class SnowFlakeStatus extends StatusPage {
  constructor() {
    super("https://status.snowflake.com/api/v2/status.json");
  }
}

module.exports = SnowFlakeStatus;
