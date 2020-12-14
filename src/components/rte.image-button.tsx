import { IconButton } from "@chakra-ui/react";
import React from "react";
import { MdImage } from "react-icons/md";
import { ReactEditor, useSlate } from "slate-react";
import { isLinkActive } from "../lib/rte.with-links";
import { MarkButtonProps } from "./rte.mark-button";
import { insertImage } from "./rte.with-images";

type ImageButtonProps = Omit<MarkButtonProps, "icon">;

export const ImageButton: React.FC<ImageButtonProps> = ({
  label = "insert image"
}) => {
  const editor = useSlate();
  return (
    <IconButton
      aria-label={label}
      isActive={isLinkActive(editor)}
      isDisabled={!ReactEditor.isFocused(editor)}
      size="sm"
      icon={<MdImage size="1.6em" />}
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
        const url = window.prompt("Enter the URL of the image:");
        if (!url) return;
        insertImage({ editor, type: "image", url });
      }}
    >
      link
    </IconButton>
  );
};
