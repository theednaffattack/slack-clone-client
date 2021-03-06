import { Heading, Link } from "@chakra-ui/react";
import { Emoji } from "emoji-mart";
import React, { PropsWithChildren, Ref } from "react";
import { RenderElementProps, useFocused, useSelected } from "slate-react";
import { ImageElement, ImageInline } from "./rte.with-images";

interface BaseProps {
  className: string;
  [key: string]: unknown;
}

const MentionElement = React.forwardRef(
  (
    {
      attributes,
      children,
      element,
      ...props
    }: PropsWithChildren<
      {
        element: any;
      } & BaseProps
    >,
    ref: Ref<HTMLSpanElement>
  ) => {
    const selected = useSelected();
    const focused = useFocused();

    return (
      <span
        ref={ref}
        {...attributes}
        {...props}
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
  }
);

export const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case "quote":
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
    case "emoji":
      return (
        <span {...attributes} id="emoji-checker">
          <Emoji
            set={"apple"}
            emoji={(element as any).character.id}
            size={24}
            onClick={(emoji) => {
              console.log("CHECK EMOJI EVENT", emoji);

              return;
            }}
            // fallback={(emoji, props) => {
            //   return emoji ? `:${emoji.short_names[0]}:` : props.emoji;
            // }}
          />
        </span>
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
    case "image":
      return <ImageElement {...props} />;
    case "data-image":
      return <ImageElement {...props} />;
    case "data-image-list":
      return <ImageInline {...props} />;
    case "link":
      return (
        <Link
          {...attributes}
          href={element.url as string}
          target="_blank"
          rel="noreferrer"
          isExternal
          color="blue.500"
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
          .length > 0
      ) {
        return <span {...attributes}>{children}</span>;
      }

      return <p {...attributes}>{children}</p>;
    default:
      console.log("DEFAULT FIRING", children);
      return <span {...attributes}>{children}</span>;
  }
};
