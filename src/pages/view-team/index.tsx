import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  StackDivider,
  Text,
  VStack
} from "@chakra-ui/react";

import React, { useEffect, useReducer } from "react";

import {
  AiOutlinePlusReplacement,
  ChannelsList
} from "../../components/channels-list";
import { useGetAllTeamsForUserQuery } from "../../generated/graphql";

type ViewControllerStateType = {
  teamIdShowing: null | string;
};

type ActionType = { type: "changeTeamId"; payload: string | null };

const viewControllerInitialState: ViewControllerStateType = {
  teamIdShowing: null
};

function viewControllerReducer(
  state: ViewControllerStateType,
  action: ActionType
): ViewControllerStateType {
  switch (action.type) {
    case "changeTeamId":
      return {
        teamIdShowing: action.payload
      };

    default:
      return {
        teamIdShowing: state.teamIdShowing
      };
  }
}

function viewControllerInit(): ViewControllerStateType {
  return { teamIdShowing: null };
}

const ViewTeamIndex = () => {
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
  useEffect(() => {
    viewControllerDispatch({
      type: "changeTeamId",
      payload: dataTeams?.getAllTeamsForUser?.[0].teamId ?? null
    });
  }, [viewControllerDispatch, dataTeams]);
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
        <VStack id="teams-list" spacing={4} align="stretch" as="ul">
          {dataTeams &&
          dataTeams?.getAllTeamsForUser &&
          dataTeams?.getAllTeamsForUser.length > 0 ? (
            dataTeams?.getAllTeamsForUser.map(
              ({ teamId: id, team: { name } }) => (
                <Flex key={`${id}-teams-list-${name}`} justifyContent="center">
                  <Button
                    type="button"
                    colorScheme="transparent"
                    onClick={() =>
                      viewControllerDispatch({
                        type: "changeTeamId",
                        payload: id
                      })
                    }
                  >
                    <Heading>{name.charAt(0)}</Heading>
                  </Button>
                </Flex>
              )
            )
          ) : (
            <Text>Error! No Teams</Text>
          )}
          <Flex key="add team button" justifyContent="center">
            <IconButton
              aria-label="add team"
              icon={<AiOutlinePlusReplacement size={20} />}
              type="button"
              onClick={() => console.log("ADD TEAM CLICKED")}
            />
          </Flex>
        </VStack>
      </GridItem>
      <Flex
        id="channels"
        flexDirection="column"
        gridColumn={2}
        gridRow="1/4"
        color="#fff"
        bg="#4e3a4c"
      >
        <Flex pl={2}>Other Stuff</Flex>
        <ChannelsList teamId={viewControllerState.teamIdShowing} />
      </Flex>

      <GridItem id="teams" gridColumn={3} gridRow={1}>
        Header
      </GridItem>

      <VStack
        gridColumn={3}
        gridRow={2}
        divider={<StackDivider key={Math.random()} borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        as="ul"
        h="100%"
        overflow="auto"
      >
        {[
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
        ].map(({ id, message }, index) => {
          return (
            <Box
              key={`${id}-messages-list-${message}`}
              as="li"
              h="40px"
              mt={index === 0 ? "auto" : 2}
              listStyleType="none"
            >
              {message}
            </Box>
          );
        })}
      </VStack>

      <Flex id="input" gridColumn={3} gridRow={3}>
        <Input type="text" placeholder="CSS Grid layout module" />
        <Button>submit</Button>
      </Flex>
    </Grid>
  );
};

export default ViewTeamIndex;
