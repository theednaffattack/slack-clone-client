import { Transforms } from "slate";
import { ReactEditor } from "slate-react";

export function withMentions(editor: ReactEditor): ReactEditor {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "mention" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "mention" ? true : isVoid(element);
  };

  return editor;
}

export function insertMention(editor: ReactEditor, character: string): void {
  const mention = { type: "mention", character, children: [{ text: "" }] };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
}
