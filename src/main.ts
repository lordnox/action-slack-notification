import * as core from '@actions/core'
import got from 'got'
import {LayoutElement} from './types/layout-blocks'
import {promises} from 'fs'
import {format} from 'date-fns'

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

export const GithubActionEventTypes = {
  check_run: 'Check Run',
  check_suite: 'Check Suite',
  create: 'Create',
  delete: 'Delete',
  deployment: 'Deployment',
  deployment_status: 'Deployment Status',
  fork: 'Fork',
  gollum: 'Gollum',
  issue_comment: 'Issue Comment',
  issues: 'Issues',
  label: 'Label',
  milestone: 'Milestone',
  page_build: 'Page Build',
  project: 'Project',
  project_card: 'Project Card',
  project_column: 'Project Column',
  public: 'Public',
  pull_request: 'Pull Request',
  pull_request_review: 'Pull Request Review',
  pull_request_review_comment: 'Pull Request Review Comment',
  push: 'Push',
  registry_package: 'Registry Package',
  release: 'Release',
  status: 'Status',
  watch: 'Watch',
}

export interface User {
  email: string
  name: string
  username?: string
}

export interface Commit {
  author: User
  committer: User
  distinct: boolean
  id: string
  message: string
  timestamp: string
  tree_id: string
  url: string
}

export interface EventJson {
  after: string
  base_ref: string | null
  before: string
  commits: Commit[]
  compare: string
  created: boolean
  deleted: boolean
  forced: boolean
  head_commit: Commit
  pusher: User
  ref: string
  repository: {
    archive_url: string
    archived: boolean
    assignees_url: string
    blobs_url: string
    branches_url: string
    clone_url: string
    collaborators_url: string
    comments_url: string
    commits_url: string
    compare_url: string
    contents_url: string
    contributors_url: string
    created_at: number
    default_branch: string
    deployments_url: string
    description: null
    disabled: boolean
    downloads_url: string
    events_url: string
    fork: boolean
    forks: number
    forks_count: number
    forks_url: string
    full_name: string
    git_commits_url: string
    git_refs_url: string
    git_tags_url: string
    git_url: string
    has_downloads: true
    has_issues: true
    has_pages: boolean
    has_projects: true
    has_wiki: true
    homepage: null
    hooks_url: string
    html_url: string
    id: number
    issue_comment_url: string
    issue_events_url: string
    issues_url: string
    keys_url: string
    labels_url: string
    language: string
    languages_url: string
    license: null
    master_branch: string
    merges_url: string
    milestones_url: string
    mirror_url: null
    name: string
    node_id: string
    notifications_url: string
    open_issues: number
    open_issues_count: number
    owner: {
      avatar_url: string
      email: string
      events_url: string
      followers_url: string
      following_url: string
      gists_url: string
      gravatar_id: string
      html_url: string
      id: number
      login: string
      name: string
      node_id: string
      organizations_url: string
      received_events_url: string
      repos_url: string
      site_admin: boolean
      starred_url: string
      subscriptions_url: string
      type: string
      url: string
    }
    private: true
    pulls_url: string
    pushed_at: number
    releases_url: string
    size: number
    ssh_url: string
    stargazers: number
    stargazers_count: number
    stargazers_url: string
    statuses_url: string
    subscribers_url: string
    subscription_url: string
    svn_url: string
    tags_url: string
    teams_url: string
    trees_url: string
    updated_at: string
    url: string
    watchers: number
    watchers_count: number
  }
  sender: {
    avatar_url: string
    events_url: string
    followers_url: string
    following_url: string
    gists_url: string
    gravatar_id: string
    html_url: string
    id: number
    login: string
    node_id: string
    organizations_url: string
    received_events_url: string
    repos_url: string
    site_admin: boolean
    starred_url: string
    subscriptions_url: string
    type: string
    url: string
  }
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
    if (!eventPath) throw new Error('could not find event path')

    const event = JSON.parse(await promises.readFile(eventPath, 'utf-8')) as EventJson

    if (!event) throw new Error('could not find event data')

    const message = core.getInput('title') || `*New event:*`

    const eventName = process.env[Env.GITHUB_EVENT_NAME] as keyof typeof GithubActionEventTypes
    const eventType = !eventName ? 'Unknown' : GithubActionEventTypes[eventName]

    const result = await send(endpoint, {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${message}\n<${event.compare}|${event.head_commit.committer.name} - ${event.head_commit.message}>`,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Type:*\n${eventType}`,
            },
            {
              type: 'mrkdwn',
              text: `*Run:*\n${process.env[Env.GITHUB_RUN_NUMBER]}`,
            },
            {
              type: 'mrkdwn',
              text: `*Last Update:*\n${format(new Date(event.head_commit.timestamp), 'H:m d.MMM')}`,
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
