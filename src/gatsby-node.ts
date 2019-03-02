import { CircleCI, CircleCIOptions } from 'circleci-api'
import { GatsbyContext } from './types/gatsby'

interface PluginOptions {
  apiKey: string
}

export const sourceNodes = async (
  { actions, createNodeId, createContentDigest }: GatsbyContext,
  pluginOptions: PluginOptions
) => {
  const { createNode } = actions

  if (!pluginOptions.apiKey) {
    throw new Error('Please define an access token')
  }

  const options: CircleCIOptions = {
    token: pluginOptions.apiKey,
  }

  const api = new CircleCI(options)

  const nodeHelper = (input: any, name: string) => {
    const node = {
      ...input,
      id: createNodeId(`gatsby-source-circleci-${input.reponame}`),
      parent: null,
      children: [],
      internal: {
        type: `CircleCI${name}`,
      },
    }

    node.internal.content = JSON.stringify(node)
    node.internal.contentDigest = createContentDigest(node)

    createNode(node)
  }

  try {
    const me = await api.me()
    const projects = await api.projects()

    nodeHelper(me, 'Me')
    projects.forEach(project => nodeHelper(project, 'Projects'))
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
