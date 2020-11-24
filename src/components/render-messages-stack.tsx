import { Box, StackDivider, VStack } from "@chakra-ui/react";

type FakeMessageType = {
  id: number;
  message: string;
};

export const RenderMessagesStack = ({
  messages
}: {
  messages: FakeMessageType[];
}) => {
  return (
    <VStack
      id="viewer"
      gridColumn={3}
      gridRow={2}
      divider={<StackDivider key={Math.random()} borderColor="gray.200" />}
      spacing={4}
      align="stretch"
      as="ul"
      h="100%"
      overflow="auto"
    >
      {messages.map(({ id, message }, index) => {
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
  );
};
