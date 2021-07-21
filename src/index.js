const core = require('@actions/core');
//const github = require('@actions/github');
const status = require('./const')
const chalk = require('chalk');

const dispatcher = require('./dispatcher');

// const provs = [
//   'aws.appstream2-us-east-1',
//   'aws.apigateway-us-east-1',
//   'aws.route53privatedns-us-east-1',
//   // 'terraform.cloud',
//   // 'auth0.q4-conference-dev',
//   // 'mongodb.atlas'
// ];

const provs =` aws.appstream2-us-east-1
aws
 aws.apigateway-us-east-1
 aws.somthing-non-existing 
 aws.route53privatedns-us-east-1
 mongodb
 auth0.1612668
 google.rds`

const dispatch = async (providers) => {
  const providerObj = dispatcher.dispatchProviders(providers);
  const calls = [];
  for (const [prov, pIdentifiers] of Object.entries(providerObj)) {
    calls.push(dispatcher.runProviderStatusCheck(prov, pIdentifiers));
  }
  const results = await Promise.all(calls);
  return results;
};

(async () => {
  try {
    let providers = core.getInput('providers') ? core.getInput('providers').split('\n') : provs.split('\n');
    providers = providers.map(el => el.trim())
    /**
     * 1 - parse providers
     * 2 - validate providers
     * 3 - split providers to groups
     * 4 - check group
     * 5 - output result
     */

    const result = await dispatch(providers);
    const allResult = [].concat.apply([], result)    
    core.info('\n');
    allResult.forEach((stat) => {
      const message = ` [${stat.provider.toUpperCase()} ${stat.service}] `;
      switch (stat.status) {
        default:
        case status.STATUS_OK:
          core.info(chalk.green(chalk.bold(status.ICON_OK) + message + chalk.bold(stat.message)));
          break;

        case status.STATUS_WARNING:
          core.warning(chalk.yellow(chalk.bold(status.ICON_WARNING) + message + chalk.bold(stat.message)));
          break;

        case status.STATUS_ERROR:
          core.error(chalk.red(chalk.bold(status.ICON_ERROR) + message + chalk.bold(stat.message)));
          break;
      }
    });
    // const time = (new Date()).toTimeString();
    // core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
})();

// https://status.hashicorp.com/#
// https://status.heroku.com/
//
//

// CloudFlare Status: https://www.cloudflarestatus.com/history.atom
// Datadog Status: https://status.datadoghq.com/history.rss
// DockerHub Status: https://status.docker.com/pages/533c6539221ae15e3f000031/rss
// GitHub Status: https://www.githubstatus.com/history.rss
// Hashicorp Status: https://status.hashicorp.com/history.rss
// PyPi Status: https://status.python.org/
// Sentry Status: https://status.sentry.io/history.
////status.auth0.com/feed?domain={YOUR-TENANT}.auth0.com
