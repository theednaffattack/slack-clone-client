import { Flex } from "@chakra-ui/react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import isHotkey from "is-hotkey";
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
  S3SignatureAction,
  useAddThreadToChannelMutation,
  useSignS3FilesMutation
} from "../generated/graphql";
import { formatFilename, uploadToS3 } from "../lib/channel.rte.functions";
import {
  EmojiDataReplacement,
  insertEmoji,
  withEmoji
} from "../lib/rte.plugin.with-emoji";
import { insertMention, withMentions } from "../lib/rte.plugin.with-mentions";
import { withLinks } from "../lib/rte.with-links";
import { CHARACTERS } from "../lib/temp.character-names";
import { Element } from "./rte.element";
import { Leaf } from "./rte.leaf";
import { toggleMark } from "./rte.mark-button";
import { serialize } from "./rte.serialize";
import { Toolbar } from "./rte.toolbar";
import { ImageProps, insertInlineImage, withImages } from "./rte.with-images";
import { withUploadedImages } from "./rte.with-uploaded-images";
import { Portal } from "./slate-components";

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

export interface FilePreview extends FileList {
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
  teamId
  // value: formValue
}) => {
  const [addThreadMessage] = useAddThreadToChannelMutation();
  const [signFile] = useSignS3FilesMutation();
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
    async (event, invitees) => {
      // event.preventDefault();
      // const { selection } = editor;
      // if (selection) {
      //   const [start] = Range.edges(selection);

      //   Transforms.select(editor, {
      //     anchor: start,
      //     focus: start
      //   });
      // }

      // Insert line breaks for "Shift + Enter" keys
      if (isShiftEnterHotkey(event)) {
        event.preventDefault();
        editor.insertBreak();
      }

      // Trap and prevent the "Enter" key
      if (isEnterHotkey(event)) {
        event.preventDefault();
        if (!target) {
          const strValues = await Promise.all(
            value.map(async (node) => {
              if (node.type === "data-image") {
                const preppedFile = {
                  lastModified: (node as any).file.lastModified,
                  lastModifiedDate: (node as any).file.lastModifiedDate,
                  name: formatFilename((node as any).file.name),
                  // path: (node as any).file.path,
                  size: (node as any).file.size,
                  type: (node as any).file.type,
                  webkitRelativePath: (node as any).file.webkitRelativePath
                };

                let response;

                try {
                  response = await signFile({
                    variables: {
                      files: [preppedFile],
                      action: S3SignatureAction.PutObject
                    }
                  });
                } catch (error) {
                  console.warn("SIGN FILE ERROR", error);
                }

                const newNode = {
                  ...node,
                  url: response?.data?.signS3Files.signatures[0].uri
                };
                // PUT ADDITIONAL UPLOAD VIA AXIOS TO STORAGE BUCKET

                try {
                  await uploadToS3(
                    node.file as File,
                    response?.data?.signS3Files.signatures[0].signedRequest ??
                      ""
                  );
                } catch (error) {
                  console.warn("UPLOAD ERROR", error);
                }

                return serialize(newNode);
              } else {
                return serialize(node);
              }
            })
          );

          console.log("STRING VLAUES", strValues.join(""));

          addThreadMessage({
            variables: {
              data: {
                channelId,
                teamId,
                created_at: "",
                invitees: [...invitees],
                message: strValues.join("")
              }
            }
          });

          // THIS IS WHERE WE CLEAR THE INPUT
          // Move selection to the beginning of the
          // input field before clearing the input.
          // It's too fast somehow so the editor will point
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

      console.log("KEY DOWN");
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
  // const [files, setFiles] = React.useState<
  //   { type: "data-image" | "image"; url: string }[] | null
  // >(null);

  // React.useEffect(() => {
  //   if (files) {
  //     insertMultipleImages({
  //       editor,
  //       imageNodes: files
  //     });
  //   }
  //   // files.forEach((file) => {
  //   //   insertImage({
  //   //     editor,
  //   //     type: "data-image",
  //   //     url: URL.createObjectURL(file)
  //   //   });
  //   // });
  //   return () => {
  //     // Make sure to revoke the data uris to avoid memory leaks
  //     files?.forEach((file) => URL.revokeObjectURL(file.url));
  //   };
  // }, [files]);

  // END DROPZONE SECTION

  const [, setFocused] = React.useState(false);
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

  const inputRef = React.useRef<HTMLInputElement>(null);
  const openFileDialog = () => {
    if (inputRef && inputRef.current) {
      console.log("VIEW INPUT ELEMENT VIA REF", inputRef.current);

      inputRef.current?.click();
    }
  };
  // const focusEditor = React.useCallback(
  //   (e: React.MouseEvent) => {
  //     if (e.target === divRef.current) {
  //       ReactEditor.focus(editor);
  //       e.preventDefault();
  //     }
  //   },
  //   [editor]
  // );

  return (
    <Flex
      flexDirection="column"
      border="1px solid #888"
      mx={4}
      borderRadius="4px"
      overflow="hidden"
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
              return (item.children as any[]).some((subItem: any) => {
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
          onKeyDown={(event) => {
            onKeyDown(event, invitees);
          }}
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
        <input
          type="file"
          name="file"
          multiple
          ref={inputRef}
          onChange={(event) => {
            const { files: uploadFiles } = event.target;
            const cache: ImageProps[] = [];
            // setFiles(
            //   Array.from(uploadFiles).map((file) => {
            //     return {
            //       url: URL.createObjectURL(file),
            //       type: "data-image"
            //     };
            //   })
            // );
            if (uploadFiles && uploadFiles.length > 0) {
              for (const file of Array.from(uploadFiles)) {
                const reader = new FileReader();
                const [mime] = file.type.split("/");

                if (mime === "image") {
                  reader.addEventListener("load", () => {
                    const url = reader.result;
                    console.log("VIEW URL INFO", { url, type: typeof url });
                    // push into cache
                    cache.push({
                      type: "data-image",
                      url: url as string
                    });

                    console.log("PUSHING", {
                      type: "data-image",
                      url: url as string,
                      cacheLength: cache.length
                    });
                    insertInlineImage({
                      editor,
                      type: "data-image-list",
                      url: url as string
                    });
                    // insertImage({
                    //   editor,
                    //   type: "data-image",
                    //   url: url as string
                    // });
                  });

                  reader.readAsDataURL(file);
                }
              }
            }

            console.log("VIEW CACHE", cache);

            // if (cache.length === 1) {
            //   insertImage({ editor, type: cache[0].type, url: cache[0].url });
            // }
            // if (cache.length > 1) {
            //   insertMultipleImages({ editor, imageNodes: cache });
            // }
          }}
          style={{ display: "none" }}
        />

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
          inputRef={inputRef}
          invitees={invitees}
          openFileDialog={openFileDialog}
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
