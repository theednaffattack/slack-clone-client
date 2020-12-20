import { Flex, Text } from "@chakra-ui/react";
import { AddTeamForm } from "./add-team-form";

export function TeamExplorer() {
  return (
    <Flex pt="8em" flexDirection="column">
      <Text>Add a Team to get started</Text>
      <AddTeamForm />
    </Flex>
  );
}
