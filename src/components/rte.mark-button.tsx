import { IconButton } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import { Editor } from "slate";
import { ReactEditor, useSlate } from "slate-react";

export interface MarkButtonProps {
  format: string;
  icon: IconType;
  label: string;
}

export const MarkButton: React.FC<MarkButtonProps> = ({
  format,
  icon: Icon,
  label = "inline style"
}) => {
  const editor = useSlate();
  return (
    <IconButton
      aria-label={label}
      size="sm"
      isActive={isMarkActive(editor, format)}
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
      onClick={(event) => {
        event.preventDefault();
        // if(format === "link"){

        // const url = window.prompt('Enter the URL of the link:')
        // if (!url) return
        // insertLink(editor, url)
        // }
        toggleMark(editor, format);
      }}
    />
    // <Button
    //   onMouseDown={(event) => {
    //     event.preventDefault();
    //     toggleMark(editor, format);
    //   }}
    // >
    // </Button>
  );
};

export const toggleMark = (editor: ReactEditor, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor: ReactEditor, format: any) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
