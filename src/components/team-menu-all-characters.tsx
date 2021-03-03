import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Portal,
  Text
} from "@chakra-ui/react";
import { Router } from "next/router";
import { GetAllTeamsForUserQuery } from "../generated/graphql";
import {
  ActionType,
  ViewControllerStateType
} from "../lib/page-funcs.view-team-state";

export function TeamMenuAllCharacters({
  dataTeams,
  // router,
  viewControllerDispatch,
  viewControllerState
}: {
  dataTeams: GetAllTeamsForUserQuery | undefined;
  router: Router;
  viewControllerState: ViewControllerStateType;
  viewControllerDispatch: React.Dispatch<ActionType>;
}) {
  return (
    <Flex>
      <Menu>
        <MenuButton
          as={Button}
          // colorScheme="pink"
          bg="transparent"
          borderWidth="1px"
          borderColor="transparent"
          rightIcon={<ChevronDownIcon />}
          size="sm"
          transition="all 0.2s"
          borderRadius="md"
          _hover={{ borderColor: "gray.400" }}
          _expanded={{ bg: "transparent" }}
          _focus={{ boxShadow: "outline" }}
        >
          <Text size="sm">Workspace name</Text>
        </MenuButton>
        <Portal>
          <MenuList id="my-list">
            <Flex>
              <Text>
                {
                  dataTeams?.getAllTeamsForUser.filter(
                    ({ teamId }) => teamId === viewControllerState.teamIdShowing
                  )[0].team.name
                }
              </Text>
            </Flex>
            <MenuGroup title="">
              <MenuItem
                isTruncated
                onClick={() => {
                  console.log("Invite people clicked");

                  viewControllerDispatch({
                    type: "displayInviteTeamMember"
                  });
                }}
              >
                Invite people to{" "}
                {
                  dataTeams?.getAllTeamsForUser.filter(
                    ({ teamId }) => teamId === viewControllerState.teamIdShowing
                  )[0].team.name
                }
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup>
              <MenuItem>Jump to a specific date</MenuItem>
            </MenuGroup>
          </MenuList>
        </Portal>
      </Menu>
    </Flex>
  );
}
