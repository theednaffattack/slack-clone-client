import escapeHtml from "escape-html";
import { Node, Text } from "slate";

interface TAGS_PROPS {
  [key: string]: string;
}

// Refactor block tags into a dictionary for cleanliness.
const BLOCK_TAGS: TAGS_PROPS = {
  p: "paragraph",
  blockquote: "quote",
  pre: "code"
};

// Add a dictionary of mark tags.
const MARK_TAGS: TAGS_PROPS = {
  em: "italic",
  strong: "bold",
  u: "underline"
};

const serialize = (node) => {
  if (Text.isText(node)) {
    return escapeHtml(node.text);
  }

  const children = node.children.map((n) => serialize(n)).join("");

  switch (node.type) {
    case "quote":
      return `<blockquote><p>${children}</p></blockquote>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "link":
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    default:
      return children;
  }
};

// type ObjProps = Record<"object" | "type" | "data" | "nodes", string>;

export const rules = [
  // PARAGRAPH RULES
  // Add our first rule with a deserializing function.
  {
    deserialize(el: HTMLElement, next: any) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: "block",
          type: "paragraph",
          data: {
            className: el.getAttribute("class")
          },
          nodes: next(el.childNodes)
        };
      }
    },

    // Add a serializing function property to our rule...
    serialize(obj: any, children: string) {
      if (obj.object == "block") {
        switch (obj.type) {
          case "paragraph":
            return <p className={obj.data.get("className")}>{children}</p>;
          case "quote":
            return <blockquote>{children}</blockquote>;
          case "code":
            return (
              <pre>
                <code>{children}</code>
              </pre>
            );
        }
      }
    }
  },
  {
    // Add a new rule that handles marks...
    deserialize(el: HTMLElement, next: any) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: "mark",
          type: type,
          nodes: next(el.childNodes)
        };
      }
    },

    serialize(obj: any, children: string) {
      if (obj.object == "mark") {
        switch (obj.type) {
          case "bold":
            return <strong>{children}</strong>;
          case "italic":
            return <em>{children}</em>;
          case "underline":
            return <u>{children}</u>;
        }
      }
    }
  }
];
