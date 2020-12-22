import { Box, Flex, Avatar, Text, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { format } from "date-fns";
import { BiMessageDetail } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { MdMoreVert } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import { GrEmoji } from "react-icons/gr";
import { Maybe, Message } from "../generated/graphql";
import { deserialize_v2 } from "./rte.serialize";

interface ThreadCardProps {
  thread: any;
  messages:
    | Maybe<
        {
          __typename?: "Message" | undefined;
        } & Pick<Message, "id" | "created_at" | "message">
      >[]
    | null
    | undefined;
}

export function ThreadCard({ messages, thread }: ThreadCardProps) {
  const [replyBar, setReplyBar] = useState<"isVisible" | "isHidden">(
    "isHidden"
  );
  function handleMouseEnter(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.preventDefault();
    setReplyBar("isVisible");
  }
  function handleMouseLeave(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.preventDefault();
    setReplyBar("isHidden");
  }
  return (
    <Box
      p={5}
      // pt={index === 0 ? "auto" : 5}
      listStyleType="none"
      _hover={{ bg: "gray.100" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      position="relative"
      zIndex={1}
    >
      {messages?.map((msg) => {
        if (msg) {
          return (
            <Flex key={msg.id}>
              <Avatar />
              <Flex width="100%" flexDirection="column" pl={2}>
                <Flex>
                  <Text size="sm">Message Author</Text>
                  <Text pl={2} size="sm">
                    {format(Date.parse(msg.created_at), "h:mm aaa")}
                  </Text>
                </Flex>
                {deserialize_v2(msg.message)}
              </Flex>
            </Flex>
          );
        }
        return;
      })}
      {replyBar === "isVisible" ? <ReplyBar threadId={thread.id} /> : null}
    </Box>
  );
}

interface ReplyBarProps {
  threadId: string;
}
function ReplyBar({ threadId }: ReplyBarProps) {
  return (
    <Flex
      position="absolute"
      zIndex={1}
      right={0}
      top="0%"
      transform="translate(0, -50%)"
      border="1px solid #ccc"
      borderRadius="5px"
      bg="#fff"
    >
      <IconButton
        aria-label="reaction"
        bg="transparent"
        px={2}
        size="sm"
        icon={<GrEmoji fill="#888" size="1.5em" />}
        onClick={() => {
          console.log("REACTION CLICKED", threadId);
        }}
      />

      <IconButton
        aria-label="reply"
        bg="transparent"
        px={2}
        size="sm"
        icon={<BiMessageDetail fill="#888" size="1.5em" />}
        onClick={() => {
          console.log("REPLY CLICKED", threadId);
        }}
      />
      <IconButton
        aria-label="share"
        bg="transparent"
        px={2}
        size="sm"
        icon={<RiShareForwardLine fill="#888" size="1.5em" />}
        onClick={() => {
          console.log("SHARE CLICKED", threadId);
        }}
      />
      <IconButton
        aria-label="save"
        bg="transparent"
        px={2}
        size="sm"
        icon={<BsBookmark fill="#888" size="1.5em" />}
        onClick={() => {
          console.log("SAVE CLICKED", threadId);
        }}
      />
      <IconButton
        aria-label="more"
        bg="transparent"
        px={2}
        size="sm"
        icon={<MdMoreVert fill="#888" size="1.5em" />}
        onClick={() => {
          console.log("MORE CLICKED", threadId);
        }}
      />
    </Flex>
  );
}
