import { Avatar, Button, Text } from "@chakra-ui/core";

import { Layout } from "../components/layout.basic";
import { useMeQuery } from "../generated/graphql";

function Profile() {
  const { data } = useMeQuery();

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

export default Profile;
