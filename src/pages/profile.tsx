import React from "react";

import { Avatar, Box, Button, Text } from "@chakra-ui/core";

import { Wrapper } from "../components/register.wrapper";
import { useMeQuery } from "../generated/graphql";

function Login() {
  const [{ data, error, fetching }] = useMeQuery();

  return (
    <Wrapper>
      <Box>
        <Avatar size="lg" name={data?.me?.username} />
        <Text fontSize="3xl">{data?.me?.username}</Text>
        <Button type="button" colorScheme="teal">
          jsut a button
        </Button>
      </Box>
    </Wrapper>
  );
}

export default Login;
