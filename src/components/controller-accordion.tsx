import { Accordion } from "@chakra-ui/react";
import { Router } from "next/router";
import React, { useReducer } from "react";
import { IconType } from "react-icons";
import {
  useLoadChannelsByTeamIdQuery,
  useLoadDirectMessageThreadsByTeamAndUserQuery
} from "../generated/graphql";
import { ChannelAccordion } from "./channel-accordion";
import { DirectMessagesAccordion } from "./direct-messages-accordion";

type ControllerAccordionProps = {
  router: Router;
  teamId: string | null;
};

const initialControllerState: ControllerState = {
  accordionSectionHover: "is_NOT_Hovering",
  channelTrigger: "is_NOT_Hovering",
  directMessagesTrigger: "is_NOT_Hovering",
  accordionItem: {
    highlightIndex: null,
    highlightName: null,
    event: undefined
  },
  addChannelButton: "is_NOT_Hovering",
  channelAccordion: "is_NOT_Hovering",
  channelBrowserButton: "is_NOT_Hovering",
  messagesAccordion: "is_NOT_Hovering",
  otherItemHover: {
    highlightIndex: null,
    highlightName: null
  }
};

export const ControllerAccordion: React.FC<ControllerAccordionProps> = ({
  router,
  teamId
}) => {
  const [controllerState, controllerDispatch] = useReducer(
    controllerReducer,
    initialControllerState,
    init
  );

  const {
    data: dataFromChannels,
    error: errorFromChannels
  } = useLoadChannelsByTeamIdQuery({
    skip: teamId === null,
    variables: { teamId: teamId || "" }
  });

  const {
    data: dataThreads,
    error: errorThreads
  } = useLoadDirectMessageThreadsByTeamAndUserQuery({
    skip: teamId === null,
    variables: {
      teamId: teamId || ""
    }
  });

  return (
    <Accordion allowToggle allowMultiple defaultIndex={[0, 1]}>
      <ChannelAccordion
        errorFromChannels={errorFromChannels}
        router={router}
        state={controllerState}
        channels={dataFromChannels?.loadChannelsByTeamId ?? []}
        dispatch={controllerDispatch}
      />
      <DirectMessagesAccordion
        errorThreads={errorThreads}
        router={router}
        state={controllerState}
        message_threads={
          dataThreads?.loadDirectMessageThreadsByTeamAndUser ?? []
        }
        dispatch={controllerDispatch}
      />
    </Accordion>
  );
};

export type HoverState = "isHovering" | "is_NOT_Hovering";

type AccordionNames = "channels" | "direct_messages";

type AccordionItemType = {
  highlightName: AccordionNames | null;
  highlightIndex: number | null;
  event: AccordionMouseEvents | undefined;
};

type TopOptionNames = "Threads" | "Mentioned" | "Saved" | "More";

export interface TopOptions {
  text: TopOptionNames;
  name: "threads" | "mentioned" | "saved" | "more";
  icon: IconType | any;
}

type OtherItemType = {
  highlightName: TopOptionNames | null;
  highlightIndex: number | null;
};

export type ControllerState = {
  accordionSectionHover: HoverState;
  channelTrigger: HoverState;
  directMessagesTrigger: HoverState;
  addChannelButton: HoverState;
  channelBrowserButton: HoverState;
  channelAccordion: HoverState;
  messagesAccordion: HoverState;
  accordionItem: AccordionItemType;
  otherItemHover?: OtherItemType;
};

export type AccordionTriggerPanels = "channels" | "direct_messages" | "other";

export type AccordionMouseEvents = "enter" | "leave";

export type ControllerAction =
  | { type: "addButtonHover" }
  | { type: "browserButtonHover" }
  | { type: "channelAccordionHover"; event: AccordionMouseEvents }
  | { type: "messagesAccordionHover"; event: AccordionMouseEvents }
  | {
      type: "channelToggleTriggerHover";
      event: AccordionMouseEvents;
    }
  | {
      type: "messagesToggleTriggerHover";
      event: AccordionMouseEvents;
    }
  | {
      type: "accordionItemHover";
      payload: {
        accordionName: AccordionNames;
        event: AccordionMouseEvents;
        index: number;
      };
    }
  | {
      type: "otherItemHover";
      payload: {
        options: TopOptions;
        event: AccordionMouseEvents;
        index: number;
      };
    };

function controllerReducer(
  state: ControllerState,
  action: ControllerAction
): ControllerState {
  switch (action.type) {
    case "accordionItemHover":
      return {
        addChannelButton: state.addChannelButton,
        accordionItem: {
          highlightName: action.payload.accordionName,
          highlightIndex: action.payload.index,
          event: action.payload.event
        },
        accordionSectionHover: state.accordionSectionHover,
        channelTrigger: state.channelTrigger,
        channelAccordion: state.channelAccordion,
        channelBrowserButton: state.channelBrowserButton,
        directMessagesTrigger: state.directMessagesTrigger,
        messagesAccordion: state.messagesAccordion
      };
    case "channelToggleTriggerHover":
      return {
        addChannelButton: state.addChannelButton,
        accordionItem: state.accordionItem,
        accordionSectionHover: state.accordionSectionHover,
        channelTrigger:
          action.event === "enter" ? "isHovering" : "is_NOT_Hovering",
        channelAccordion: state.channelAccordion,
        channelBrowserButton: state.channelBrowserButton,
        directMessagesTrigger: state.directMessagesTrigger,
        messagesAccordion: state.messagesAccordion
      };
    case "addButtonHover":
      return {
        addChannelButton: "isHovering",
        accordionItem: state.accordionItem,
        accordionSectionHover: state.accordionSectionHover,
        channelTrigger: state.channelTrigger,
        channelAccordion: state.channelAccordion,
        channelBrowserButton: state.channelBrowserButton,
        directMessagesTrigger: state.directMessagesTrigger,
        messagesAccordion: state.messagesAccordion
      };
    case "browserButtonHover":
      return {
        addChannelButton: state.addChannelButton,
        accordionItem: state.accordionItem,
        accordionSectionHover: state.accordionSectionHover,
        channelTrigger: state.channelTrigger,
        channelAccordion: state.channelAccordion,
        channelBrowserButton: "isHovering",
        directMessagesTrigger: state.directMessagesTrigger,
        messagesAccordion: state.messagesAccordion
      };
    case "channelAccordionHover":
      return {
        addChannelButton: state.addChannelButton,
        accordionItem: state.accordionItem,
        accordionSectionHover: state.accordionSectionHover,
        channelTrigger: state.channelTrigger,
        channelAccordion:
          action.event === "enter" ? "isHovering" : "is_NOT_Hovering",
        channelBrowserButton: state.channelBrowserButton,
        directMessagesTrigger: state.directMessagesTrigger,
        messagesAccordion: state.messagesAccordion
      };
    case "messagesAccordionHover":
      return {
        addChannelButton: state.addChannelButton,
        accordionItem: state.accordionItem,
        accordionSectionHover: state.accordionSectionHover,
        channelTrigger: state.channelTrigger,
        channelAccordion: state.channelAccordion,
        channelBrowserButton: state.channelBrowserButton,
        directMessagesTrigger: state.directMessagesTrigger,
        messagesAccordion:
          action.event === "enter" ? "isHovering" : "is_NOT_Hovering"
      };
    case "messagesToggleTriggerHover":
      return {
        addChannelButton: state.addChannelButton,
        accordionItem: state.accordionItem,
        accordionSectionHover: state.accordionSectionHover,
        channelTrigger: state.channelTrigger,
        channelAccordion: state.channelAccordion,
        channelBrowserButton: state.channelBrowserButton,
        directMessagesTrigger:
          action.event === "enter" ? "isHovering" : "is_NOT_Hovering",
        messagesAccordion: state.messagesAccordion
      };
    case "otherItemHover":
      return {
        addChannelButton: state.addChannelButton,
        accordionItem: state.accordionItem,
        accordionSectionHover: state.accordionSectionHover,
        channelTrigger: state.channelTrigger,
        channelAccordion: state.channelAccordion,
        channelBrowserButton: state.channelBrowserButton,
        directMessagesTrigger: state.directMessagesTrigger,
        messagesAccordion: state.messagesAccordion,
        otherItemHover: {
          highlightIndex: 0,
          highlightName: action.payload.options.text
        }
      };
    default:
      return {
        addChannelButton: "is_NOT_Hovering",
        accordionItem: state.accordionItem,
        accordionSectionHover: state.accordionSectionHover,
        channelTrigger: state.channelTrigger,
        channelAccordion: state.channelAccordion,
        channelBrowserButton: "is_NOT_Hovering",
        directMessagesTrigger: state.directMessagesTrigger,
        messagesAccordion: state.messagesAccordion
      };
  }
}

function init(state: ControllerState): ControllerState {
  return state;
}
