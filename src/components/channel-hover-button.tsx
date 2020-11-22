import { Button } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

interface CustomEventTarget extends EventTarget {
  index: number;
}

interface CustomMouseEvent extends React.MouseEvent<HTMLElement> {
  target: CustomEventTarget;
}

type ChannelHoverButtonProps = {
  handleClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  setTriggerHoverState: Dispatch<
    SetStateAction<"isHovering" | "is_NOT_Hovering">
  >;
  triggerHoverState: "isHovering" | "is_NOT_Hovering";
};

export const ChannelHoverButton: React.FC<ChannelHoverButtonProps> = ({
  children,
  handleClick,
  setTriggerHoverState,
  triggerHoverState
}) => {
  return (
    <Button
      type="button"
      onClick={handleClick}
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
    </Button>
  );
};
