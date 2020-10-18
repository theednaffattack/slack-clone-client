import { Box, Link, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { Layout } from "../components/layout.basic";

// import { Navbar } from "../components/navbar-authenticated";
import { createUrqlClient } from "../lib/utilities.create-urql-client";

function Index() {
  return (
    <Layout>
      <Box>
        <Text>Hello world</Text>
        <NextLink href="/create-post" passHref>
          <Link>create post</Link>
        </NextLink>
      </Box>
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
