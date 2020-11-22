import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  CloseButton,
  Flex,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import {
  PostConnection,
  useCreateOrUpdateLikesMutation
} from "../generated/graphql";

type LikesAndCommentsSummaryProps = {
  comments_count: number;
  currently_liked: boolean;
  likes_count: number;
  postId: string;
};

export function LikesAndCommentsSummary({
  comments_count,
  currently_liked,
  likes_count,
  postId
}: LikesAndCommentsSummaryProps) {
  const [errorFlashes, setErrorFlashes] = useState<"hidden" | "visible">(
    "hidden"
  );
  const [createOrUpdateLikes] = useCreateOrUpdateLikesMutation({
    variables: { input: { postId } }
  });

  return (
    <>
      <Flex>
        {errorFlashes === "visible" ? (
          <ErrorFlash
            errorMessage="Login to vote."
            setErrorFlashes={setErrorFlashes}
          />
        ) : (
          ""
        )}
      </Flex>
      <Flex alignItems="center" justifyContent="space-around">
        <Flex>
          {currently_liked ? (
            <Button
              type="button"
              bg="transparent"
              onClick={async () => {
                try {
                  await createOrUpdateLikes({
                    update(cache, { data: likeData }) {
                      cache.modify({
                        fields: {
                          getGlobalPostsRelay(existingPosts): PostConnection {
                            const {
                              edges,
                              __typename,
                              pageInfo
                            } = existingPosts as any;

                            const postToUpdate = edges.filter(
                              ({ node }: any) =>
                                node.__ref ===
                                `GlobalPostReturnType:${likeData?.createOrUpdateLikes?.postId}`
                            );
                            return {
                              edges: [
                                {
                                  __typename: "PostEdge",
                                  cursor: postToUpdate[0].node.created_at,
                                  node: {
                                    comments_count: comments_count,
                                    likes_count:
                                      postToUpdate[0].node.likes_count - 1,
                                    currently_liked: false,
                                    likes: postToUpdate[0].node.likes,
                                    created_at: postToUpdate[0].node.created_at,
                                    __typename: postToUpdate[0].node.__typename,
                                    images: postToUpdate[0].node.images,
                                    text: postToUpdate[0].node.text,
                                    title: postToUpdate[0].node.title,
                                    id: postToUpdate[0].node.id
                                  }
                                }
                              ],
                              __typename,
                              pageInfo
                            };
                          }
                        }
                      });
                    }
                  });
                } catch (error) {
                  console.log(
                    "UPDATE LIKES ERROR - CURRENTLY LIKED",
                    error.message
                  );
                }
              }}
            >
              <AiFillHeart fill="crimson" size="2em" />
            </Button>
          ) : (
            <Button
              type="button"
              bg="transparent"
              onClick={async () => {
                try {
                  await createOrUpdateLikes({
                    update(cache, { data: likeData }) {
                      cache.modify({
                        fields: {
                          getGlobalPostsRelay(existingPosts): PostConnection {
                            const {
                              edges,
                              __typename,
                              pageInfo
                            } = existingPosts as any;

                            const postToUpdate = edges.filter(
                              ({ node }: any) => {
                                return (
                                  node.__ref ===
                                  `GlobalPostReturnType:${likeData?.createOrUpdateLikes?.postId}`
                                );
                              }
                            );
                            return {
                              edges: [
                                {
                                  __typename: "PostEdge",
                                  cursor: postToUpdate[0].node.created_at,
                                  node: {
                                    comments_count: comments_count,
                                    likes_count:
                                      postToUpdate[0].node.likes_count + 1,
                                    currently_liked: true,
                                    likes: postToUpdate[0].node.likes,
                                    created_at: postToUpdate[0].node.created_at,
                                    __typename: postToUpdate[0].node.__typename,
                                    images: postToUpdate[0].node.images,
                                    text: postToUpdate[0].node.text,
                                    title: postToUpdate[0].node.title,
                                    id: postToUpdate[0].node.id
                                  }
                                }
                              ],
                              __typename,
                              pageInfo
                            };
                          }
                        }
                      });
                    }
                  });
                } catch (error) {
                  console.log(
                    "UPDATE LIKES ERROR - NOT CURRENTLY LIKED",
                    error.message
                  );
                  if (error.message === "Not authenticated") {
                    setErrorFlashes("visible");
                  }
                }
              }}
            >
              <AiOutlineHeart fill="#888" size="2em" />
            </Button>
          )}

          <Text fontSize="1.3em">{likes_count}</Text>
        </Flex>

        <Flex>
          <Button type="button" bg="transparent">
            <FaRegComment fill="#888" size="1.8em" />
          </Button>

          <Text fontSize="1.3em">{comments_count ? comments_count : "0"}</Text>
        </Flex>
      </Flex>
    </>
  );
}

type ErrorFlashProps = {
  errorMessage: string;
  setErrorFlashes: React.Dispatch<React.SetStateAction<"hidden" | "visible">>;
};

function ErrorFlash({ errorMessage, setErrorFlashes }: ErrorFlashProps) {
  return (
    <Alert
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      status="error"
    >
      <Flex>
        <AlertIcon />
        <AlertTitle mr={2}>{errorMessage}</AlertTitle>
      </Flex>
      {/* <AlertDescription>{flash}</AlertDescription> */}
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        disabled={!errorMessage}
        onClick={() => setErrorFlashes("hidden")}
      />
    </Alert>
  );
}
