import { Flex, IconButton, Text, VStack } from "@chakra-ui/react";
import { Router } from "next/router";
import React from "react";
import { GetAllTeamsForUserQuery } from "../generated/graphql";
import { AiOutlinePlusReplacement } from "./ai-outline-plus-replacement";
import { TeamMenuSingleCharacter } from "./teams-single-character";

interface TeamStackProps {
  data: GetAllTeamsForUserQuery | undefined;
  router: Router;
}

export function TeamsStack({ data, router }: TeamStackProps) {
  return (
    <VStack id="teams-list" spacing={4} align="stretch" as="ul">
      {data &&
      data?.getAllTeamsForUser &&
      data?.getAllTeamsForUser.length > 0 ? (
        data?.getAllTeamsForUser.map(({ teamId: id, team: { name } }) => (
          <TeamMenuSingleCharacter
            key={`${id}-teams-list-${name}`}
            id={id}
            name={name}
            router={router}
          />
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
          onClick={() => {
            router.push({
              href: "/view-team/",
              query: { viewing: "teams_browser" }
            });
          }}
        />
      </Flex>
    </VStack>
  );
}
