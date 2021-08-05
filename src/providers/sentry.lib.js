const StatusPage = require("./_statuspage.lib");

class SentryStatus extends StatusPage {
  constructor() {
    super("https://status.sentry.io/api/v2/status.json");
  }
}

module.exports = SentryStatus;
