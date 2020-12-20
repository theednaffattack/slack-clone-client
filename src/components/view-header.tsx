import {
  Flex,
  IconButton,
  HStack,
  AvatarGroup,
  Avatar,
  Text
} from "@chakra-ui/react";
import React from "react";
import { AiFillStar, AiOutlineStar, AiOutlineInfoCircle } from "react-icons/ai";
import { BsPersonPlus } from "react-icons/bs";
import { ViewControllerStateType } from "../lib/page-funcs.view-team-state";

interface ViewHeaderProps {
  viewControllerState: ViewControllerStateType;
}

export function ViewHeader({ viewControllerState }: ViewHeaderProps) {
  const favoritedAlready = false;
  return (
    <Flex>
      {viewControllerState.viewerDisplaying.viewing === "channel" ? (
        <Flex alignItems="center" w="100%">
          <Flex alignItems="center" pl={2}>
            <Text fontWeight="bold">
              # {viewControllerState.viewerDisplaying.header?.name}
            </Text>
            <IconButton
              colorScheme="transparent"
              aria-label="favorite icon"
              icon={
                favoritedAlready ? (
                  <AiFillStar size={15} />
                ) : (
                  <AiOutlineStar size={15} />
                )
              }
              // as={favoritedAlready ? AiFillStar : AiOutlineStar}
              color={favoritedAlready ? "goldenrod" : "ThreeDShadow"}
              h={5}
              w={5}
              onClick={() => console.log("FAVORITE BUTTON CLICKED")}
            />
          </Flex>
          <Flex ml="auto" pr={3} alignItems="center">
            <HStack>
              <AvatarGroup size="md" max={3}>
                {viewControllerState.viewerDisplaying.header?.invitees?.map(
                  ({ id, username }) => {
                    return (
                      <Avatar
                        key={id}
                        aria-label="view profile"
                        as="button"
                        name={username ? username : undefined}
                        onClick={() =>
                          console.log("AVATAR (PROFILE) BUTTON CLICKED")
                        }
                        // as="button"
                        // src="https://bit.ly/broken-link"
                      />
                    );
                  }
                )}
              </AvatarGroup>
            </HStack>
            <IconButton
              colorScheme="transparent"
              aria-label="add teammate to channel"
              icon={<BsPersonPlus size={27} />}
              color="ThreeDShadow"
              h={8}
              w={8}
              p={0}
              type="button"
              onClick={() =>
                console.log("ADD TEAMMATE TO CHANNEL ICON BUTTON CLICKED")
              }
            />
            <IconButton
              colorScheme="transparent"
              aria-label={`${viewControllerState.viewerDisplaying.header?.name} information icon`}
              icon={<AiOutlineInfoCircle size={25} />}
              color="ThreeDShadow"
              h={6}
              w={6}
              type="button"
              onClick={() =>
                console.log("CHANNEL INFORMATION PANEL ICON BUTTON CLICKED")
              }
            />
          </Flex>
        </Flex>
      ) : null}

      {viewControllerState.viewerDisplaying.viewing === "direct_messages" ? (
        <>
          <HStack>
            <AvatarGroup size="md" max={3} pl={2}>
              {viewControllerState.viewerDisplaying.header?.invitees?.map(
                ({ id, username }) => {
                  return (
                    <Avatar
                      key={id}
                      name={username ? username : undefined}
                      // src="https://bit.ly/broken-link"
                    />
                  );
                }
              )}
            </AvatarGroup>
          </HStack>
        </>
      ) : null}
    </Flex>
  );
}
