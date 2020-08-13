const core = require('@actions/core')
const github = require('@actions/github')

function increment (tag) {
  if (tag) {
    const tagSplit = tag.split('.')

    if (tagSplit.length > 1) {
      return [...tagSplit.slice(0, -1), parseInt(tagSplit[tagSplit.length - 1]) + 1].join('.')
    }

    return parseInt(tagSplit[0]) + 1
  }

  return '0.0.1'
}

(async () => {
  try {
    const { owner, repo } = github.context.repo
    const token = core.getInput('token')
    const octokit = github.getOctokit(token)
    const tags = await octokit.repos.listTags({ owner, repo })
    console.log(tags)
    core.setOutput('tag', '0')
  } catch (error) {
    core.setFailed(error.message)
  }
})()
