import { Button, Flex, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import { Router } from "next/router";
import React, { useEffect, useReducer } from "react";
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

  const { action, viewing } = router.query;

  useEffect(() => {
    viewControllerDispatch({
      type: "changeTeamId",
      payload: dataTeams?.getAllTeamsForUser?.[0].teamId ?? null
    });

    if (typeof viewing === "string") {
      viewControllerDispatch({
        type: "changeDisplayToMatchRoute",
        payload: viewing as ViewerType
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
        {/* <ChannelsList teamId={viewControllerState.teamIdShowing} /> */}
        {/* <DirectMessagesList teamId={viewControllerState.teamIdShowing} /> */}
      </Flex>

      <GridItem
        id="teams"
        gridColumn={3}
        gridRow={1}
        borderBottom="1px solid #eee"
      >
        Header
      </GridItem>

      {viewControllerState.teamIdShowing &&
      viewControllerState.viewerDisplayed === "channel_browser" ? (
        <RenderChannelStack>
          {action === "add_channel" ? (
            <Flex>
              <CreateChannelForm teamId={viewControllerState.teamIdShowing} />
            </Flex>
          ) : null}
        </RenderChannelStack>
      ) : null}
      {viewControllerState.viewerDisplayed === "messages_browser" ? (
        <RenderMessagesStack messages={messagesData} />
      ) : null}

      <Flex id="input" gridColumn={3} gridRow={3}>
        <Input type="text" placeholder="CSS Grid layout module" />
        <Button>submit</Button>
      </Flex>
    </Grid>
  );
};

export default ViewTeamIndex;
