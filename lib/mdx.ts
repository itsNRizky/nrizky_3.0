import rehypePrettyCode from "rehype-pretty-code";
import type { Options } from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

export const rehypePrettyCodeOptions: Options = {
  theme: "github-dark",
  keepBackground: true,
  defaultLang: "plaintext",
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className = node.properties.className || [];
    (node.properties.className as string[]).push("highlighted");
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ["word"];
  },
};

export { rehypePrettyCode, remarkGfm };
