import {
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  VStack
} from "@chakra-ui/react";
import { Router } from "next/router";
import React from "react";
import { GetAllTeamsForUserQuery } from "../generated/graphql";
import { AiOutlinePlusReplacement } from "./ai-outline-plus-replacement";

interface TeamStackProps {
  data: GetAllTeamsForUserQuery | undefined;
  router: Router;
}

export function TeamsStack({ data, router }: TeamStackProps) {
  function handleExploreTeamClick(
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) {
    event.preventDefault();
    // router.push(`/view-team/${id}?viewing=teams_browser&action=find_channel`);

    router.push({
      href: "/view-team/",
      query: { viewing: null, id }
    });
  }
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
              onClick={(event) => handleExploreTeamClick(event, id)}
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
