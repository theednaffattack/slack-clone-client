import { Avatar, Button, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";

import { Layout } from "../components/layout.basic";
import { useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../lib/utilities.create-urql-client";

function Profile() {
  const [{ data }] = useMeQuery();

  return (
    <Layout>
      <>
        <Avatar size="lg" name={data?.me?.username} />
        <Text fontSize="3xl">{data?.me?.username}</Text>
        <Button type="button" colorScheme="teal">
          jsut a button
        </Button>
      </>
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient)(Profile);
