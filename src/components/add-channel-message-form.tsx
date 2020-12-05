import { Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Node } from "slate";
import { ChannelRichTextInput } from "./channel.rte";

interface AddChannelMessageFormProps {
  name: string;
  placeholder?: string;
  teamId: string;
  channelId: string;
  invitees: string[];
}

const RESET: Node[] = [
  {
    children: [
      {
        text: ""
      }
    ],
    type: "paragraph"
  }
];

export const AddChannelMessageForm: React.FC<AddChannelMessageFormProps> = ({
  teamId,
  channelId,
  invitees
}) => {
  const [formValue, setFormValue] = useState<Node[]>(RESET);

  return (
    <Flex flexDirection="column" w="100%">
      <ChannelRichTextInput
        invitees={invitees}
        channelId={channelId}
        setValue={setFormValue}
        teamId={teamId}
        value={formValue}
      />

      <Flex id="message-bar" height="2ch" px={3} mb={1}>
        <Text>Example helper message</Text>
      </Flex>
    </Flex>
  );
};
