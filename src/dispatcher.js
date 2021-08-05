const status = require("./const");

module.exports.dispatchProviders = (providersList) => {
  const providers = providersList.toString().split(",") || [];
  const providersObj = {};
  providers.forEach((element) => {
    const [provGlobal] = element.split(".") || element;
    if (status.SUPPORTED_PROVIDERS.includes(provGlobal)) {
      providersObj[provGlobal] = providersObj[provGlobal] || [];
      providersObj[provGlobal].push(element);
    }
  });
  return providersObj;
};

module.exports.runProviderStatusCheck = async (
  provider,
  providerStatusIdentifiers
) => {
  try {
    const provLib = require(`./providers/${provider}.lib.js`);
    let provObj = null;
    if (typeof provLib === "function") {
      provObj = new provLib();
    } else {
      provObj = provLib;
    }
    const calls = [];
    providerStatusIdentifiers.forEach((pid) =>
      calls.push(provObj.checkStatus(pid))
    );
    const res = Promise.all(calls);
    return res;
  } catch (e) {
    console.debug(e);
    return Promise.resolve({
      provider,
      pid: providerStatusIdentifiers,
      service: "?",
      status: status.STATUS_WARNING,
      message: `Could not initialize "${provider}" module`,
    });
  }
};
