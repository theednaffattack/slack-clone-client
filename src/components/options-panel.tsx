import { Flex, Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import { GrChat } from "react-icons/gr";

import { TopOptions } from "./controller-accordion";
import { GrChatReplacement } from "./gr-chat-replacement";

const options: TopOptions[] = [
  { text: "Threads", name: "threads", icon: GrChatReplacement },
  { text: "Saved", name: "saved", icon: BsBookmark },
  { text: "Mentioned", name: "mentioned", icon: GrChat },
  { text: "More", name: "more", icon: BsThreeDots }
];

export function OptionsPanel() {
  return (
    <Flex id="top-options" flexDirection="column">
      {options.map((item, index) => (
        <Link href="#" key={`${index}-${item.name}`} passHref>
          <HoverLink>
            <Flex pl={3} py={1} key={item.name} alignItems="center">
              <Box pr={2}>
                <item.icon color="#fff" size="1.2em" />
              </Box>

              <Text isTruncated>{item.text}</Text>
            </Flex>
          </HoverLink>
        </Link>
      ))}
    </Flex>
  );
}

interface HoverLinkProps {
  children: React.ReactNode;
}

function HoverLink({ children }: HoverLinkProps) {
  const [hoverState, setHoverState] = useState<
    "is_hovering" | "is_not_hovering"
  >("is_not_hovering");
  function handleMouseEnter() {
    setHoverState("is_hovering");
  }
  function handleMouseLeave() {
    setHoverState("is_not_hovering");
  }
  return (
    <a
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor:
          hoverState === "is_hovering" ? "rgba(0,0,0,0.25)" : "transparent"
      }}
    >
      {children}
    </a>
  );
}
