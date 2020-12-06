import { IconButton } from "@chakra-ui/react";
import React from "react";
import { Editor, Element as SlateElement, Range, Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";

export const BlockButton = ({
  format,
  icon: Icon,
  label = "bad label"
}: any) => {
  const editor = useSlate();
  return (
    <IconButton
      aria-label={label}
      size="sm"
      isDisabled={!ReactEditor.isFocused(editor)}
      isActive={isBlockActive(editor, format)}
      // colorScheme="transparent"
      // color="#222"
      icon={<Icon size="1.6em" />}
      // height="24px"
      lineHeight="1.2"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      border="1px"
      px="8px"
      borderRadius="2px"
      fontSize="14px"
      fontWeight="semibold"
      bg="#f5f6f7"
      borderColor="transparent" // "#ccd0d5"
      color="#4b4f56"
      _hover={{ bg: "#ebedf0" }}
      _active={{
        bg: "#dddfe2",
        transform: "scale(0.98)",
        borderColor: "#bec3c9"
      }}
      _focus={{
        boxShadow:
          "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)"
      }}
      // onClick={(event) => {
      //   event.preventDefault();
      //   toggleBlock(editor, format);
      // }}
      onMouseDown={(event) => {
        event.preventDefault();

        toggleBlock(editor, format);
      }}
    />

    // <Button
    //   active={isBlockActive(editor, format)}
    //   onMouseDown={(event) => {
    //     event.preventDefault();
    //     toggleBlock(editor, format);
    //   }}
    // >

    //   <IconButton icon={md}>{icon}</Icon>
    // </Button>
  );
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const isBlockActive = (editor: ReactEditor, format: any) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
  });

  return !!match;
};

const toggleBlock = (editor: ReactEditor, format: any) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n)
          ? (n.type as string)
          : ""
      ),
    split: true
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};
