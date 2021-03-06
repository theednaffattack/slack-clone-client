import { Flex, Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import { TopOptions } from "./controller-accordion";
import { GrChatReplacement } from "./gr-chat-replacement";
import { MentionIcon } from "./mention-icon";

const options: TopOptions[] = [
  { text: "Threads", name: "threads", icon: GrChatReplacement },
  { text: "Saved", name: "saved", icon: BsBookmark },
  { text: "Mentioned", name: "mentioned", icon: MentionIcon },
  { text: "More", name: "more", icon: BsThreeDots }
];

// const moreOptions = [
//   { text: "Invite Team Members", name: "invite", icon: GrChatReplacement }
// ];

export function ShortcutsPanel() {
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
    <Flex id="top-options" flexDirection="column" py={2}>
      {options.map((item, index) => (
        <Link href="#" key={`${index}-${item.name}`} passHref>
          <a
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundColor:
                hoverState === "is_hovering"
                  ? "rgba(0,0,0,0.25)"
                  : "transparent"
            }}
          >
            <Flex pl={3} py={1} key={item.name} alignItems="center">
              <Box pr={2}>
                <item.icon
                  color="#fff"
                  size={item.name === "mentioned" ? "2em" : "1.2em"}
                  w={"1.3em"}
                  h={"1.3em"}
                />
              </Box>

              <Text isTruncated>{item.text}</Text>
            </Flex>
          </a>
        </Link>
      ))}
    </Flex>
  );
}

// interface HoverLinkProps {
//   children: React.ReactNode;
// }

// function HoverLink({ children }: HoverLinkProps) {
//   const [hoverState, setHoverState] = useState<
//     "is_hovering" | "is_not_hovering"
//   >("is_not_hovering");
//   function handleMouseEnter() {
//     setHoverState("is_hovering");
//   }
//   function handleMouseLeave() {
//     setHoverState("is_not_hovering");
//   }
//   return (
//     <a
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       style={{
//         backgroundColor:
//           hoverState === "is_hovering" ? "rgba(0,0,0,0.25)" : "transparent"
//       }}
//     >
//       {children}
//     </a>
//   );
// }
