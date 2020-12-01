import escapeHtml from "escape-html";
import { Text, Node } from "slate";

type NodeType =
  | "block-quote"
  | "h1"
  | "h2"
  | "list-item"
  | "paragraph"
  | "quote"
  | "link";

export interface NodeExample {
  children: {
    bold?: boolean;
    code?: true;
    text: string;
    italic?: boolean;
    underline?: boolean;
  }[];
  url?: string;
  type?: NodeType;
}

export function serialize(node: NodeExample): string {
  console.log("WHAT IS NODE?", { node });
  // return "";
  if (Text.isText(node)) {
    console.log("VIEW TEXT NODES", { escape: escapeHtml(node.text), node });

    return escapeHtml(node.text);
  }

  const children = node.children.map((n: any) => serialize(n)).join("");

  switch (node.type) {
    case "quote":
      return `<blockquote><p>${children}</p></blockquote>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "link":
      if (node.url) {
        return `<a href="${escapeHtml(node.url)}">${children}</a>`;
      } else {
        return `<a href="#">${children}</a>`;
      }
    default:
      return children;
  }
}
