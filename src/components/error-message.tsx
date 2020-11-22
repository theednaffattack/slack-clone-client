import { Flex } from "@chakra-ui/react";
import React from "react";

export function ErrorMessage({ message }: { message: string }) {
  return (
    <Flex as="aside" p="1.5em" textColor="white" backgroundColor="red">
      {message}
    </Flex>
  );
}
