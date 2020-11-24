import {
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  VStack
} from "@chakra-ui/react";
import React from "react";
import { AiOutlinePlusReplacement } from "./ai-outline-plus-replacement";

export function TeamsStack({ data, viewerDispatch }) {
  return (
    <VStack id="teams-list" spacing={4} align="stretch" as="ul">
      {data &&
      data?.getAllTeamsForUser &&
      data?.getAllTeamsForUser.length > 0 ? (
        data?.getAllTeamsForUser.map(({ teamId: id, team: { name } }) => (
          <Flex key={`${id}-teams-list-${name}`} justifyContent="center">
            <Button
              type="button"
              colorScheme="transparent"
              onClick={() =>
                viewerDispatch({
                  type: "changeTeamId",
                  payload: id
                })
              }
            >
              <Heading>{name.charAt(0)}</Heading>
            </Button>
          </Flex>
        ))
      ) : (
        <Text>Error! No Teams</Text>
      )}
      <Flex key="add team button" justifyContent="center">
        <IconButton
          aria-label="add team"
          colorScheme="teal"
          _hover={{
            background: "white",
            color: "teal.500"
          }}
          icon={<AiOutlinePlusReplacement size={20} />}
          type="button"
          onClick={() => console.log("ADD TEAM CLICKED")}
        />
      </Flex>
    </VStack>
  );
}
