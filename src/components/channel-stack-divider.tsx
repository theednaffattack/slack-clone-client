import { Flex } from "@chakra-ui/react";
import React, { CSSProperties } from "react";

interface ChannelStackDividerProps {
  children?: React.ReactNode;
  position?: CSSProperties["position"];
}

export function ChannelStackDivider({
  children,
  position
}: ChannelStackDividerProps) {
  return (
    <Flex
      key={`custom-stack-divider`}
      borderColor="#E2E8F0"
      borderWidth="0"
      width="auto"
      height="auto"
      borderBottomWidth="1px"
      position={position}
      my="1rem"
      top={position === "sticky" ? 0 : undefined}
      zIndex={1}
    >
      {children}
    </Flex>
  );
}
