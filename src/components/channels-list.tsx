import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex as FlexBase,
  Text
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
import {
  AiFillCaretDown,
  AiFillCaretRight,
  AiOutlinePlus
} from "react-icons/ai";

import { useLoadChannelsByTeamIdQuery } from "../generated/graphql";
import { ChannelHoverBox } from "./channel-hover-box";
import { ChannelHoverButton } from "./channel-hover-button";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChannelsListProps {
  teamId: string | null;
}

const Flex = styled(FlexBase)`
  /* &:focus-within {
    border-color: black;
    box-shadow: 0 0 0 3px #2bbaa4;
  }
  & select {
    font-weight: bold;
  } */
  /* & :hover {
    background-color: rgba(255, 255, 255, 0.3);
  } */
`;

export const ChannelsList: React.FC<ChannelsListProps> = ({ teamId }) => {
  const [hoverState, setHoverState] = useState<
    "isHovering" | "is_NOT_Hovering"
  >("is_NOT_Hovering");
  const [channelTriggerHoverState, setChannelTriggerHoverState] = useState<
    "isHovering" | "is_NOT_Hovering"
  >("is_NOT_Hovering");
  const [channelAddHoverState, setChannelAddHoverState] = useState<
    "isHovering" | "is_NOT_Hovering"
  >("is_NOT_Hovering");

  const {
    data: dataFromChannels,
    error: errorFromChannels
  } = useLoadChannelsByTeamIdQuery({
    skip: teamId === null,
    variables: { teamId: teamId || "" }
  });

  return (
    <Accordion allowToggle>
      <AccordionItem>
        {({ isExpanded }) => {
          return (
            <>
              <Flex
                alignItems="center"
                onMouseEnter={() => setHoverState("isHovering")}
                onMouseLeave={() => setHoverState("is_NOT_Hovering")}
                position="relative"
              >
                <AccordionButton>
                  {isExpanded ? (
                    <ChannelHoverBox
                      triggerHoverState={channelTriggerHoverState}
                      setTriggerHoverState={setChannelTriggerHoverState}
                    >
                      <AiFillCaretDown size={20} />
                    </ChannelHoverBox>
                  ) : (
                    <ChannelHoverBox
                      triggerHoverState={channelTriggerHoverState}
                      setTriggerHoverState={setChannelTriggerHoverState}
                    >
                      <AiFillCaretRight size={20} />
                    </ChannelHoverBox>
                  )}

                  <Box flex="1" textAlign="left">
                    <Text fontWeight={isExpanded ? "inherit" : "bold"}>
                      Channels
                    </Text>
                  </Box>
                </AccordionButton>

                {hoverState === "isHovering" ? (
                  <ChannelHoverButton
                    handleClick={() => console.log("NEW CHANNEL CLICKED")}
                    triggerHoverState={channelAddHoverState}
                    setTriggerHoverState={setChannelAddHoverState}
                  >
                    <AiOutlinePlusReplacement size={20} />
                  </ChannelHoverButton>
                ) : null}
              </Flex>
              <AccordionPanel pb={4}>
                {errorFromChannels ? (
                  <Flex key="channels error">{errorFromChannels?.message}</Flex>
                ) : null}
                {!errorFromChannels &&
                dataFromChannels &&
                dataFromChannels.loadChannelsByTeamId &&
                dataFromChannels.loadChannelsByTeamId.length > 0 ? (
                  dataFromChannels.loadChannelsByTeamId.map(({ id, name }) => (
                    <Flex key={id}>{name}</Flex>
                  ))
                ) : (
                  <Text>Please add channesl(s) to get started.</Text>
                )}
                <Flex justifyContent="center">
                  <Button
                    type="button"
                    colorScheme="teal"
                    onClick={() => console.log("add channel clicked")}
                  >
                    add channel
                  </Button>
                </Flex>
              </AccordionPanel>
            </>
          );
        }}
      </AccordionItem>
    </Accordion>
  );
};

export const AiOutlinePlusReplacement = (props) => {
  const {
    props: {
      attr: { pId, ...rest },
      children: [defs, ...paths]
    }
  } = AiOutlinePlus({});

  const SAFE_PATHS = paths.map(
    ({ type, props: { pId: pathId, ...pathProps } }) =>
      React.createElement(type, pathProps)
  );
  const SAFE_CHILDREN = React.Children.toArray([defs, ...SAFE_PATHS]);
  const SAFE_PROPS = { attr: rest, ...props };

  return React.cloneElement(AiOutlinePlus({}), SAFE_PROPS, SAFE_CHILDREN);
};
