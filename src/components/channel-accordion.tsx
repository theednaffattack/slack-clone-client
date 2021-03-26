import { ApolloError } from "@apollo/client";
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Text
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Router } from "next/router";
import React from "react";
import {
  AiFillCaretDown,
  AiFillCaretRight,
  AiOutlineSearch
} from "react-icons/ai";
import { LoadChannelsByTeamIdQuery } from "../generated/graphql";
import { AiOutlinePlusReplacement } from "./ai-outline-plus-replacement";
import { ChannelHoverBox } from "./channel-hover-box_v2";
import { ChannelHoverButton } from "./channel-hover-button_v2";
import { ControllerAction, ControllerState } from "./controller-accordion";

interface ChannelAccordionProps {
  channels: LoadChannelsByTeamIdQuery["loadChannelsByTeamId"];
  dispatch: (value: ControllerAction) => void;
  errorFromChannels: ApolloError | undefined;
  router: Router;
  state: ControllerState;
  teamId: string | null;
}

export function ChannelAccordion({
  channels,
  dispatch,
  errorFromChannels,
  router,
  state,
  teamId
}: ChannelAccordionProps) {
  const { channel: channelBase } = router.query;

  let channel: string;
  if (typeof channelBase === "string") {
    channel = channelBase;
  }
  if (Array.isArray(channelBase)) {
    channel = channelBase[0];
  }
  // if (typeof channelBase === "undefined") {
  //   channel = "no_id";
  // }
  function handleExploreChannelClick() {
    router.push(
      `/view-team/?teamId=${teamId}&viewing=channel_browser&action=find_channel`
    );
  }

  function handleAddChannelClick() {
    router.push(
      `/view-team/?teamId=${teamId}&viewing=channel_browser&action=add_channel`
    );
  }

  return (
    <AccordionItem>
      {({ isExpanded }) => {
        return (
          <>
            <Flex
              alignItems="center"
              onMouseEnter={() =>
                dispatch({
                  type: "channelAccordionHover",
                  event: "enter"
                })
              }
              onMouseLeave={() =>
                dispatch({
                  type: "channelAccordionHover",
                  event: "leave"
                })
              }
              position="relative"
            >
              <AccordionButton px={0} py={2}>
                <ChannelHoverBox
                  hoverState={state.channelTrigger}
                  hoverDispatch={dispatch}
                  name="channels"
                >
                  {isExpanded ? (
                    <AiFillCaretDown size={20} />
                  ) : (
                    <AiFillCaretRight size={20} />
                  )}
                </ChannelHoverBox>

                <Box flex="1" textAlign="left">
                  <Text fontWeight={isExpanded ? "inherit" : "bold"}>
                    Channels
                  </Text>
                </Box>
              </AccordionButton>

              {state.channelAccordion === "isHovering" ? (
                <ChannelHoverButton
                  hoverDispatch={dispatch}
                  hoverState={state.addChannelButton}
                  name="channels"
                  handleClick={handleExploreChannelClick}
                >
                  <AiOutlineSearch size={25} />
                </ChannelHoverButton>
              ) : null}
            </Flex>
            <AccordionPanel pb={4} px={0}>
              {errorFromChannels ? (
                <Flex key="channels error">{errorFromChannels?.message}</Flex>
              ) : null}
              {!errorFromChannels && channels ? (
                channels.map(({ id, invitees, name }, index) => {
                  let fixedInvitees;
                  if (invitees) {
                    fixedInvitees = invitees?.map((invitedPerson) => {
                      if (invitedPerson) {
                        return {
                          id: invitedPerson.id,
                          profileImageUri: invitedPerson.profileImageUri,
                          username: invitedPerson.username
                        };
                      } else {
                        return {
                          id: "why is this reachable?",
                          profileImageUri: "why is this reachable?",
                          username: "why is this reachable?"
                        };
                      }
                    });
                  }
                  const {
                    accordionItem: { event, highlightIndex, highlightName }
                  } = state;
                  const enterBg = {
                    highlight:
                      highlightName === "channels" &&
                      highlightIndex === index &&
                      event === "enter",
                    highlightColor: "rgba(0,0,0,0.175)"
                  };

                  return (
                    <NextLink
                      key={id}
                      href={{
                        pathname: `/view-team`,
                        query: {
                          channel: id,
                          invitees: JSON.stringify(fixedInvitees),
                          name: name,
                          teamId,
                          viewing: "channel"
                        }
                      }}
                      passHref
                    >
                      <a>
                        <Flex
                          px={4}
                          py={1}
                          bg={
                            channel === id
                              ? "#319795"
                              : enterBg.highlight
                              ? enterBg.highlightColor
                              : "transparent"
                          }
                          onMouseEnter={() =>
                            dispatch({
                              type: "accordionItemHover",
                              payload: {
                                accordionName: "channels",
                                event: "enter",
                                index: index
                              }
                            })
                          }
                          onMouseLeave={() =>
                            dispatch({
                              type: "accordionItemHover",
                              payload: {
                                accordionName: "channels",
                                event: "leave",
                                index: index
                              }
                            })
                          }
                        >
                          <Text isTruncated># {name}</Text>
                        </Flex>
                      </a>
                    </NextLink>
                  );
                })
              ) : (
                <Text>Please add channesl(s) to get started.</Text>
              )}
              <Flex p={3}>
                <ButtonGroup size="sm" isAttached variant="outline">
                  <IconButton
                    aria-label="Add to friends"
                    icon={<AiOutlinePlusReplacement />}
                    onClick={handleAddChannelClick}
                  />
                  <Button
                    type="button"
                    mr="-px"
                    onClick={handleAddChannelClick}
                  >
                    Add channels
                  </Button>
                </ButtonGroup>
              </Flex>
            </AccordionPanel>
          </>
        );
      }}
    </AccordionItem>
  );
}
