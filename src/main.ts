import * as core from '@actions/core'
import got from 'got'
import {LayoutElement} from './types/layout-blocks'
import * as CO from './types/composition-objects'
import * as BE from './types/block-elements'

enum Env {
  /** Required value to be set by the action user */
  SLACK_WEBHOOK = 'SLACK_WEBHOOK',
  /** Always set to true. */
  CI = 'CI',
  /** The path to the GitHub home directory used to store user data. For example, /github/home. */
  HOME = 'HOME',
  /** The name of the workflow. */
  GITHUB_WORKFLOW = 'GITHUB_WORKFLOW',
  /** A unique number for each run within a repository. This number does not change if you re-run the workflow run. */
  GITHUB_RUN_ID = 'GITHUB_RUN_ID',
  /** A unique number for each run of a particular workflow in a repository. This number begins at 1 for the workflow's first run, and increments with each new run. This number does not change if you re-run the workflow run. */
  GITHUB_RUN_NUMBER = 'GITHUB_RUN_NUMBER',
  /** The unique identifier (id) of the action. */
  GITHUB_ACTION = 'GITHUB_ACTION',
  /** Always set to true when GitHub Actions is running the workflow. You can use this variable to differentiate when tests are being run locally or by GitHub Actions. */
  GITHUB_ACTIONS = 'GITHUB_ACTIONS',
  /** The name of the person or app that initiated the workflow. For example, octocat. */
  GITHUB_ACTOR = 'GITHUB_ACTOR',
  /** The owner and repository name. For example, octocat/Hello-World. */
  GITHUB_REPOSITORY = 'GITHUB_REPOSITORY',
  /** The name of the webhook event that triggered the workflow. */
  GITHUB_EVENT_NAME = 'GITHUB_EVENT_NAME',
  /** The path of the file with the complete webhook event payload. For example, /github/workflow/event.json. */
  GITHUB_EVENT_PATH = 'GITHUB_EVENT_PATH',
  /** The GitHub workspace directory path. The workspace directory contains a subdirectory with a copy of your repository if your workflow uses the actions/checkout action. If you don't use the actions/checkout action, the directory will be empty. For example, /home/runner/work/my-repo-name/my-repo-name. */
  GITHUB_WORKSPACE = 'GITHUB_WORKSPACE',
  /** The commit SHA that triggered the workflow. For example, ffac537e6cbbf934b08745a378932722df287a53. */
  GITHUB_SHA = 'GITHUB_SHA',
  /** The branch or tag ref that triggered the workflow. For example, refs/heads/feature-branch-1. If neither a branch or tag is available for the event type, the variable will not exist. */
  GITHUB_REF = 'GITHUB_REF',
  /** Only set for forked repositories. The branch of the head repository. */
  GITHUB_HEAD_REF = 'GITHUB_HEAD_REF',
  /** Only set for forked repositories. The branch of the base repository. */
  GITHUB_BASE_REF = 'GITHUB_BASE_REF',
}

export type MessagePayload = {
  /** The ID of another un-threaded message to reply to. */
  thread_ts?: string
  /** Determines whether the text field is rendered according to mrkdwn formatting or not. Defaults to true. */
  mrkdwn?: boolean
} & (
  | {
      /** This is the main body text of the message. It can be formatted as plain text, or with mrkdwn. This field is not enforced as required when using blocks, however it is highly recommended that you include it as the aforementioned fallback. */
      text: string
    }
  | {
      /** An array of layout blocks in the same format as described in the building blocks guide. */
      blocks: LayoutElement[]
      /** The usage of this field changes depending on whether you're using blocks or not. If you are, this is used as a fallback string to display in notifications. If you aren't, this is the main body text of the message. It can be formatted as plain text, or with mrkdwn. This field is not enforced as required when using blocks, however it is highly recommended that you include it as the aforementioned fallback. */
      text?: string
    }
)

// interface Webhook {
//   text: string
//   userName: string
//   iconURL: string
//   iconEmoji: string
//   channel: string
//   unfurlLinks: boolean
//   attachments: Attachment[]
// }

// interface Attachment {
//   fallback: string
//   pretext: string
//   color: string
//   authorName: string
//   authorLink: string
//   authorIcon: string
//   footer: string
//   fields: Field[]
// }

// interface Field {
//   title: string
//   value: string
//   short: boolean
// }

// interface Placeholder {
//   type: 'plain_text'
//   text: string
//   emoji?: true
// }

// type SelectAction =
//   | {
//       type: 'conversations_select'
//       placeholder: Placeholder
//     }
//   | {
//       type: 'channels_select'
//       placeholder: Placeholder
//     }
//   | {
//       type: 'users_select'
//       placeholder: Placeholder
//     }

const send = (endpoint: string, data: MessagePayload) =>
  got(endpoint, {
    body: JSON.stringify(data),
    method: 'post',
  }).then(response => response.body)

const run = async () => {
  try {
    core.debug(`Running this action!`)
    const endpoint = process.env[Env.SLACK_WEBHOOK]

    if (!endpoint) throw new Error('SLACK_WEBHOOK is required')

    const eventPath = process.env[Env.GITHUB_EVENT_PATH]
    if (!eventPath) throw new Error('could not find event path!')

    await send(endpoint, {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'You have a new request:\n*<fakeLink.toEmployeeProfile.com|Fred Enriquez - New device request>*',
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: '*Type:*\nComputer (laptop)',
            },
            {
              type: 'mrkdwn',
              text: '*When:*\nSubmitted Aut 10',
            },
            {
              type: 'mrkdwn',
              text: '*Last Update:*\nMar 10, 2015 (3 years, 5 months)',
            },
            {
              type: 'mrkdwn',
              text: "*Reason:*\nAll vowel keys aren't working.",
            },
            {
              type: 'mrkdwn',
              text: '*Specs:*\n"Cheetah Pro 15" - Fast, really fast"',
            },
          ],
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              action_id: 'approve_id',
              text: {
                type: 'plain_text',
                emoji: true,
                text: 'Approve',
              },
              style: 'primary',
            },
            {
              type: 'button',
              action_id: 'deny_id',
              text: {
                type: 'plain_text',
                emoji: true,
                text: 'Deny',
              },
              style: 'danger',
            },
          ],
        },
      ],
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
