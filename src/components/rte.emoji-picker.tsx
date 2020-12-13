import { IconButton } from "@chakra-ui/react";
import React from "react";
import { GrEmoji } from "react-icons/gr";
import { Editor, Element as SlateElement } from "slate";

import { ReactEditor } from "slate-react";

interface EmojiPickerProps {
  editor: ReactEditor;
  format: string;
  label: string;
  setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
  showEmojiPicker: boolean;
}

interface IsActiveProps {
  editor: ReactEditor;
  format: string;
}

export function EmojiPicker({
  editor,
  format,
  label,
  setShowEmojiPicker,
  showEmojiPicker
}: EmojiPickerProps) {
  return (
    <IconButton
      aria-label={label}
      border="1px"
      borderRadius="2px"
      borderColor="transparent" // "#ccd0d5"
      fontSize="14px"
      fontWeight="semibold"
      icon={<GrEmoji size="1.4em" />}
      isActive={isButtonActive({ editor, format })}
      // isDisabled={!ReactEditor.isFocused(editor)}
      lineHeight="1.2"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      px="8px"
      bg="#f5f6f7"
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
        // Set the focus so that keyDown events work
        // when the editor can't rely on autoFocus
        if (!ReactEditor.isFocused(editor)) {
          ReactEditor.focus(editor);
        }
        setShowEmojiPicker(!showEmojiPicker);
      }}
    />
  );
}

function isButtonActive({ editor, format }: IsActiveProps) {
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return (
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
      );
    }
  });

  return !!match;
}

export const EmojiRender = React.memo(
  ({
    className,
    label,
    symbol
  }: {
    className: string;
    label: string;
    symbol: number;
  }) => (
    <span className={className} role="img" aria-label={label}>
      {String.fromCodePoint(symbol)}
    </span>
  )
);
