import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text
} from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";

import { LikesAndCommentsSummary } from "../components/home.global-feed.likes";
import { useGetGlobalPostsRelayQuery } from "../generated/graphql";
function Index() {
  const initialGlobalPostsVariables = {
    after: null,
    before: null,
    first: 2,
    last: null
  };
  // const [variables, setVariables] = useState<{
  //   after?: null | string;
  //   before?: null | string;
  //   first: number | null;
  //   last?: number | null;
  // }>(initialGlobalPostsVariables);

  const {
    data: dataPosts,
    // error,
    fetchMore: fetchMorePosts
  } = useGetGlobalPostsRelayQuery({
    variables: initialGlobalPostsVariables
  });

  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex alignItems="center" width={[1 / 2, 1 / 2, 1 / 2, "900px"]}>
        <Heading>Branding</Heading>

        <NextLink href="/create-post" passHref>
          <Link ml="auto">create post</Link>
        </NextLink>
      </Flex>
      
      <Stack mb={50}>
        {dataPosts
          ? dataPosts.getGlobalPostsRelay?.edges.map(
              ({
                node: {
                  created_at,
                  id,
                  images,
                  title,
                  text,
                  comments_count,
                  currently_liked,
                  likes_count
                }
              }) => {
                return (
                  <Box key={id}>
                    <Heading>{title}</Heading>
                    <Box maxWidth="350px">
                      <Image src={images && images[0] ? images[0].uri : ""} />
                      <Flex>
                      <Text ml="auto">{created_at}</Text>
                      </Flex>
                      <Text>{text}</Text>
                    </Box>


                    <LikesAndCommentsSummary
                      comments_count={comments_count}
                      currently_liked={currently_liked}
                      likes_count={likes_count}
                      postId={id ? id : ""}
                    />
                  </Box>
                );
              }
            )
          : ""}
        {dataPosts?.getGlobalPostsRelay?.pageInfo.hasNextPage === true ? (
          <Button
            colorScheme="teal"
            type="button"
            onClick={() => {
              fetchMorePosts({
                variables: {
                  first: initialGlobalPostsVariables.first,
                  after:
                    dataPosts?.getGlobalPostsRelay?.edges[
                      dataPosts?.getGlobalPostsRelay?.edges.length - 1
                    ].node.created_at
                }
              });
            }}
          >
            load more
          </Button>
        ) : null}
      </Stack>
      {/* <GlobalPostsStack
        posts={dataPosts?.getGlobalPostsRelay?.edges}
        postsError={errorPosts}
        postsFetching={loadingPosts}
      /> */}
    </Flex>
  );
}

export default Index;
