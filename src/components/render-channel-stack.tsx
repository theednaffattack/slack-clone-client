import { VStack, StackDivider, Flex } from "@chakra-ui/react";

type RenderChannelStackProps = {};

export const RenderChannelStack: React.FC<RenderChannelStackProps> = ({
  children
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
      {children}
      <Flex
        w="100%"
        border="2px dashed limegreen"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        CHANNEL BROWSER
      </Flex>
    </VStack>
  );
};