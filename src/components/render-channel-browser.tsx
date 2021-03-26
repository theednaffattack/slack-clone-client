import {
  Avatar,
  AvatarGroup,
  Flex,
  StackDivider,
  Text,
  VStack
} from "@chakra-ui/react";
import React from "react";
import { useLoadChannelsByTeamIdQuery } from "../generated/graphql";

interface RenderChannelBrowserProps {
  teamId: string;
}

export const RenderChannelBrowser: React.FC<RenderChannelBrowserProps> = ({
  children,
  teamId
}) => {
  const {
    data: dataChannels
    // error: errorChannels
  } = useLoadChannelsByTeamIdQuery({
    skip: teamId === null,
    variables: { teamId: teamId ? teamId : "" }
  });

  const formattedChannels = [];
  if (dataChannels) {
    for (const channel of dataChannels?.loadChannelsByTeamId) {
      // do stuff
      const formattedInvitees = [];
      if (channel.invitees) {
        for (const person of channel.invitees) {
          formattedInvitees.push(
            <Avatar
              key={`channel-avatar-${person?.id}`}
              name={`${person?.username}`}
              src={person?.profileImageUri ?? undefined}
            />
          );
        }
      }
      formattedChannels.push(
        <Flex key={channel.id} flexDirection="column">
          <Flex>{channel.name}</Flex>
          <Flex>Invitees: {channel.invitees?.length.toString()}</Flex>

          <AvatarGroup size="md" max={2}>
            {formattedInvitees}
          </AvatarGroup>
        </Flex>
      );
    }
  }
  return (
    <VStack
      id="viewer"
      // gridColumn={3}
      // gridRow={2}
      divider={<StackDivider key={Math.random()} borderColor="gray.200" />}
      spacing={4}
      align="stretch"
      as="ul"
      h="100%"
      overflow="auto"
    >
      {children}
      <VStack
        alignItems="center"
        divider={<StackDivider key={Math.random()} borderColor="gray.200" />}
        flexDirection="column"
        w="100%"
        h="100%"
      >
        <Flex>
          <Text>CHANNEL BROWSER</Text>
        </Flex>
        {formattedChannels}
      </VStack>
    </VStack>
  );
};
