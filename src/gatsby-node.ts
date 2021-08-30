import { CircleCI, CircleCIOptions } from "circleci-api";
import { SourceNodesArgs, GatsbyNode } from "gatsby";

interface PluginOptions {
  apiKey: string;
}

export const pluginOptionsSchema: GatsbyNode["pluginOptionsSchema"] = ({
  Joi,
}) => {
  return Joi.object({
    apiKey: Joi.string().required().description("Your CircleCI access token"),
  });
};

export const sourceNodes = async (
  { actions, createNodeId, createContentDigest, reporter }: SourceNodesArgs,
  pluginOptions: PluginOptions
) => {
  const { createNode } = actions;

  const options: CircleCIOptions = {
    token: pluginOptions.apiKey,
  };

  const api = new CircleCI(options);

  const nodeHelper = (input: any, name: string) => {
    const node = {
      ...input,
      id: createNodeId(`gatsby-source-circleci-${input.reponame}`),
      parent: null,
      children: [],
      internal: {
        type: `CircleCI${name}`,
      },
    };

    node.internal.content = JSON.stringify(node);
    node.internal.contentDigest = createContentDigest(node);

    createNode(node);
  };

  try {
    const me = await api.me();
    const projects = await api.projects();

    nodeHelper(me, "Me");
    projects.forEach((project) => nodeHelper(project, "Projects"));
  } catch (e: any) {
    reporter.panicOnBuild(
      "Error creating nodes from gatsby-source-circleci",
      e
    );
  }
};
