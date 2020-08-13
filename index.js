const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
  try {
    const token = core.getInput('token');
    const octokit = github.getOctokit(token)
    const lastTag = await octokit.git.getTag()
    console.log(lastTag)
  } catch (error) {
    core.setFailed(error.message);
  }
})()
