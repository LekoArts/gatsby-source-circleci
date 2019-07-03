export interface GatsbyNode {
  id: string; // Gatsby node ID
  parent?: string | null;
  children?: string[];
  internal?: {
    mediaType?: string;
    type: string;
    contentDigest: string;
  };
  [key: string]: any;
}

export type GatsbyNodeCreator = (node: GatsbyNode) => null;

export type GatsbyNodeIdCreator = (id: string, namespace?: string) => string;

export type GatsbyContentDigester = (content: string) => string;

export interface GatsbyContext {
  actions: GatsbyActions;
  createNodeId: GatsbyNodeIdCreator;
  createContentDigest: GatsbyContentDigester;
}

export interface GatsbyActions {
  createNode: GatsbyNodeCreator;
}
