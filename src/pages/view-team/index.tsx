import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  StackDivider,
  Text,
  VStack
} from "@chakra-ui/react";
import React from "react";

import { useGetAllTeamsForUserQuery } from "../../generated/graphql";

const ViewTeamIndex = () => {
  const { data, error, loading } = useGetAllTeamsForUserQuery();
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
        Teams
        <VStack id="teams-list" spacing={4} align="stretch" as="ul" h="100%">
          {data &&
          data?.getAllTeamsForUser &&
          data?.getAllTeamsForUser.length > 0 ? (
            data?.getAllTeamsForUser.map(({ id, name }) => (
              <Text key={`${id}-teams-list-${name}`}>{name.charAt(0)}</Text>
            ))
          ) : (
            <Text>Error! Not Teams</Text>
          )}
        </VStack>
      </GridItem>
      <GridItem id="channels" gridColumn={2} gridRow="1/4" bg="#4e3a4c">
        Channels
      </GridItem>

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
      >
        {[
          { id: 1, message: "message-one" },
          { id: 2, message: "message-two" },
          { id: 3, message: "message-three" }
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

{
  /* <div id="chat-layout">
<div id="teams">Teams</div>
<div id="channels">Channels</div>
<div id="header">Header</div>
<div id="messages">
  <ul id="messages-list">
    {[
      { id: 1, message: "message-one" },
      { id: 2, message: "message-two" },
      { id: 3, message: "message-three" }
    ].map(({ id, message }) => {
      return <li key={id + "-" + message}>{message}</li>;
    })}
  </ul>
</div>
<div id="input">
  <input type="text" placeholder="CSS Grid layout module" />
</div>
</div> */
}
