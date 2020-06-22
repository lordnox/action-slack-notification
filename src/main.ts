import * as core from '@actions/core'

const run = async () => {
  try {
    core.debug(`Running this action!`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
