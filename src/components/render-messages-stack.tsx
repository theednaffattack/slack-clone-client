import {
  Box,
  Center,
  Heading,
  StackDivider,
  Text,
  VStack
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useLoadDirectMessagesThreadByIdQuery } from "../generated/graphql";

export const RenderMessagesStack = ({
  teamId: teamIdBase,
  threadId: threadIdBase
}: {
  teamId: string;
  threadId: string;
}) => {
  const messageEl = useRef<HTMLDivElement>(null);
  const messageBottomEl = useRef<HTMLDivElement>(null);

  let body;
  let teamId;
  let threadId;
  if (typeof teamIdBase === "string") {
    teamId = teamIdBase;
  }

  if (typeof threadIdBase === "string") {
    threadId = threadIdBase;
  }

  if (Array.isArray(teamIdBase)) {
    teamId = teamIdBase[0];
  } else {
    teamId = "skip";
  }

  if (Array.isArray(threadIdBase)) {
    threadId = threadIdBase[0];
  } else {
    threadId = "skip";
  }

  const { data, error, loading } = useLoadDirectMessagesThreadByIdQuery({
    variables: {
      teamId: teamIdBase as string,
      threadId: threadIdBase as string
    },
    skip:
      teamIdBase === undefined || Array.isArray(teamIdBase) || threadId === null
  });

  useEffect(() => {
    messageEl.current?.scrollTo({
      behavior: "auto",
      top: messageBottomEl.current?.offsetTop
    });
  }, [data]);

  if (teamId === "skip" || threadId === "skip") {
    body = (
      <Center>
        <Heading>Someting is missing!</Heading>
        <Text>Team ID: {teamId}</Text>
        <Text>Thread ID: {threadId}</Text>
      </Center>
    );
  }
  if (error) {
    body = (
      <Center>
        <Heading>Error</Heading>
        <Text>Team ID: {teamId}</Text>
        <Text>Thread ID: {threadId}</Text>
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
    body = data?.loadDirectMessagesThreadById.messages?.map((msg, index) => {
      return (
        <Box
          key={`${msg?.id}-messages-list-${msg?.message}`}
          as="li"
          h="40px"
          mx={5}
          mt={index === 0 ? "auto" : 2}
          listStyleType="none"
        >
          <Text>{msg?.message}</Text>
          <Text>{msg?.created_at}</Text>
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
};
