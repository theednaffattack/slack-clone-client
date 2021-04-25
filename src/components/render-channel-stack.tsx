import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack
} from "@chakra-ui/react";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { format } from "date-fns";
import React, { useEffect, useRef } from "react";
import {
  NewMessageSubDocument,
  NewMessageSubSubscription,
  NewMessageSubSubscriptionVariables,
  useGetAllChannelThreadsQuery
} from "../generated/graphql";
import { ChannelStackDivider } from "./channel-stack-divider";
import { ThreadCard } from "./thread-card";

interface RenderChannelStackProps {
  teamId: string;
  channelId: string;
}

export function RenderChannelStack({
  channelId,
  teamId
}: RenderChannelStackProps) {
  const messageEl = useRef<any>(null);
  const messageBottomEl = useRef<HTMLDivElement>(null);

  let body;

  const {
    data,
    error,
    loading,
    subscribeToMore
  } = useGetAllChannelThreadsQuery({
    // pollInterval: 500,
    skip: !channelId,

    variables: {
      channelId,
      teamId
    }
  });

  useEffect(() => {
    // scroll to the bottom of the stack
    messageEl.current?.scrollTo({
      behavior: "auto",
      top: messageBottomEl.current?.offsetTop
    });

    // disable body scroll if there
    // are messages
    if (messageEl && messageEl.current) {
      disableBodyScroll(messageEl.current);
    }

    // prepare subscribeToMore for new messages
    const unsubscribe = subscribeToMore<
      NewMessageSubSubscription,
      NewMessageSubSubscriptionVariables
    >({
      document: NewMessageSubDocument,
      variables: {
        data: {
          channelId,
          teamId,
          invitees: [],
          message: "init-sub"
        }
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newMessage = subscriptionData.data.newMessageSub;

        const exists = prev.getAllChannelThreads.find(
          ({ id }) => id === newMessage.threadId
        );

        if (exists) return prev;

        return Object.assign({}, prev, {
          getAllChannelThreads: [
            ...prev.getAllChannelThreads,
            {
              __typename: newMessage.__typename,
              created_at: newMessage.created_at,
              invitees: [],
              last_message: newMessage.message,
              messages: [newMessage.message]
            }
          ],
          __typename: prev.__typename
        });
      }
    });
    return () => {
      clearAllBodyScrollLocks();
      unsubscribe();
    };
  }, [data]);

  if (!teamId || !channelId) {
    body = (
      <Center>
        <Heading>Something is missing!</Heading>
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
        <Flex
          mt={index === 0 ? "auto" : 2}
          as="li"
          key={`${thread?.id}-messages-list`}
          width="100%"
          flexDirection="column"
        >
          <ChannelStackDivider position="relative">
            <Flex
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              zIndex={1}
            >
              <Menu>
                <MenuButton
                  as={Button}
                  // colorScheme="pink"
                  bg="#fff"
                  borderWidth="1px"
                  borderColor="#E2E8F0"
                  rightIcon={<ChevronDownIcon />}
                  borderRadius="100px 100px 100px 100px"
                  size="sm"
                >
                  {format(Date.parse(thread.created_at), "EEEE, MMMM co")}
                </MenuButton>
                <Portal>
                  <MenuList id="my-list">
                    <MenuGroup title="Jump to...">
                      <MenuItem>The very beginning</MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup>
                      <MenuItem>Jump to a specific date</MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Portal>
              </Menu>
            </Flex>
          </ChannelStackDivider>
          <ThreadCard thread={thread} messages={thread.messages} />
        </Flex>
      );
    });
  }

  return (
    <VStack
      id="viewer"
      ref={messageEl}
      gridColumn={3}
      gridRow={2}
      spacing={0}
      align="stretch"
      as="ul"
      h="100%"
      overflow="auto"
      position="relative"
      sx={{
        "@media only screen and (min-width: 600px)": {
          gridColumn: 3
        },
        gridColumn: "1/4"
      }}
    >
      {body}

      <Box id="dm-stack-bottom" ref={messageBottomEl}></Box>
    </VStack>
  );
}
