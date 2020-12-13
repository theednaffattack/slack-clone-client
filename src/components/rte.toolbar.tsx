import { Flex, IconButton } from "@chakra-ui/react";
import produce from "immer";
import React from "react";
import { IconType } from "react-icons";
import { IoIosAttach, IoIosSend } from "react-icons/io";
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
import { VscMention } from "react-icons/vsc";
import { Node, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import {
  GetAllChannelThreadsDocument,
  GetAllChannelThreadsQuery,
  GetAllChannelThreadsQueryVariables,
  useAddThreadToChannelMutation
} from "../generated/graphql";
import { AttachFileButton } from "./rte.attach-file-button";
import { BlockButton } from "./rte.block-button";
import { EmojiPicker } from "./rte.emoji-picker";
import { ImageButton } from "./rte.image-button";
import { LinkButton } from "./rte.link-button";
import { MarkButton } from "./rte.mark-button";
import { serialize } from "./rte.serialize";
import { SpecialInsertButton } from "./rte.special-insert-button";

interface ToolbarProps {
  channelId: string;
  editor: ReactEditor;
  invitees: string[];
  openFileDialog: () => void;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setTarget: React.Dispatch<React.SetStateAction<Range | null | undefined>>;
  setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<Node[]>>;
  showEmojiPicker: boolean;
  target: any; // Range | null | undefined;
  teamId: string;
  value: Node[];
}

export interface ToolbarButtonProps {
  editor?: ReactEditor;
  format: string;
  icon: IconType;
  label: string;
}

const RESET = [{ type: "paragraph", children: [{ text: "" }] }];

export function Toolbar({
  channelId,
  editor,
  invitees,
  openFileDialog,
  setIndex,
  setSearch,
  setShowEmojiPicker,
  showEmojiPicker,
  setTarget,
  setValue,
  target,
  teamId,
  value
}: ToolbarProps) {
  const [addThreadMessage, { client }] = useAddThreadToChannelMutation();
  return (
    <Flex alignItems="center" bg="#f5f6f7">
      <Flex>
        <MarkButton
          editor={editor}
          format="bold"
          icon={MdFormatBold}
          label="bold"
        />
        <MarkButton
          editor={editor}
          format="italic"
          icon={MdFormatItalic}
          label="italic"
        />
        <MarkButton
          editor={editor}
          format="underline"
          icon={MdFormatUnderlined}
          label="underline"
        />
        <MarkButton editor={editor} format="code" icon={MdCode} label="code" />
        <ImageButton editor={editor} format="link" label="anchor" />
        <LinkButton
          editor={editor}
          format="link"
          label="anchor"
          icon={MdInsertLink}
        />
        <BlockButton format="heading-one" icon={MdLooksOne} label="h1" />
        <BlockButton format="heading-two" icon={MdLooksTwo} label="h2" />
        <BlockButton format="quote" icon={MdFormatQuote} label="quote" />

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

      <Flex ml="auto">
        <SpecialInsertButton
          editor={editor}
          format="mention"
          icon={VscMention}
          label="mention picker"
          target={target}
          setIndex={setIndex}
          setSearch={setSearch}
          setTarget={setTarget as any}
        />

        <EmojiPicker
          editor={editor}
          format="emoji"
          label="emoji picker"
          setShowEmojiPicker={setShowEmojiPicker}
          showEmojiPicker={showEmojiPicker}
        />
        <AttachFileButton editor={editor} handleOpen={openFileDialog} />

        {/* SEND BUTTON */}
        <IconButton
          aria-label="send meessage"
          border="1px"
          borderRadius="2px"
          borderColor="transparent" // "#ccd0d5"
          color="#f5f6f7" // "#4b4f56"
          colorScheme="teal"
          fontSize="14px"
          fontWeight="semibold"
          icon={<IoIosSend size="1.4em" />}
          lineHeight="1.2"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          px="8px"
          size="sm"
          _hover={{
            background: "white",
            color: "teal.500",
            borderColor: "teal.500"
          }}
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

            const strValues = value.map((node) => serialize(node)).join("");

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

            Transforms.select(editor, {
              anchor: { path: [0, 0], offset: 0 },
              focus: { path: [0, 0], offset: 0 }
            });
            setValue(RESET);
          }}
        />
      </Flex>
    </Flex>
  );
}
