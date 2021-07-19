const httpm = require('@actions/http-client')

module.exports.checkStatus = async (providerStatusIdentifier) => {
    const [prov, pid] = providerStatusIdentifier.split('.')
    const response = await getHttp(`http://status.mongodb.com/1303731`);
    
    //@TODO parse  XML

    return Promise.resolve({provider: prov, pid, result: 'Ok'});
}

const getHttp = async (url) => {
    const http = new httpm.HttpClient(url);
    return (await http.get(url)).readBody()
}
//