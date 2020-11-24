import { Box } from "@chakra-ui/react";
import React from "react";
import {
  AccordionTriggerPanels,
  ControllerAction
} from "./controller-accordion";

type ChannelHoverBoxProps = {
  hoverDispatch: React.Dispatch<ControllerAction>;
  hoverState: "isHovering" | "is_NOT_Hovering";
  name: AccordionTriggerPanels;
};

export const ChannelHoverBox: React.FC<ChannelHoverBoxProps> = ({
  children,
  hoverDispatch,
  hoverState,
  name
}) => {
  return (
    <Box
      p={2}
      bg={hoverState === "isHovering" ? "fade_light" : "transparent"}
      onMouseEnter={(evt) => {
        evt.preventDefault();
        if (name === "direct_messages") {
          hoverDispatch({ type: "messagesToggleTriggerHover", event: "enter" });
        }
        if (name === "channels") {
          hoverDispatch({ type: "channelToggleTriggerHover", event: "enter" });
        } else {
          hoverDispatch({
            type: "otherItemHover",
            payload: { name: "Threads", event: "enter", index: 0 }
          });
        }
      }}
      onMouseLeave={(evt) => {
        if (name === "direct_messages") {
          hoverDispatch({
            type: "messagesToggleTriggerHover",
            event: "leave"
          });
        }
        if (name === "channels") {
          hoverDispatch({ type: "channelToggleTriggerHover", event: "leave" });
        } else {
          hoverDispatch({
            type: "otherItemHover",
            payload: { name: "Threads", event: "leave", index: 0 }
          });
        }

        evt.preventDefault();
      }}
    >
      {children}
    </Box>
  );
};
