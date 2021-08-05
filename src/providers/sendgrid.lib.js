const StatusPage = require("./_statuspage.lib");

class SendgridStatus extends StatusPage {
  constructor() {
    super("https://status.sendgrid.com/api/v2/status.json");
  }
}

module.exports = SendgridStatus;
