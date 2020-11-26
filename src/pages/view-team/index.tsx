import {
  Avatar,
  AvatarGroup,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Text
} from "@chakra-ui/react";
import { Router } from "next/router";
import React, { useEffect, useReducer } from "react";
import { AddMessageForm } from "../../components/add-direct-message-form";
import {
  ControllerAccordion,
  OtherNames
} from "../../components/controller-accordion";
import { RenderChannelStack } from "../../components/render-channel-stack";
import { RenderMessagesStack } from "../../components/render-messages-stack";
import { TeamsStack } from "../../components/teams-stack";
import { useGetAllTeamsForUserQuery } from "../../generated/graphql";
import {
  viewControllerInit,
  viewControllerInitialState,
  viewControllerReducer,
  ViewerType
} from "../../lib/page-funcs.view-team-state";
import { CreateChannelForm } from "./create-channel-form";

const otherStuff: OtherNames[] = ["Threads", "Saved", "Mentioned", "More"];

type UrlParamType = string | string[] | undefined;

const ViewTeamIndex = ({ router }: { router: Router }) => {
  const [viewControllerState, viewControllerDispatch] = useReducer(
    viewControllerReducer,
    viewControllerInitialState,
    viewControllerInit
  );
  const {
    data: dataTeams,
    error: errorTeams,
    loading: loadingTeams
  } = useGetAllTeamsForUserQuery();

  const { action, channel, invitees, thread, viewing } = router.query;

  function handleUrlParam(param: UrlParamType): string | null {
    if (typeof param === "string") {
      return param;
    }
    if (Array.isArray(param)) {
      return param[0];
    } else {
      return null;
    }
  }

  useEffect(() => {
    viewControllerDispatch({
      type: "changeTeamId",
      payload: dataTeams?.getAllTeamsForUser?.[0].teamId ?? null
    });

    if (typeof viewing === "string") {
      viewControllerDispatch({
        type: "changeDisplayToMatchRoute",
        payload: {
          action: handleUrlParam(action),
          channelId: handleUrlParam(channel),
          header: invitees ? JSON.parse(invitees as string) : null,
          threadId: handleUrlParam(thread),
          viewing: viewing as ViewerType
        }
      });
    }
  }, [viewControllerDispatch, dataTeams, router.pathname, router.query]);

  const messagesData = [
    { id: 1, message: "message-one" },
    { id: 2, message: "message-two" },
    { id: 3, message: "message-three" },
    { id: 4, message: "message-one" },
    { id: 5, message: "message-two" },
    { id: 6, message: "message-three" },
    { id: 7, message: "message-one" },
    { id: 8, message: "message-two" },
    { id: 9, message: "message-three" },
    { id: 10, message: "message-one" },
    { id: 11, message: "message-two" },
    { id: 12, message: "message-three" },
    { id: 13, message: "message-one" },
    { id: 14, message: "message-two" },
    { id: 15, message: "message-three" }
  ];

  return (
    <Grid
      height="100%"
      gridTemplateColumns="100px 250px 1fr"
      gridTemplateRows="auto 1fr auto"
    >
      <GridItem
        id="teams"
        gridColumn={1}
        gridRow="1/4"
        bg="#362234"
        color="#958993"
      >
        <Flex alignItems="center" justifyContent="center">
          <Text>Teams</Text>
        </Flex>
        <TeamsStack data={dataTeams} viewerDispatch={viewControllerDispatch} />
      </GridItem>
      <Flex
        id="channels"
        flexDirection="column"
        gridColumn={2}
        gridRow="1/4"
        color="#fff"
        bg="#4e3a4c"
        overflow="auto"
      >
        <Flex p={2} pl={3} flexDirection="column">
          {otherStuff.map((item) => (
            <Flex key={item}>ICON {item}</Flex>
          ))}
        </Flex>
        <ControllerAccordion
          router={router}
          teamId={viewControllerState.teamIdShowing}
        />
      </Flex>

      <GridItem
        id="teams"
        gridColumn={3}
        gridRow={1}
        borderBottom="1px solid #eee"
      >
        <Flex>
          <Heading>{viewControllerState.viewerDisplayed.viewing}</Heading>

          <HStack>
            <AvatarGroup size="md" max={3} pl={2}>
              {viewControllerState.viewerDisplayed.header?.map(
                ({ id, username }) => {
                  return (
                    <Avatar
                      key={id}
                      name={username ? username : undefined}
                      // src="https://bit.ly/broken-link"
                    />
                  );
                }
              )}
            </AvatarGroup>
          </HStack>
        </Flex>
      </GridItem>

      {viewControllerState.teamIdShowing &&
      viewControllerState.viewerDisplayed.viewing === "channel_browser" ? (
        <RenderChannelStack>
          {action === "add_channel" ? (
            <Flex>
              <CreateChannelForm teamId={viewControllerState.teamIdShowing} />
            </Flex>
          ) : null}
        </RenderChannelStack>
      ) : null}
      {viewControllerState.viewerDisplayed.viewing === "messages_browser" ? (
        <Center>ADD TEAMMATE EXPLORER</Center>
      ) : null}
      {viewControllerState.teamIdShowing &&
      // typeof handleUrlParam(threadId) === "string" &&
      viewControllerState.viewerDisplayed.dmThreadId &&
      viewControllerState.viewerDisplayed.viewing === "direct_messages" ? (
        <RenderMessagesStack
          teamId={viewControllerState.teamIdShowing}
          threadId={viewControllerState.viewerDisplayed.dmThreadId}
        />
      ) : null}

      <Flex id="input" gridColumn={3} gridRow={3}>
        {viewControllerState.viewerDisplayed.dmThreadId &&
        viewControllerState.teamIdShowing ? (
          <AddMessageForm
            invitees={
              invitees && typeof invitees === "string"
                ? JSON.parse(invitees).map(({ id }) => id)
                : []
            }
            name="message_text"
            teamId={viewControllerState.teamIdShowing}
            threadId={viewControllerState.viewerDisplayed.dmThreadId}
          />
        ) : null}

        {viewControllerState.viewerDisplayed.channelId &&
        viewControllerState.teamIdShowing ? (
          <>
            <Flex flexDirection="column" w="100%">
              <Input type="text" placeholder="CSS Grid layout module" />
              <Flex id="message-bar" height="2ch" px={3} mb={1}>
                <Text>Example helper message</Text>
              </Flex>
            </Flex>
            <Button>submit</Button>
          </>
        ) : null}
      </Flex>
    </Grid>
  );
};

export default ViewTeamIndex;
