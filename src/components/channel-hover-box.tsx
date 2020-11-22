import { Box } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

type ChannelHoverBoxProps = {
  setTriggerHoverState: Dispatch<
    SetStateAction<"isHovering" | "is_NOT_Hovering">
  >;
  triggerHoverState: "isHovering" | "is_NOT_Hovering";
};

export const ChannelHoverBox: React.FC<ChannelHoverBoxProps> = ({
  children,
  setTriggerHoverState,
  triggerHoverState
}) => {
  return (
    <Box
      bg={triggerHoverState === "isHovering" ? "fade_light" : "transparent"}
      onMouseEnter={(evt) => {
        evt.preventDefault();
        setTriggerHoverState("isHovering");
      }}
      onMouseLeave={(evt) => {
        evt.preventDefault();
        setTriggerHoverState("is_NOT_Hovering");
      }}
    >
      {children}
    </Box>
  );
};
