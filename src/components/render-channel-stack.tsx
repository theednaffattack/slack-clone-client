import {
  Box,
  Center,
  Flex,
  Heading,
  StackDivider,
  Text,
  VStack
} from "@chakra-ui/react";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import React, { useEffect, useRef } from "react";
import { useGetAllChannelThreadsQuery } from "../generated/graphql";
import { deserialize_v2 } from "./rte.serialize";

interface RenderChannelStackProps {
  teamId: string;
  channelId: string;
}

export function RenderChannelStack({
  channelId,
  teamId
}: RenderChannelStackProps) {
  const messageEl = useRef<HTMLDivElement>(null);
  const messageBottomEl = useRef<HTMLDivElement>(null);

  let body;

  const { data, error, loading } = useGetAllChannelThreadsQuery({
    skip: !channelId,
    variables: {
      channelId,
      teamId
    }
  });

  useEffect(() => {
    messageEl.current?.scrollTo({
      behavior: "auto",
      top: messageBottomEl.current?.offsetTop
    });

    if (messageEl && messageEl.current) {
      disableBodyScroll(messageEl.current);
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [data]);

  if (!teamId || !channelId) {
    body = (
      <Center>
        <Heading>Someting is missing!</Heading>
        <Text>Team ID: {teamId}</Text>
        <Text>Channel ID: {channelId}</Text>
      </Center>
    );
  }
  if (error) {
    body = (
      <Center>
        <Heading>Error</Heading>
        <Text>Team ID: {teamId}</Text>
        <Text>Channel ID: {channelId}</Text>
        <Text>{error.message}</Text>
      </Center>
    );
  }
  if (loading) {
    body = [
      { id: 0, message: "zero" },
      { id: 1, message: "one" },
      { id: 2, message: "two" }
    ].map(({ id, message }, index) => (
      <Box
        key={`${id}-messages-list-${message}`}
        as="li"
        h="40px"
        mt={index === 0 ? "auto" : 2}
        listStyleType="none"
      >
        {message}
      </Box>
    ));
  } else {
    body = data?.getAllChannelThreads.map((thread, index) => {
      return (
        <Box
          key={`${thread?.id}-messages-list`}
          as="li"
          // h="40px"
          mx={5}
          mt={index === 0 ? "auto" : 2}
          listStyleType="none"
        >
          {thread.messages?.map((msg) => {
            if (msg) {
              return <Flex key={msg.id}>{deserialize_v2(msg.message)}</Flex>;
            }
            return;
          })}
        </Box>
      );
    });
  }

  return (
    <VStack
      id="viewer"
      ref={messageEl}
      gridColumn={3}
      gridRow={2}
      divider={<StackDivider key={Math.random()} borderColor="gray.200" />}
      spacing={4}
      align="stretch"
      as="ul"
      h="100%"
      overflow="auto"
    >
      {body}

      <Box id="dm-stack-bottom" ref={messageBottomEl}></Box>
    </VStack>
  );
}
