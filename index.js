const core = require('@actions/core')
const github = require('@actions/github')

(async () => {
  try {
    const { owner, repo } = github.context.repo
    const token = core.getInput('token')
    const octokit = github.getOctokit(token)
    const { data } = await octokit.repos.listTags({ owner, repo })
    const newTag = (data && data[0]) ? data[0].name.replace(/(\d+)(?!.*\d)/, parseInt(data[0].name.match(/(\d+)(?!.*\d)/)[0]) + 1) : '0.0.1'
    console.log(newTag)
    core.setOutput('tag', newTag)
  } catch (error) {
    console.log('errrrooroor')
    console.log(error)
    core.setFailed(error.message)
  }
})()

console.log('star!')
