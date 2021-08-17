const StatusPage = require("./_statuspage.lib");

class GitHubStatus extends StatusPage {
  constructor() {
    super("https://www.githubstatus.com/api/v2/status.json");
  }
}

module.exports = GitHubStatus;
