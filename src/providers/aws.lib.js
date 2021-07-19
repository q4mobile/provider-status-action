const httpm = require('@actions/http-client')

module.exports.checkStatus = async (providerStatusIdentifier) => {
    const [prov, pid] = providerStatusIdentifier.split('.')
    console.log('Loading... [%s] = ', `https://status.aws.amazon.com/rss/${pid}.rss`)    
    const response = await getHttp(`https://status.aws.amazon.com/rss/${pid}.rss`);
    
    //@TODO parse  XML

    return Promise.resolve({provider: prov, pid, result: 'Ok'});
}

const getHttp = async (url) => {
    const http = new httpm.HttpClient(url);
    return (await http.get(url)).readBody()
}
//status.auth0.com/feed?domain={YOUR-TENANT}.auth0.com