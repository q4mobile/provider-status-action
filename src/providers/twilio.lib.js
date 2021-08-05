const StatusPage = require("./_statuspage.lib");

class TwilioStatus extends StatusPage {
  constructor() {
    super("https://status.twilio.com/api/v2/status.json");
  }
}

module.exports = TwilioStatus;
