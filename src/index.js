const core = require('@actions/core');
const github = require('@actions/github');
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
 aws.apigateway-us-east-1
 aws.route53privatedns-us-east-1`

const dispatch = async (providers) => {
  const providerObj = dispatcher.dispatchProviders(providers);
  const calls = [];
  for (const [prov, pIdentifiers] of Object.entries(providerObj)) {
    // console.log(`${prov}: ${pIdentifiers}`);
    calls.push(dispatcher.runProviderStatusCheck(prov, pIdentifiers));
  }
  const results = await Promise.all(calls);
  return results;
};

(async () => {
  try {
    console.log('PROVIDERS.0 = ', provs)  
    let providers = core.getInput('providers') ? core.getInput('providers').split('\n') : provs.split('\n');
    console.log('PROVIDERS.1 = ', providers)
    providers = providers.map(el => el.trim())
    console.log('PROVIDERS.2 = ', providers)
    /**
     * 1 - parse providers
     * 2 - validate providers
     * 3 - split providers to groups
     * 4 - check group
     * 5 - output result
     */

    const result = await dispatch(providers);
    // console.debug('MAIN RESULT = ', result)
    core.info('\n');
    result.pop().forEach((stat) => {
      const message = `[${stat.provider.toUpperCase()} ${stat.service}] `;
      switch (stat.status) {
        default:
        case 0:
          core.info('✅ ' + chalk.green(message + chalk.bold(stat.message)));
          break;

        case 1:
        case 3:
          core.warning(
            '✋ ' + chalk.yellow(message + chalk.bold(stat.message))
          );
          break;

        case 2:
          core.error('⛔ ' + chalk.red(message + chalk.bold(stat.message)));
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
