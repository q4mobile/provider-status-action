const cheerio = require("cheerio");
const StatusBase = require("./_base.lib");
const status = require("../const");
class AWSStatus extends StatusBase {
  constructor() {
    super(`https://status.aws.amazon.com/rss/`);
  }

  checkStatus = async (providerStatusIdentifier) => {
    const [prov, pid] = providerStatusIdentifier.split(".");
    const statusResponse = {
      service: pid,
      status: status.STATUS_WARNING,
      message: "UNKNOWN: ",
    };

    try {
      if (!pid) {
        statusResponse.service = "???";
        throw new Error(
          "You have to provide `aws` subservice name. See README."
        );
      }

      if (pid === "fail") {
        statusResponse.message = "Testing fail";
        statusResponse.status = status.STATUS_ERROR;
        return Promise.resolve({ provider: prov, pid, ...statusResponse });
      }

      const response = await this.getHttp(`${this.url}${pid}.rss`);

      const $ = cheerio.load(response, {
        ignoreWhitespace: true,
        xmlMode: true,
      });
      const [lastItem] = $("item") || null;
      statusResponse.service = $("channel > title")
        .text()
        .replace(" Service Status", "")
        .replace("Amazon ", "");
      if (lastItem) {
        const title = $("title", lastItem).text();
        const pubDate = $("pubDate", lastItem).text();
        statusResponse.message += ` [${pubDate}] ${title}`; // default for UNKNOWN

        if (title.indexOf("Service is operating normally") === 0) {
          statusResponse.status = status.STATUS_OK;
          statusResponse.message = `Service is operating normally`;
        }

        if (
          title.indexOf("Informational message") === 0 ||
          title.indexOf("Performance issues") === 0
        ) {
          statusResponse.status = status.STATUS_WARNING;
          statusResponse.message = `WARNING: [${pubDate}] ${title}`;
        }

        if (title.indexOf("Service disruption") === 0) {
          statusResponse.status = status.STATUS_ERROR;
          statusResponse.message = `CRITICAL: [${pubDate}] ${title}`;
        }
      } else {
        statusResponse.status = status.STATUS_OK;
        statusResponse.message = `OK: No status events`;
      }
      return Promise.resolve({ provider: prov, pid, ...statusResponse });
    } catch (e) {
      statusResponse.message = e.message;
      statusResponse.status = status.STATUS_WARNING;
      return Promise.resolve({ provider: prov, pid, ...statusResponse });
    }
  };
}

module.exports = AWSStatus;
