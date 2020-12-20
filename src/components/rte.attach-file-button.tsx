import { IconButton } from "@chakra-ui/react";
import React from "react";
import { IoIosAttach } from "react-icons/io";
import { Editor, Element as SlateElement } from "slate";
import { ReactEditor } from "slate-react";

interface AttachFileButtonProps {
  editor: ReactEditor;
  handleOpen: () => void;
}

export function AttachFileButton({
  editor,
  handleOpen
}: AttachFileButtonProps) {
  return (
    <IconButton
      aria-label="attach files"
      icon={<IoIosAttach size="1.3em" />}
      isActive={isButtonActive({ editor })}
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
      size="sm"
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
        handleOpen();
      }}
    />
  );
}

interface IsActiveProps {
  editor: ReactEditor;
}

function isButtonActive({ editor }: IsActiveProps) {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "file"
  });

  return !!match;
}
