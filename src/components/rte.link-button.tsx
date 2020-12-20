import { IconButton } from "@chakra-ui/react";
import React from "react";
import { Editor } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import { isLinkActive, wrapLink } from "../lib/rte.with-links";
import { MarkButtonProps } from "./rte.mark-button";

type LinkButtonProps = MarkButtonProps;

export const LinkButton: React.FC<LinkButtonProps> = ({
  icon: Icon,
  label = "insert link"
}) => {
  const editor = useSlate();
  return (
    <IconButton
      aria-label={label}
      isActive={isLinkActive(editor)}
      isDisabled={!ReactEditor.isFocused(editor)}
      size="sm"
      icon={<Icon size="1.6em" />}
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
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the link:");
        if (!url) return;
        insertLink(editor, url);
      }}
    >
      link
    </IconButton>
  );
};

const insertLink = (editor: Editor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};
