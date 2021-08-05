const cheerio = require("cheerio");
const StatusBase = require("./_base.lib");
const status = require("../const");
class MongodbStatus extends StatusBase {
  constructor() {
    super(`http://status.mongodb.com/`);
  }

  checkStatus = async (providerStatusIdentifier) => {
    const [prov, passedPid] = providerStatusIdentifier.split(".");
    const pid = passedPid || "1303731"; // cloud.mongodb.com
    const statusResponse = {
      service: pid,
      status: status.STATUS_WARNING,
      message: "UNKNOWN: ",
    };

    try {
      const response = await this.getHttp(`${this.url}${pid}`);
      const $ = cheerio.load(response);
      const lastChecked = $("#lastChecked") || null;
      const pidServiceName = $("h1.largeTitle").text() || pid;
      statusResponse.service = pidServiceName;
      if (lastChecked) {
        const icon = $("#statusIcon", lastChecked).attr("class");
        const title = $(icon).attr("title") || "Status unknown";
        const date = $("p", lastChecked).text() || "Now";

        switch (icon) {
          case "up":
            statusResponse.status = status.STATUS_OK;
            statusResponse.message = `Service is operating normally`;
            break;

          case "down":
            statusResponse.status = status.STATUS_ERROR;
            statusResponse.message = `[${date}] Service outage`;
            break;

          default:
          case "paused":
          case "unknown":
            statusResponse.status = status.STATUS_WARNING;
            statusResponse.message = `[${date}] ${title}`;
            break;
        }
      } else {
        statusResponse.status = status.STATUS_WARNING;
        statusResponse.message = `Couldn't retrive status`;
      }
      return Promise.resolve({ provider: prov, pid, ...statusResponse });
    } catch (e) {
      statusResponse.message = e.message;
      statusResponse.status = status.STATUS_WARNING;
      return Promise.resolve({ provider: prov, pid, ...statusResponse });
    }
  };
}

module.exports = MongodbStatus;
