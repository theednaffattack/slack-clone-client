import { Flex, Heading } from "@chakra-ui/react";

interface TeamDetailProps {
  name: string;
}

export function TeamDetail({ name }: TeamDetailProps) {
  return (
    <Flex pt="8em" flexDirection="column">
      <Heading>{name} Detail</Heading>
    </Flex>
  );
}
