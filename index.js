const core = require('@actions/core')
const github = require('@actions/github')

function increment (tag) {
  const tagSplit = tag.split('.')

  if (tagSplit.length > 1) {
    return [...tagSplit.slice(0, -1), parseInt(tagSplit[tagSplit.length - 1]) + 1].join('.')
  }

  return parseInt(tagSplit[0]) + 1
}

(async () => {
  try {
    const { owner, repo } = github.context.repo
    const token = core.getInput('token')
    console.log(token)
    const octokit = github.getOctokit(token)
    const { data } = await octokit.repos.listTags({ owner, repo })
    const newTag = (data && data[0]) ? increment(data[0].name) : '0.0.1'
    console.log(newTag)
    core.setOutput('tag', newTag)
  } catch (error) {
    console.log('errrrooroor')
    core.setFailed(error.message)
  }
})()

console.log('star!')
