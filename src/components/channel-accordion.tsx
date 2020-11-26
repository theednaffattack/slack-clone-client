import { ApolloError } from "@apollo/client";
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Link,
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
import { Channel, Maybe, User } from "../generated/graphql";
import { AiOutlinePlusReplacement } from "./ai-outline-plus-replacement";
import { ChannelHoverBox } from "./channel-hover-box_v2";
import { ChannelHoverButton } from "./channel-hover-button_v2";
import { ControllerAction, ControllerState } from "./controller-accordion";

export function ChannelAccordion({
  channels,
  dispatch,
  errorFromChannels,
  router,
  state
}: {
  channels:
    | ({
        __typename?: "Channel" | undefined;
      } & Pick<Channel, "id" | "name"> & {
          invitees?:
            | Maybe<
                {
                  __typename?: "User" | undefined;
                } & Pick<User, "id" | "username" | "profileImageUri">
              >[]
            | null
            | undefined;
        })[]
    | undefined;

  dispatch: (value: ControllerAction) => void;
  errorFromChannels: ApolloError | undefined;
  router: Router;
  state: ControllerState;
}) {
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
    router.push("/view-team/?viewing=channel_browser&action=find_channel");
  }

  function handleAddChannelClick() {
    router.push("/view-team/?viewing=channel_browser&action=add_channel");
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
                    <Flex
                      px={4}
                      py={1}
                      key={id}
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
                      <NextLink
                        // href={`/view-team/?viewing=channel&channel=${id}`}
                        href={`/view-team/?viewing=channel&channel=${id}&invitees=${
                          invitees
                            ? invitees
                                .map(({ id }) => {
                                  console.log("VIEW ID IN NEXTLINK MAP", id);

                                  return id;
                                })
                                .join(",")
                            : undefined
                        }`}
                        passHref
                      >
                        <Link># {name}</Link>
                      </NextLink>
                    </Flex>
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
