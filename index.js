const core = require('@actions/core');
const github = require('@actions/github');

const provs = [
  'aws.lambda',
  'auth0',
  'mongodb-atlas'
]

try {
  const providers = core.getInput('providers') || provs;
  console.log(`PROVIDERS = ${providers}!`);

  /**
   * @TODO
   * 1 - parse providers
   * 2 - validate providers
   * 3 - split providers to groups
   * 4 - check group
   * 5 - output result
   */

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

/**
 * export const status = async (): Promise<Status | null> => {
  const http: httpm.HttpClient = new httpm.HttpClient('ghaction-github-status');
  return (await http.getJson<Status>(`https://www.githubstatus.com/api/v2/status.json`)).result;
};

export const summary = async (): Promise<Summary | null> => {
  const http: httpm.HttpClient = new httpm.HttpClient('ghaction-github-status');
  return (await http.getJson<Summary>(`https://www.githubstatus.com/api/v2/summary.json`)).result;
};
 */