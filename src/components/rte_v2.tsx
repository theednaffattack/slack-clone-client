import { Flex } from "@chakra-ui/react";
import isHotkey from "is-hotkey";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdInsertLink,
  MdLooksOne,
  MdLooksTwo
} from "react-icons/md";
import { createEditor, Editor, Node, Range, Transforms } from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact
} from "slate-react";
import { useAddMessageToChannelMutation } from "../generated/graphql";
import { withLinks } from "../lib/rte.with-links";
import { CHARACTERS } from "../lib/temp.character-names";
import { BlockButton } from "./rte.block-button";
import { Leaf } from "./rte.leaf";
import { MarkButton, toggleMark } from "./rte.mark-button";
import { Portal } from "./slate-components";
import { Element } from "./rte.element";
import { LinkButton } from "./rte.link-button";

interface HOTKEYINT {
  [key: string]: string;
}

const HOTKEYS: HOTKEYINT = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code"
};

const isEnterHotkey = isHotkey("Enter");
const isShiftEnterHotkey = isHotkey("Shift+Enter");

interface RichTextInputProps {
  value: Node[];
  setValue: React.Dispatch<React.SetStateAction<Node[]>>;
}

export const RichTextInput: React.FC<RichTextInputProps> = ({
  value: formValue,
  setValue: setFormValue
}) => {
  const [addMessage, { client }] = useAddMessageToChannelMutation();

  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<Node[]>(initialValue);
  const [target, setTarget] = useState<Range | null>();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );
  const editor = useMemo(
    () => withLinks(withMentions(withReact(withHistory(createEditor())))),
    []
  );

  const chars = CHARACTERS.filter((c) =>
    c.toLowerCase().startsWith(search.toLowerCase())
  ).slice(0, 10);

  const onKeyDown = useCallback(
    (event, formValue) => {
      // Trap and prevent the "Enter" key
      if (isEnterHotkey(event)) {
        event.preventDefault();

        const strValues = JSON.stringify(formValue);

        const parsedValues = JSON.parse(strValues);

        console.log("SERIALIZE VALUES", {
          ser: strValues, // formValue.map((item: NodeExample) => serialize(item)).join(","),
          parse: parsedValues,
          formValue,
          value
        });

        // addMessage({
        //   variables: { data: { message: serialize(value[0]) } }
        // });
      }
      // Insert line breaks for "Shift + Enter" keys
      if (isShiftEnterHotkey(event)) {
        event.preventDefault();
        editor.insertBreak();
      }

      // Add text style hotkeys
      for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event as any)) {
          event.preventDefault();
          const mark = HOTKEYS[hotkey];
          toggleMark(editor as ReactEditor, mark);
        }
      }

      // Set keys for insertion of mentions.
      if (target) {
        const prevIndex = index >= chars.length - 1 ? 0 : index + 1;
        const nextIndex = index <= 0 ? chars.length - 1 : index - 1;
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            setIndex(prevIndex);
            break;
          case "ArrowUp":
            event.preventDefault();
            setIndex(nextIndex);
            break;
          case "Tab":
          case "Enter":
            event.preventDefault();
            Transforms.select(editor, target);
            insertMention(editor, chars[index]);
            setTarget(null);
            break;
          case "Escape":
            event.preventDefault();
            setTarget(null);
            break;
        }
      }
    },
    [index, search, target]
  );

  useEffect(() => {
    if (target && chars.length > 0 && ref.current) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor as ReactEditor, target);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [chars.length, editor, index, search, target]);

  return (
    <Flex
      flexDirection="column"
      border="1px solid #888"
      mx={3}
      borderRadius="4px"
    >
      <Slate
        editor={editor as ReactEditor}
        value={value}
        onChange={(value) => {
          setValue(value);
          setFormValue(value);
          const { selection } = editor;

          if (selection && Range.isCollapsed(selection)) {
            const [start] = Range.edges(selection);
            const wordBefore = Editor.before(editor, start, { unit: "word" });
            const before = wordBefore && Editor.before(editor, wordBefore);
            const beforeRange = before && Editor.range(editor, before, start);
            const beforeText =
              beforeRange && Editor.string(editor, beforeRange);
            const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
            const after = Editor.after(editor, start);
            const afterRange = Editor.range(editor, start, after);
            const afterText = Editor.string(editor, afterRange);
            const afterMatch = afterText.match(/^(\s|$)/);

            if (beforeMatch && afterMatch) {
              setTarget(beforeRange);
              setSearch(beforeMatch[1]);
              setIndex(0);
              return;
            }
          }

          setTarget(null);
        }}
      >
        <Editable
          renderElement={renderElement}
          onKeyDown={(event) => onKeyDown(event, formValue)}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          style={{
            padding: "8px"
            // paddingRight: "6px"
          }}
        />

        {target && chars.length > 0 && (
          <Portal>
            <div
              ref={ref}
              style={{
                top: "-9999px",
                left: "-9999px",
                position: "absolute",
                zIndex: 1,
                padding: "3px",
                background: "white",
                borderRadius: "4px",
                boxShadow: "0 1px 5px rgba(0,0,0,.2)"
              }}
            >
              {chars.map((char, i) => (
                <div
                  key={char}
                  style={{
                    padding: "1px 3px",
                    borderRadius: "3px",
                    background: i === index ? "#B4D5FF" : "transparent"
                  }}
                >
                  {char}
                </div>
              ))}
            </div>
          </Portal>
        )}
        <Flex alignItems="center" bg="#f5f6f7">
          <Flex>
            <MarkButton format="bold" icon={MdFormatBold} label="bold" />
            <MarkButton format="italic" icon={MdFormatItalic} label="italic" />
            <MarkButton
              format="underline"
              icon={MdFormatUnderlined}
              label="underline"
            />
            <MarkButton format="code" icon={MdCode} label="code" />
            <LinkButton format="link" icon={MdInsertLink} label="anchor" />
            {/* <MarkButton format="link" icon={MdInsertLink} label="anchor" /> */}
            <BlockButton format="heading-one" icon={MdLooksOne} label="h1" />
            <BlockButton format="heading-two" icon={MdLooksTwo} label="h2" />
            <BlockButton
              format="block-quote"
              icon={MdFormatQuote}
              label="block-quote"
            />
            <BlockButton
              format="numbered-list"
              icon={MdFormatListNumbered}
              label="numbered list"
            />
            <BlockButton
              format="bulleted-list"
              icon={MdFormatListBulleted}
              label="bulleted list"
            />
          </Flex>

          <Flex ml="auto">OTHER BUTTONS</Flex>
        </Flex>
      </Slate>
    </Flex>
  );
};

const withMentions = (editor: ReactEditor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "mention" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "mention" ? true : isVoid(element);
  };

  return editor;
};

const insertMention = (editor: any, character: string) => {
  const mention = { type: "mention", character, children: [{ text: "" }] };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};

const initialValue = [
  {
    children: [
      {
        text: ""
      }
    ],
    type: "paragraph"
  }
];
