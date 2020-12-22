import { Center, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { Router } from "next/router";
import React, { useEffect, useReducer } from "react";
import { AddChannelMessageForm } from "../../components/add-channel-message-form";
import { AddMessageForm } from "../../components/add-direct-message-form";
import { ControllerAccordion } from "../../components/controller-accordion";
import { RenderChannelBrowser } from "../../components/render-channel-browser";
import { RenderChannelStack } from "../../components/render-channel-stack";
import { RenderMessagesStack } from "../../components/render-messages-stack";
import { ShortcutsPanel } from "../../components/shortcuts-panel";
import { TeamExplorer } from "../../components/team-explorer";
import { TeamsStack } from "../../components/teams-stack";
import { ViewHeader } from "../../components/view-header";
import { useGetAllTeamsForUserQuery } from "../../generated/graphql";
import {
  viewControllerInit,
  viewControllerInitialState,
  viewControllerReducer,
  ViewerType
} from "../../lib/page-funcs.view-team-state";
import { CreateChannelForm } from "../../components/create-channel-form";
type UrlParamType = string | string[] | undefined;

interface ParseDestructure {
  id: any;
}

const ViewTeamIndex = ({ router }: { router: Router }) => {
  const [viewControllerState, viewControllerDispatch] = useReducer(
    viewControllerReducer,
    viewControllerInitialState,
    viewControllerInit
  );
  const { data: dataTeams } = useGetAllTeamsForUserQuery();

  const { action, channel, id, name, invitees, thread, viewing } = router.query;

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
    const realId = handleUrlParam(id)
      ? handleUrlParam(id)
      : dataTeams?.getAllTeamsForUser?.[0]?.teamId;

    viewControllerDispatch({
      type: "changeTeamId",
      payload: realId ?? null
    });

    if (typeof viewing === "string") {
      const buildHeader = channel
        ? {
            name: name ? (name as string) : null,
            invitees: invitees ? JSON.parse(invitees as string) : null
          }
        : {
            name: null,
            invitees: invitees ? JSON.parse(invitees as string) : null
          };

      viewControllerDispatch({
        type: "changeDisplayToMatchRoute",
        payload: {
          action: handleUrlParam(action),
          channelId: handleUrlParam(channel),
          header: buildHeader,
          threadId: handleUrlParam(thread),
          viewing: viewing as ViewerType
        }
      });
    }
  }, [viewControllerDispatch, dataTeams, router.pathname, router.query]);
  return (
    <Grid
      height="100%"
      gridTemplateColumns={
        dataTeams &&
        dataTeams.getAllTeamsForUser?.length > 0 &&
        viewControllerState.viewerDisplaying.viewing !== "teams_browser"
          ? "100px 250px 1fr"
          : "100px 1fr"
      }
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
        <TeamsStack data={dataTeams} router={router} />
      </GridItem>
      {viewControllerState.teamIdShowing !== null &&
      viewControllerState.viewerDisplaying.viewing !== "teams_browser" ? (
        <Flex
          id="controller"
          flexDirection="column"
          gridColumn={2}
          gridRow="1/4"
          color="#fff"
          bg="#4e3a4c"
          overflow="auto"
        >
          <ShortcutsPanel />
          <ControllerAccordion
            router={router}
            teamId={viewControllerState.teamIdShowing}
          />
        </Flex>
      ) : null}
      {viewControllerState.teamIdShowing !== null &&
      viewControllerState.viewerDisplaying.viewing !== "teams_browser" ? (
        <GridItem
          id="header"
          gridColumn={
            dataTeams && dataTeams.getAllTeamsForUser?.length > 0 ? 3 : 2
          }
          gridRow={1}
          borderBottom="1px solid #eee"
        >
          <ViewHeader viewControllerState={viewControllerState} />
        </GridItem>
      ) : null}
      {viewControllerState.teamIdShowing === null ||
      viewControllerState.viewerDisplaying.viewing === "teams_browser" ? (
        <Flex
          gridColumn={2}
          gridRow="2/3"
          flexDirection="column"
          height="100%"
          alignItems="center"
        >
          <TeamExplorer />
        </Flex>
      ) : null}

      {viewControllerState.teamIdShowing &&
      viewControllerState.viewerDisplaying.viewing === "channel_browser" ? (
        <RenderChannelBrowser>
          {action === "add_channel" ? (
            <Flex>
              <CreateChannelForm teamId={viewControllerState.teamIdShowing} />
            </Flex>
          ) : null}
        </RenderChannelBrowser>
      ) : null}
      {viewControllerState.viewerDisplaying.viewing === "messages_browser" ? (
        <Center>ADD TEAMMATE EXPLORER</Center>
      ) : null}
      {viewControllerState.teamIdShowing &&
      viewControllerState.viewerDisplaying.dmThreadId &&
      viewControllerState.viewerDisplaying.viewing === "direct_messages" ? (
        <RenderMessagesStack
          teamId={viewControllerState.teamIdShowing}
          threadId={viewControllerState.viewerDisplaying.dmThreadId}
        />
      ) : null}
      {viewControllerState.teamIdShowing &&
      viewControllerState.viewerDisplaying.channelId ? (
        <RenderChannelStack
          teamId={viewControllerState.teamIdShowing}
          channelId={viewControllerState.viewerDisplaying.channelId}
        />
      ) : null}
      <Flex id="input" gridColumn={3} gridRow={3}>
        {viewControllerState.viewerDisplaying.dmThreadId &&
        viewControllerState.viewerDisplaying.dmThreadId !== null &&
        viewControllerState.teamIdShowing ? (
          <AddMessageForm
            invitees={
              invitees && typeof invitees === "string"
                ? JSON.parse(invitees).map(({ id }: ParseDestructure) => id)
                : []
            }
            name="message_text"
            teamId={viewControllerState.teamIdShowing}
            threadId={viewControllerState.viewerDisplaying.dmThreadId}
          />
        ) : null}

        {viewControllerState.viewerDisplaying.channelId &&
        viewControllerState.teamIdShowing ? (
          <>
            <AddChannelMessageForm
              invitees={
                invitees && typeof invitees === "string"
                  ? JSON.parse(invitees).map(({ id }: ParseDestructure) => id)
                  : []
              }
              name="message_text"
              teamId={viewControllerState.teamIdShowing}
              channelId={viewControllerState.viewerDisplaying.channelId}
              channelName={
                viewControllerState.viewerDisplaying.header?.name ?? ""
              }
            />
          </>
        ) : null}
      </Flex>
    </Grid>
  );
};

export default ViewTeamIndex;
