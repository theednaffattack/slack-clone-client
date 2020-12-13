import { IconButton } from "@chakra-ui/react";
import React from "react";
import { Editor, Element as SlateElement, Range } from "slate";
import { ReactEditor } from "slate-react";
import { ToolbarButtonProps } from "./rte.toolbar";

export interface SpecialInsertButtonProps extends ToolbarButtonProps {
  target?: any;
  editor: ReactEditor;
  setIndex: React.Dispatch<React.SetStateAction<number>>;

  setTarget: React.Dispatch<React.SetStateAction<Range | null | undefined>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

interface IsActiveProps {
  editor: ReactEditor;
  format: string;
  target: any;
}

export function SpecialInsertButton({
  editor,
  format,
  icon: Icon,
  label,
  setIndex,
  setSearch,
  setTarget,
  target
}: SpecialInsertButtonProps) {
  return (
    <IconButton
      aria-label={label}
      icon={<Icon size={label !== "emoji picker" ? "1.6em" : "1.3em"} />}
      isActive={isButtonActive({ editor, format, target })}
      // isDisabled={!ReactEditor.isFocused(editor)}
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

        if (format === "mention" && setTarget) {
          if (!ReactEditor.isFocused(editor)) {
            ReactEditor.focus(editor);
          }
          const { selection } = editor;

          if (selection && Range.isCollapsed(selection)) {
            editor.insertText("@");

            setSearch("");
            setIndex(0);
          }
          setTarget(null);
        }
      }}
    />
  );
}

function isButtonActive({ editor, format, target }: IsActiveProps) {
  if (target) {
    return true;
  }
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
  });

  return !!match;
}
