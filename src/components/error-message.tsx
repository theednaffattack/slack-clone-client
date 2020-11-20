import { Flex } from "@chakra-ui/core";
import React from "react";

export function ErrorMessage({ message }: { message: string }) {
  return (
    <Flex as="aside" p="1.5em" textColor="white" backgroundColor="red">
      {message}
    </Flex>
  );
}
