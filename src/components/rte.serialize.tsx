import { Link } from "@chakra-ui/react";
import escapeHtml from "escape-html";
import React, { Fragment } from "react";
import { Node, Text } from "slate";
import { Emoji } from "emoji-mart";

type NodeType =
  | "quote"
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

const deserializeFunc = (el: any, key: string) => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  }

  const children: any = Array.from(el.childNodes).map(deserializeFunc);

  switch (el.nodeName) {
    case "BODY":
      return <Fragment key={key}>{children}</Fragment>;
    case "BR":
      return <br key={key} />;
    case "BLOCKQUOTE":
      return (
        <blockquote
          key={key}
          style={{
            borderLeft: "4px solid #ddd",
            color: "#aaa",
            display: "block",
            fontStyle: "italic",
            fontSize: "2em",
            marginLeft: 10,
            marginRight: 0,
            paddingLeft: "1.2em"
          }}
        >
          {children}
        </blockquote>
      );
    case "IMG":
      return (
        <img
          key={key}
          src={el.getAttribute("src")}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "20em"
          }}
        />
      );
    case "OL":
      return (
        <ol key={key} style={{ marginLeft: "20px" }}>
          {children}
        </ol>
      );
    case "UL":
      return (
        <ul key={key} style={{ marginLeft: "20px" }}>
          {children}
        </ul>
      );
    case "LI":
      return <li key={key}>{children}</li>;
    case "P":
      return <p key={key}>{children}</p>;
    case "A":
      return (
        <Link
          key={key}
          href={el.url as string}
          target="_blank"
          rel="noreferrer"
          isExternal
          color="blue.500"
        >
          {children}
        </Link>
      );
    case "SPAN":
      if (el.className.includes("emoji")) {
        return (
          <Emoji
            key={"emoji-key-" + Math.random()}
            set={"apple"}
            emoji={el.id}
            size={24}
            onClick={(emoji) => {
              console.log("CHECK EMOJI EVENT", emoji);
              return;
            }}
          />
        );
      } else {
        return <span key={Math.random()}>{children}</span>;
      }
      break;
    default:
      return el.textContent;
  }
};

export function deserialize(htmlString: string) {
  const document = new DOMParser().parseFromString(htmlString, "text/html");

  return deserializeFunc(document, htmlString);
}

export function deserialize_v2(htmlString: string) {
  const document = new DOMParser().parseFromString(htmlString, "text/html");

  return deserializeFunc(document.body, htmlString);
}

export function serialize(node: Node): string {
  // return "";
  if (Text.isText(node)) {
    return escapeHtml(node.text);
  }

  const children = node.children.map((n) => serialize(n)).join("");

  switch (node.type) {
    case "quote":
      return `<blockquote><p>${children}</p></blockquote>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "emoji":
      return `<span id="${
        (node as any).character.id
      }" class="emoji" role="img" aria-label="${
        (node as any).character.name
      }">${children}</span>`;
    case "heading-one":
      return `<h1>${children}</h1>`;
    case "heading-two":
      return `<h2>${children}</h2>`;
    case "image":
      if (node.url) {
        return `<img src=${node.url} />`;
      } else {
        return `<img src="//via.placeholder.com/350x150" />`;
      }
    case "image-data":
      if (node.url) {
        return `<img src=${node.url} />`;
      } else {
        return `<img src="//via.placeholder.com/350x150" />`;
      }
    case "bulleted-list":
      return `<ul>${children}</ul>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "link":
      if (node.url) {
        return `<a href="${escapeHtml(
          node.url as string
        )}" target="_blank" rel="noreferrer">${children}</a>`;
      } else {
        return `<a href="#">${children}</a>`;
      }
    case "mention":
      return `<span class="mention" style="background-color:#eee ; padding: 3px 3px 2px; margin: 0 1px; display: inline-block; border-radius: 4px; font-size: 0.9em; box-shadow: none;">@${node.character}</span>`;
    case "numbered-list":
      return `<ol>${children}</ol>`;
    case "underline":
      return `<u>${children}</u>`;
    default:
      return children;
  }
}
