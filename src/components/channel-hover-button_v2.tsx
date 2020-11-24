import { Button } from "@chakra-ui/react";
import React from "react";
import {
  AccordionTriggerPanels,
  ControllerAction,
  HoverState
} from "./controller-accordion";

type ChannelHoverButtonProps = {
  handleClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  hoverDispatch: React.Dispatch<ControllerAction>;
  hoverState: HoverState; // AccordionMouseEvents;
  name: AccordionTriggerPanels;
};

export const ChannelHoverButton: React.FC<ChannelHoverButtonProps> = ({
  children,
  handleClick,
  hoverDispatch,
  hoverState
  // name
}) => {
  return (
    <Button
      type="button"
      onClick={handleClick}
      bg={hoverState === "isHovering" ? "fade_light" : "transparent"}
      onMouseEnter={(evt) => {
        evt.preventDefault();
        hoverDispatch({
          type: "channelAccordionHover",
          event: "enter"
        });
      }}
      onMouseLeave={(evt) => {
        evt.preventDefault();
        hoverDispatch({ type: "channelAccordionHover", event: "leave" });
      }}
    >
      {children}
    </Button>
  );
};
