import { VStack, StackDivider, Flex } from "@chakra-ui/react";

export const RenderChannelBrowser: React.FC = ({ children }) => {
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
      {children}
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        CHANNEL BROWSER
      </Flex>
    </VStack>
  );
};
