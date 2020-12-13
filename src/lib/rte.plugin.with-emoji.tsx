import { Element as SlateElement, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export function withEmoji(editor: ReactEditor): ReactEditor {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "emoji" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "emoji" ? true : isVoid(element);
  };

  return editor;
}

export function insertEmoji(
  editor: ReactEditor,
  character: EmojiDataReplacement
): void {
  const emoji: SlateElement = {
    type: "emoji",
    character,
    children: [{ text: "" }]
  };
  Transforms.insertNodes(editor, emoji);
  Transforms.move(editor);
}

export interface EmojiDataReplacement {
  colons: string;
  emoticons: any[];
  id: string;
  name: string;
  native: any;
  short_names: string[];
  skin: any;
  unified: string;
}
