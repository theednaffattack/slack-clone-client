import { Heading, Link } from "@chakra-ui/react";
import React from "react";
import { RenderElementProps, useFocused, useSelected } from "slate-react";

const MentionElement = ({ attributes, children, element }: any) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <span
      {...attributes}
      contentEditable={false}
      style={{
        padding: "3px 3px 2px",
        margin: "0 1px",
        verticalAlign: "baseline",
        display: "inline-block",
        borderRadius: "4px",
        backgroundColor: "#eee",
        fontSize: "0.9em",
        boxShadow: selected && focused ? "0 0 0 2px #B4D5FF" : "none"
      }}
    >
      @{element.character}
      {children}
    </span>
  );
};

export const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case "block-quote":
      return (
        <blockquote
          {...attributes}
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
    case "bulleted-list":
      return (
        <ul {...attributes} style={{ marginLeft: "20px" }}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <Heading {...attributes} as="h1" size="xl" isTruncated>
          {children}
        </Heading>
      );

    case "heading-two":
      return (
        <Heading {...attributes} as="h2" size="lg" isTruncated>
          {children}
        </Heading>
      );
    case "link":
      return (
        <Link
          {...attributes}
          href={element.url as string}
          target="_blank"
          rel="noreferrer"
          isExternal
          // style={{ textDecoration: "underline", color: "crimson" }}
        >
          {children}
        </Link>
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "mention":
      return <MentionElement {...attributes} {...props} />;
    case "numbered-list":
      return (
        <ol {...attributes} style={{ marginLeft: "20px" }}>
          {children}
        </ol>
      );
    case "paragraph":
      // If we find a code block wrap with a 'span' instead
      // of a 'p' tag.
      if (
        element.children.filter((item) => Object.keys(item).includes("code"))
      ) {
        return <span {...attributes}>{children}</span>;
      }
      return <p {...attributes}> {children}</p>;
    default:
      console.log("ELEMENT - DEFAULT CASE", element);

      return <span {...attributes}>{children}</span>;
  }
};
