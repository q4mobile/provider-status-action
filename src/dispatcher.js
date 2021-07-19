const SUPPORTED_PROVIDERS = ['aws', 'auth0', 'mongodb']

module.exports.dispatchProviders = (providersList) => {
    const providers = providersList.toString().split(',') || []
    const providersObj = {}
    providers.forEach(element => {
        const [provGlobal] = element.split('.') || element
        if (SUPPORTED_PROVIDERS.includes(provGlobal)) {
            providersObj[provGlobal] = providersObj[provGlobal] || []
            providersObj[provGlobal].push(element)
        }
    });
    return providersObj
}

module.exports.runProviderStatusCheck = async (provider, providerStatusIdentifiers) => {
    try {
        const provLib = require(`./providers/${provider}.lib.js`)
        const calls = []
        providerStatusIdentifiers.forEach((pid) => calls.push(provLib.checkStatus(pid)))
        const res = Promise.all(calls)
        // console.log('DISP all result = ', res)
        return res
    } catch(e) {
        console.warn(`Could not load '${provider}' module`)
        return Promise.resolve({provider, pid: providerStatusIdentifiers, result: `Could not load '${provider}' module`});
    }
}