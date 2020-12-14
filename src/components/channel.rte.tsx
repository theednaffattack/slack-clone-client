import { Flex } from "@chakra-ui/react";
import isHotkey from "is-hotkey";
import produce from "immer";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useDropzone } from "react-dropzone";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
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

import {
  GetAllChannelThreadsQuery,
  GetAllChannelThreadsDocument,
  GetAllChannelThreadsQueryVariables,
  useAddThreadToChannelMutation
} from "../generated/graphql";
import { withLinks } from "../lib/rte.with-links";
import { CHARACTERS } from "../lib/temp.character-names";
import { Element } from "./rte.element";
import { Leaf } from "./rte.leaf";
import { toggleMark } from "./rte.mark-button";
import { serialize } from "./rte.serialize";
import { Toolbar } from "./rte.toolbar";
import { Portal } from "./slate-components";
import { insertImage, withImages } from "./rte.with-images";
import { withMentions, insertMention } from "../lib/rte.plugin.with-mentions";
import {
  EmojiDataReplacement,
  insertEmoji,
  withEmoji
} from "../lib/rte.plugin.with-emoji";
import { withUploadedImages } from "./rte.with-uploaded-images";

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

interface ChannelRichTextInputProps {
  channelId: string;
  channelName: string;
  invitees: string[];
  setValue: React.Dispatch<React.SetStateAction<Node[]>>;
  teamId: string;
  value: Node[];
}

export interface FilePreview extends File {
  preview: string;
}

const RESET = [{ type: "paragraph", children: [{ text: "" }] }];

// Below comment from: https://github.com/ianstormtaylor/slate/issues/3412#issuecomment-730002475
// @refresh reset
export const ChannelRichTextInput: React.FC<ChannelRichTextInputProps> = ({
  channelId,
  channelName,
  invitees,
  setValue: setFormValue,
  teamId,
  value: formValue
}) => {
  const [addThreadMessage, { client }] = useAddThreadToChannelMutation();

  const mentionPanelRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<Node[]>(RESET);
  const [target, setTarget] = useState<Range | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
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
    () =>
      withEmoji(
        withUploadedImages(
          withImages(
            withLinks(withMentions(withReact(withHistory(createEditor()))))
          )
        )
      ),
    []
  );

  const chars = CHARACTERS.filter((c) =>
    c.toLowerCase().startsWith(search.toLowerCase())
  ).slice(0, 10);

  const onKeyDown = useCallback(
    (event, formValue, invitees) => {
      const { selection } = editor;
      if (selection) {
        const [start] = Range.edges(selection);

        Transforms.select(editor, {
          anchor: start,
          focus: start
        });
      }

      // Insert line breaks for "Shift + Enter" keys
      if (isShiftEnterHotkey(event)) {
        event.preventDefault();
        editor.insertBreak();
      }

      // Trap and prevent the "Enter" key
      if (isEnterHotkey(event)) {
        event.preventDefault();
        if (!target) {
          const strValues = value
            .map((node) => {
              return serialize(node);
            })
            .join("");
          addThreadMessage({
            update: (cache, data) => {
              let threadsInCache;
              try {
                threadsInCache = cache.readQuery<
                  GetAllChannelThreadsQuery,
                  GetAllChannelThreadsQueryVariables
                >({
                  query: GetAllChannelThreadsDocument,
                  variables: {
                    channelId,
                    teamId
                  }
                });
              } catch (error) {
                console.warn("VIEW CACHE ERROR", error);
              }

              if (
                threadsInCache &&
                data.data !== null &&
                data.data !== undefined &&
                data.data.addThreadToChannel.invitees &&
                data.data.addThreadToChannel.invitees.length > 0
              ) {
                try {
                  client.writeQuery<
                    GetAllChannelThreadsQuery,
                    GetAllChannelThreadsQueryVariables
                  >({
                    // Use immer to push our new message
                    // onto the end of what's currently
                    // in cache, updating the UI.
                    data: produce(threadsInCache, (staged) => {
                      if (
                        staged &&
                        data &&
                        data.data !== null &&
                        data.data !== undefined &&
                        data.data.addThreadToChannel &&
                        data.data.addThreadToChannel.invitees &&
                        data.data.addThreadToChannel.invitees.length > 0
                      ) {
                        staged.getAllChannelThreads.push({
                          invitees: [], // [...data.data.addThreadToChannel.invitees],
                          __typename: "Thread",
                          id: data.data?.addThreadToChannel.threadId,
                          last_message:
                            data.data.addThreadToChannel.message.message,
                          messages: [data.data.addThreadToChannel.message]
                        });
                      } else {
                        return threadsInCache;
                      }
                    }),
                    query: GetAllChannelThreadsDocument,
                    variables: { teamId, channelId }
                  });
                } catch (error) {
                  console.log(
                    "WRITE QUERY ERROR (ADD THREAD TO CHANNEL)",
                    error
                  );
                }
              }
            },
            variables: {
              data: {
                channelId,
                teamId,
                created_at: "",
                invitees: [...invitees],
                message: strValues
              }
            }
          });

          // THIS IS WHERE WE CLEAR THE INPUT
          // Move selection to the beginning before...
          // clearing the input. It's too fast
          // somehow so the editor will begin point...
          // at a location which no longer exists.
          Transforms.select(editor, {
            anchor: { path: [0, 0], offset: 0 },
            focus: { path: [0, 0], offset: 0 }
          });
          setValue(RESET);
        }
      }

      // Add text style hotkeys
      for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event as any)) {
          event.preventDefault();
          const mark = HOTKEYS[hotkey];
          toggleMark(editor as ReactEditor, mark);
        }
      }

      if (showEmojiPicker) {
        switch (event.key) {
          case "Escape":
            event.preventDefault();
            setShowEmojiPicker(false);
            break;

          default:
            break;
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
          // case "Backspace":
          //   event.preventDefault();
          //   setIndex(null);
          //   break;
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
    [index, search, target, value]
  );

  useEffect(() => {
    // If the selection is already in the Editable savedSelection.current
    // should have value.
    // target && chars.length > 0 &&
    if (target && mentionPanelRef.current) {
      mentionPanelRef.current.focus();

      const el = mentionPanelRef.current;
      const domRange = ReactEditor.toDOMRange(editor as ReactEditor, {
        anchor: target.anchor,
        focus: target.focus
      });
      const rect = domRange.getBoundingClientRect();

      // el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset + 50}px`;
      el.style.bottom = "0";
      el.style.minHeight = "300px";
    }
  }, [chars.length, editor, index, search, target]);

  // BEGIN DROPZONE SECTION
  const [files, setFiles] = React.useState<FilePreview[]>([]);
  const { getInputProps, getRootProps, open } = useDropzone({
    noDragEventsBubbling: true,

    onDrop: (acceptedFiles: File[]) => {
      // Place images in local state for later
      // submission.
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  React.useEffect(() => {
    files.forEach((file) => {
      insertImage({
        editor,
        type: "data-image",
        url: URL.createObjectURL(file)
      });
    });
    return () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  // END DROPZONE SECTION

  const [focused, setFocused] = React.useState(false);
  const savedSelection = React.useRef(editor.selection);
  const onFocus = React.useCallback(() => {
    setFocused(true);
    if (!editor.selection) {
      Transforms.select(
        editor,
        savedSelection.current ?? Editor.end(editor, [])
      );
    }
  }, [editor]);
  const onBlur = React.useCallback(() => {
    setFocused(false);
    savedSelection.current = editor.selection;
  }, [editor]);

  const divRef = React.useRef<HTMLDivElement>(null);
  const focusEditor = React.useCallback(
    (e: React.MouseEvent) => {
      if (e.target === divRef.current) {
        ReactEditor.focus(editor);
        e.preventDefault();
      }
    },
    [editor]
  );

  return (
    <Flex
      flexDirection="column"
      border="1px solid #888"
      mx={3}
      borderRadius="4px"
      overflow="hidden"
      {...getRootProps}
    >
      <Slate
        editor={editor as ReactEditor}
        value={value}
        onChange={(value) => {
          setValue(value);
          setFormValue(value);
          const { selection } = editor;
          // for mentions
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

            const atSymbolEntered = value.some((item) => {
              return item.children.some((subItem: any) => {
                return subItem.text === "@";
              });
            });

            if (value && atSymbolEntered) {
              setTarget(selection);
              setTarget({ anchor: start, focus: start });

              setSearch("A");
              setIndex(0);
              return;
            }

            if (beforeMatch && afterMatch && beforeRange) {
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
          onKeyDown={(event) => onKeyDown(event, formValue, invitees)}
          renderLeaf={renderLeaf}
          placeholder={channelName ? `Message #${channelName}` : "enter text"}
          spellCheck
          autoFocus={true}
          onBlur={onBlur}
          onFocus={onFocus}
          style={{
            padding: "8px"
          }}
        />
        <input {...getInputProps()} style={{ display: "none" }} />
        {target && (
          <Portal>
            <div
              ref={mentionPanelRef}
              style={{
                // top: "-9999px",
                // left: "-9999px",
                // bottom: 0,
                position: "absolute",
                zIndex: 1,
                padding: "3px",
                borderRadius: "4px",
                boxShadow: "0 1px 5px rgba(0,0,0,.2)",
                // background: "white",
                backgroundColor: "pink"
              }}
            >
              {chars.map((char, i) => (
                <div
                  key={char}
                  onMouseDown={() => {
                    Transforms.select(editor, target);
                    insertMention(editor, chars[i]);
                    setTarget(null);

                    ReactEditor.focus(editor);
                    Transforms.move(editor);
                  }}
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
        {showEmojiPicker ? (
          <Portal>
            <Flex
              bg="#fff"
              border="2px dashed teal"
              position="absolute"
              minHeight="300px"
              minWidth="300px"
              zIndex={1}
              bottom="50px"
              right="20px"
            >
              <Picker
                set="twitter"
                onSelect={(emoji: EmojiDataReplacement) => {
                  if (!ReactEditor.isFocused(editor)) {
                    ReactEditor.focus(editor);
                  }

                  insertEmoji(editor, emoji);
                  setShowEmojiPicker(false);
                }}
              />
            </Flex>
          </Portal>
        ) : null}
        {/* {thumbs && thumbs.length > 0 ? (
          <aside style={thumbsContainer}>{thumbs}</aside>
        ) : null} */}
        <Toolbar
          channelId={channelId}
          editor={editor}
          invitees={invitees}
          openFileDialog={open}
          setTarget={setTarget as any}
          setIndex={setIndex}
          setSearch={setSearch}
          setShowEmojiPicker={setShowEmojiPicker}
          showEmojiPicker={showEmojiPicker}
          setValue={setValue}
          target={target}
          teamId={teamId}
          value={value}
        />
      </Slate>
    </Flex>
  );
};
