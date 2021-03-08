import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

function Index() {
  return (
    <Flex flexDirection="column" alignItems="center">
      Lame
      <Link href="/view-team">
        <a>view team</a>
      </Link>
      <Link href="/login">
        <a>login</a>
      </Link>
      {/*       
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
      </Stack> */}
      {/* <GlobalPostsStack
        posts={dataPosts?.getGlobalPostsRelay?.edges}
        postsError={errorPosts}
        postsFetching={loadingPosts}
      /> */}
    </Flex>
  );
}

export default Index;
