import { Center, Flex, Grid, GridItem } from "@chakra-ui/react";
import cookie from "cookie";
import { NextPage } from "next";
import { Router } from "next/router";
import React, { useEffect, useReducer } from "react";
import { AddChannelMessageForm } from "../../components/add-channel-message-form";
import { AddMessageForm } from "../../components/add-direct-message-form";
import { ControllerAccordion } from "../../components/controller-accordion";
import { CreateChannelForm } from "../../components/create-channel-form";
import { RenderChannelBrowser } from "../../components/render-channel-browser";
import { RenderChannelStack } from "../../components/render-channel-stack";
import { RenderMessagesStack } from "../../components/render-messages-stack";
import { ShortcutsPanel } from "../../components/shortcuts-panel";
import { TeamExplorer } from "../../components/team-explorer";
import { TeamMenuAllCharacters } from "../../components/team-menu-all-characters";
import { TeamsStack } from "../../components/teams-stack";
import { ViewHeader } from "../../components/view-header";
import withApollo from "../../components/with-apollo";
import { useGetAllTeamsForUserQuery } from "../../generated/graphql";
import {
  viewControllerInit,
  viewControllerInitialState,
  viewControllerReducer,
  ViewerType
} from "../../lib/page-funcs.view-team-state";
import { MyContext } from "../../lib/types";

type UrlParamType = string | string[] | undefined;

interface ParseDestructure {
  id: any;
}

interface ViewTeamIndexProps {
  accessToken: string;
  router: Router;
  // syncLogout: (e: any) => void;
}

const ViewTeamIndex: NextPage<ViewTeamIndexProps> = ({
  router
  // syncLogout
}) => {
  const [viewControllerState, viewControllerDispatch] = useReducer(
    viewControllerReducer,
    viewControllerInitialState,
    viewControllerInit
  );
  const { data: dataTeams } = useGetAllTeamsForUserQuery();

  const {
    action,
    channel,
    teamId,
    name,
    invitees,
    thread,
    viewing
  } = router.query;

  function handleUrlParam(param: UrlParamType): string {
    if (typeof param === "string") {
      return param;
    }
    if (Array.isArray(param)) {
      return param[0];
    } else {
      return "";
    }
  }

  useEffect(() => {
    const realId = handleUrlParam(teamId)
      ? handleUrlParam(teamId)
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
      w="100%"
      // gridTemplateColumns={
      //   // dataTeams &&
      //   // dataTeams.getAllTeamsForUser?.length > 0 &&
      //   // viewControllerState.viewerDisplaying.viewing !== "teams_browser"
      //   //   ? "100px 250px 1fr"
      //   //   : "100px 1fr"
      //   ["100px 250px 1fr"]
      // }
      // gridTemplateRows="auto 1fr auto"
      sx={{
        "@media only screen and (min-width: 600px)": {
          gridTemplateColumns: "100px 250px 1fr",

          gridTemplateRows: "auto 1fr auto"
        },
        gridTemplateColumns: "1fr"
      }}
    >
      {/* BEG - TEAM COLUMN */}

      <GridItem
        bg="#362234"
        color="#958993"
        id="teams"
        overflow="auto"
        sx={{
          "@media only screen and (max-width: 600px)": {
            display: "none"
          },
          gridColumn: 1,
          gridRow: "1/4"
        }}
      >
        <TeamsStack
          teamIdShowing={viewControllerState.teamIdShowing}
          data={dataTeams}
          router={router}
        />
      </GridItem>
      {/* END - TEAM COLUMN */}

      {/* BEG - CONTROLLER COLUMN */}
      <GridItem
        bg="#4e3a4c"
        color="#fff"
        gridColumn={2}
        gridRow="1/4"
        overflow="auto"
        sx={{
          "@media only screen and (max-width: 600px)": {
            display: "none"
          }
        }}
      >
        {viewControllerState.teamIdShowing !== null &&
        viewControllerState.viewerDisplaying.viewing !== "teams_browser" ? (
          <Flex
            id="controller"
            flexDirection="column"
            height="100%"
            // gridColumn={2}
            // gridRow="1/4"
            // overflow="auto"
          >
            <TeamMenuAllCharacters
              dataTeams={dataTeams}
              router={router}
              viewControllerDispatch={viewControllerDispatch}
              viewControllerState={viewControllerState}
            />
            <ShortcutsPanel />
            <ControllerAccordion
              router={router}
              teamId={viewControllerState.teamIdShowing}
            />
          </Flex>
        ) : null}
      </GridItem>

      {/* END - CONTROLLER COLUMN */}

      {/* BEG - HEADER  */}
      {viewControllerState.teamIdShowing !== null &&
      viewControllerState.viewerDisplaying.viewing !== "teams_browser" ? (
        <GridItem
          id="header"
          // gridColumn={
          //   dataTeams && dataTeams.getAllTeamsForUser?.length > 0 ? 3 : 2
          // }
          gridRow={1}
          borderBottom="1px solid #eee"
          sx={{
            "@media only screen and (min-width: 600px)": {
              gridColumn:
                dataTeams && dataTeams.getAllTeamsForUser?.length > 0 ? 3 : 2
            },
            gridColumn: "1/4"
          }}
          height="100%"
        >
          <Flex display="flex" flexDirection="column">
            <Flex
              bg="#362234"
              color="#fff"
              id="team-menu-controller"
              flexDirection="column"
              height="100%"
              sx={{
                "@media only screen and (min-width: 600px)": {
                  display: "none"
                }
              }}
              // gridColumn={2}
              // gridRow="1/4"
              // overflow="auto"
            >
              <TeamMenuAllCharacters
                dataTeams={dataTeams}
                router={router}
                viewControllerDispatch={viewControllerDispatch}
                viewControllerState={viewControllerState}
              />
            </Flex>

            {viewControllerState.viewerDisplaying.viewing !==
            "channel_browser" ? (
              <ViewHeader viewControllerState={viewControllerState} />
            ) : null}
          </Flex>
        </GridItem>
      ) : null}
      {/* END - HEADER  */}
      {/* BEG - TEAMS EXPLORER  */}
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
      {/* BEG - TEAMS EXPLORER  */}

      {/* BEG - CHANNEL EXPLORER  */}
      {viewControllerState.teamIdShowing &&
      viewControllerState.viewerDisplaying.viewing === "channel_browser" ? (
        <RenderChannelBrowser teamId={viewControllerState.teamIdShowing}>
          {action === "add_channel" ? (
            <Flex
              alignItems="center"
              justifyContent="center"
              // sx={{
              //   "@media only screen and (max-width: 600px)": {
              //     gridColumn: "1/4"
              //   },
              //   // gridColumn: 1,
              //   gridRow: "1/4"
              // }}

              sx={{
                "@media only screen and (min-width: 600px)": {
                  gridColumn: 3
                },
                gridColumn: "1/4"
              }}
            >
              <CreateChannelForm teamId={viewControllerState.teamIdShowing} />
            </Flex>
          ) : null}
        </RenderChannelBrowser>
      ) : null}
      {/* END - CHANNEL EXPLORER  */}

      {/* BEG - DIRECT MESSAGES EXPLORER  */}
      {viewControllerState.viewerDisplaying.viewing === "messages_browser" ? (
        <Center>ADD TEAMMATE EXPLORER</Center>
      ) : null}
      {/* END - DIRECT MESSAGES EXPLORER  */}

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
      {/* BEG - INPUT */}
      <Flex
        id="input"
        // gridColumn={3}
        gridRow={3}
        sx={{
          "@media only screen and (min-width: 600px)": {
            gridColumn: 3
          },
          gridColumn: "1/4"
        }}
      >
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
        ) : null}
      </Flex>

      {/* END - INPUT */}
    </Grid>
  );
};

export async function getServerSideProps(ctx: MyContext) {
  let response;
  const cookiePrefix = process.env.NEXT_PUBLIC_COOKIE_PREFIX ?? "";
  const url = process.env.NEXT_PUBLIC_DEVELOPMENT_REFRESH_TOKEN_ADDRESS ?? "";
  const reqCookie = ctx.req?.headers.cookie ?? "";
  const cookies = cookie.parse(reqCookie);

  // Try to find our cookie. If it exists,
  // fetch our access token from the server.
  if (cookies[cookiePrefix]) {
    try {
      //
      response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          cookie: `${cookiePrefix}=` + cookies[cookiePrefix]
        }
      });

      if (!response) {
        return {
          props: {
            redirect: {
              destination: "/",
              permanent: false
            }
          }
        };
      }

      const respData = await response.json();

      return { props: { accessToken: respData.accessToken } };
      // setAccessToken(accessToken);
    } catch (err) {
      console.error("FETCH ERROR - REFRESH", err);
    }
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }
}

export default withApollo(ViewTeamIndex);
