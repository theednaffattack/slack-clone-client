import { Button, Flex, Text } from "@chakra-ui/core";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useCreateOrUpdateLikesMutation } from "../generated/graphql";

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
  const [
    createOrUpdateLikes,
    { data: dataLikes, error: errorLikes, loading: loadingLikes }
  ] = useCreateOrUpdateLikesMutation({ variables: { input: { postId } } });

  console.log("LIKES MUTATION", { dataLikes, errorLikes, loadingLikes });
  return (
    <Flex alignItems="center" justifyContent="space-around">
      <Flex>
        {currently_liked ? (
          <Button
            type="button"
            bg="transparent"
            onClick={() => createOrUpdateLikes()}
          >
            <AiFillHeart fill="crimson" size="2em" />
          </Button>
        ) : (
          <Button
            type="button"
            bg="transparent"
            onClick={() => createOrUpdateLikes()}
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
  );
}
