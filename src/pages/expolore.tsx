import { Box, Link, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import { GlobalPostsStack } from "../components/home.global-posts";
import { useGetGlobalPostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../lib/utilities.create-urql-client";

function Index() {
  const [{ data: dataGlobalPosts }] = useGetGlobalPostsQuery();

  return (
    <Box>
      <Text>Hello world</Text>
      <NextLink href="/create-post" passHref>
        <Link>create post</Link>
      </NextLink>
      <GlobalPostsStack posts={dataGlobalPosts?.getGlobalPosts} />
    </Box>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
