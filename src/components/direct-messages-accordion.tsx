import { ApolloError } from "@apollo/client";
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Avatar,
  AvatarBadge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Text
} from "@chakra-ui/react";
import { Router } from "next/router";
import NextLink from "next/link";
import React from "react";
import {
  AiFillCaretDown,
  AiFillCaretRight,
  AiOutlineSearch
} from "react-icons/ai";
import { Thread, User } from "../generated/graphql";
import { AiOutlinePlusReplacement } from "./ai-outline-plus-replacement";
import { ChannelHoverBox } from "./channel-hover-box_v2";
import { ChannelHoverButton } from "./channel-hover-button_v2";
import { ControllerAction, ControllerState } from "./controller-accordion";

export function DirectMessagesAccordion({
  message_threads,
  dispatch,
  errorThreads,
  router,
  state
}: {
  message_threads: Array<
    { __typename?: "Thread" } & Pick<Thread, "id" | "last_message"> & {
        invitees: Array<
          { __typename?: "User" } & Pick<User, "id" | "username">
        >;
      }
  >;
  dispatch: React.Dispatch<ControllerAction>;
  errorThreads: ApolloError | undefined;
  router: Router;
  state: ControllerState;
}) {
  const { thread: threadBase } = router.query;

  let thread: string;
  if (typeof threadBase === "string") {
    thread = threadBase;
  }
  if (Array.isArray(threadBase)) {
    thread = threadBase[0];
  }

  function handleExploreChannelClick() {
    router.push({
      href: "/view-team/",
      query: { viewing: "channel_browser", action: "search_direct_messages" }
    });
  }

  function handleAddNewDirectMessageClick() {
    router.push({
      href: "/view-team",
      query: { viewing: "messages_browser", action: "add_teammates" }
    });
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
                  type: "messagesAccordionHover",
                  event: "enter"
                })
              }
              onMouseLeave={() =>
                dispatch({
                  type: "messagesAccordionHover",
                  event: "leave"
                })
              }
              position="relative"
            >
              <AccordionButton px={0} py={2}>
                <ChannelHoverBox
                  hoverState={state.directMessagesTrigger}
                  hoverDispatch={dispatch}
                  name="direct_messages"
                >
                  {isExpanded ? (
                    <AiFillCaretDown size={20} />
                  ) : (
                    <AiFillCaretRight size={20} />
                  )}
                </ChannelHoverBox>

                <Box flex="1" textAlign="left">
                  <Text fontWeight={isExpanded ? "inherit" : "bold"}>
                    Direct Messages
                  </Text>
                </Box>
              </AccordionButton>

              {state.messagesAccordion === "isHovering" ? (
                <ChannelHoverButton
                  hoverDispatch={dispatch}
                  hoverState={state.addChannelButton}
                  name="direct_messages"
                  handleClick={handleExploreChannelClick}
                >
                  <AiOutlineSearch size={25} />
                </ChannelHoverButton>
              ) : null}
            </Flex>
            <AccordionPanel pb={4} px={0}>
              {errorThreads ? (
                <Flex key="direct messages error">{errorThreads?.message}</Flex>
              ) : null}
              {!errorThreads && message_threads ? (
                message_threads.map(({ id, last_message, invitees }, index) => {
                  const {
                    accordionItem: { event, highlightIndex, highlightName }
                  } = state;
                  const enterBg = {
                    highlight:
                      highlightName === "direct_messages" &&
                      highlightIndex === index &&
                      event === "enter",
                    highlightColor: "rgba(0,0,0,0.175)"
                  };

                  // const params = {
                  //   viewing: "direct_messages",
                  //   thread: id,
                  //   invitees: invitees?.map(({ id: inviteId }) => {
                  //     return inviteId;
                  //   })
                  // };

                  // const url = qs.stringify(params, { encodeValuesOnly: true });

                  return (
                    <NextLink
                      key={id}
                      href={{
                        pathname: `/view-team`,
                        query: {
                          viewing: "direct_messages",
                          thread: id,
                          invitees: JSON.stringify(invitees)
                        }
                      }}
                      passHref
                    >
                      <a
                      // href={`/view-team/?${url}`}
                      // onClick={(event) => {
                      //   event.preventDefault();
                      //   router.push({
                      //     href: "/view-team",
                      //     query: {
                      //       viewing: "direct_messages",
                      //       thread: id,
                      //       invitees: JSON.stringify(invitees)
                      //     }
                      //   });
                      // }}
                      >
                        <Flex
                          px={4}
                          py={1}
                          alignItems="center"
                          bg={
                            thread === id
                              ? "#319795"
                              : enterBg.highlight
                              ? enterBg.highlightColor
                              : "transparent"
                          }
                          // color={thread === id ? "dark" : "inherit"}
                          onMouseEnter={() =>
                            dispatch({
                              type: "accordionItemHover",
                              payload: {
                                accordionName: "direct_messages",
                                event: "enter",
                                index: index
                              }
                            })
                          }
                          onMouseLeave={() =>
                            dispatch({
                              type: "accordionItemHover",
                              payload: {
                                accordionName: "direct_messages",
                                event: "leave",
                                index: index
                              }
                            })
                          }
                        >
                          <Avatar boxSize="1.5em" mr={2}>
                            <AvatarBadge
                              borderColor="papayawhip"
                              bg="tomato"
                              boxSize=".75em"
                            />
                          </Avatar>

                          <Text isTruncated>{last_message}</Text>
                        </Flex>
                      </a>
                    </NextLink>
                  );
                })
              ) : (
                <Text>No direct messages</Text>
              )}
              <Flex p={3}>
                <ButtonGroup size="sm" isAttached variant="outline">
                  <IconButton
                    aria-label="Add to friends"
                    icon={<AiOutlinePlusReplacement />}
                    onClick={handleAddNewDirectMessageClick}
                  />
                  <Button
                    type="button"
                    mr="-px"
                    onClick={handleAddNewDirectMessageClick}
                  >
                    Create direct message
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
