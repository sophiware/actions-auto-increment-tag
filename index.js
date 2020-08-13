const core = require('@actions/core')
const { execSync: exec } = require('child_process')

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
    const lastTag = exec('git describe').toString().trim()
    const newTag = increment(lastTag)
    exec(`git tag -a ${newTag} -m "Auto increment to ${newTag}"`)
    exec('git push --tags')
    core.setOutput('tag', newTag)
    console.log(`New tag created: ${newTag}`)
  } catch (error) {
    core.setFailed(error.message)
  }
})()
