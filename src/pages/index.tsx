import { Box, Flex, Heading, Link, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import { ImageBase } from "../components/image-base";
import { useGetGlobalPostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../lib/utilities.create-urql-client";

function Index() {
  const [{ data: dataGlobalPosts }] = useGetGlobalPostsQuery();
  const posts = [];
  if (dataGlobalPosts?.getGlobalPosts) {
    for (const post of dataGlobalPosts.getGlobalPosts) {
      posts.push(
        <li key={post.id}>
          <Flex
            borderRadius=".2em"
            boxShadow="2px 2px 2px 1px rgba(0, 0, 0, 0.2)"
            flexDirection="column"
            p={3}
            my={["2em"]}
            width={[1 / 2]}
          >
            <Heading>{post.title}</Heading>

            <ImageBase images={post.images} />
            <Text>{post.created_at}</Text>
            <Text>
              likes:{" "}
              {post.likes && post.likes.length > 0 ? post.likes.length : "0"}
            </Text>

            <Text>{post.text}</Text>
          </Flex>
        </li>
      );
    }
  }
  return (
    <Box>
      <Text>Hello world</Text>
      <NextLink href="/create-post" passHref>
        <Link>create post</Link>
      </NextLink>
      <br />
      <ul>{posts}</ul>
    </Box>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
