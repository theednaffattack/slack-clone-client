import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal
} from "@chakra-ui/react";
import { Router } from "next/router";
import React from "react";

export function TeamMenuSingleCharacter({
  id,
  name,
  router
}: {
  id: string;
  name: string;
  router: Router;
}) {
  function handleInviteTeamMemberClick(
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) {
    event.preventDefault();
    // router.push(`/view-team/${id}?viewing=teams_browser&action=find_channel`);

    router.push({
      href: "/view-team/",
      query: { viewing: "teams_invite_member", id }
    });
  }
  return (
    <Menu>
      <MenuButton
        as={Button}
        // colorScheme="pink"
        bg="transparent"
        borderWidth="1px"
        borderColor="transparent"
        rightIcon={<ChevronDownIcon />}
        size="lg"
        transition="all 0.2s"
        borderRadius="md"
        _hover={{ borderColor: "gray.400" }}
        _expanded={{ bg: "transparent" }}
        _focus={{ boxShadow: "outline" }}
      >
        <Heading size="2xl">{name.charAt(0)}</Heading>
      </MenuButton>
      <Portal>
        <MenuList id="team-menu">
          <Flex>
            <Heading>{name}</Heading>
          </Flex>
          <MenuItem
            isTruncated
            onClick={(evt) => {
              handleInviteTeamMemberClick(evt, id);
            }}
          >
            Invite people to {name}
          </MenuItem>
          <MenuDivider />
          <MenuItem>Preferences</MenuItem>
          <MenuDivider />
          <MenuItem>Customize</MenuItem>
          <MenuDivider />
          <MenuItem>Tools</MenuItem>
          <MenuDivider />
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
}
