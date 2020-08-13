const core = require('@actions/core')
const github = require('@actions/github');

(async () => {
  try {
    const { owner, repo } = github.context.repo
    const token = core.getInput('token')
    const octokit = github.getOctokit(token)
    const { data } = await octokit.repos.listTags({ owner, repo })
    const tag = (data && data[0])
      ? data[0].name.replace(/(\d+)(?!.*\d)/g, parseInt(data[0].name.match(/(\d+)(?!.*\d)/)[0]) + 1)
      : '0.0.1'
    console.log(`Current tag: ${data && data[0] ? data[0].name : 'no tag'}; New tag: ${tag}`)
    const newTag = await octokit.git.createTag({
      owner,
      repo,
      tag,
      message: tag,
      object: github.context.sha,
      type: 'commit'
    })

    await github.git.createRef({
      owner,
      repo,
      ref: `refs/tags/${newTag.data.tag}`,
      sha: newTag.data.sha
    })

    core.setOutput('tag', tag)
  } catch (error) {
    console.log('errrrooroor')
    console.log(error)
    core.setFailed(error.message)
  }
})()
