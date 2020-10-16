import { Avatar, Box, Flex, Link as ChLink, Text } from "@chakra-ui/core";
import Link from "next/link";
import React from "react";
import { useMeQuery } from "../generated/graphql";

export function Navbar() {
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  if (fetching) {
    // fetching
  } else if (!data?.me) {
    // user is not logged in

    body = (
      <Box ml="auto">
        <Link href="/login" passHref>
          <ChLink mr={2}>login</ChLink>
        </Link>
        <Link href="/register" passHref>
          <ChLink mr={2}>register</ChLink>
        </Link>
      </Box>
    );
  } else {
    // logged in
    body = (
      <Flex alignItems="center" ml="auto">
        <Link href="/profile" passHref>
          <ChLink mr={2}>
            <Avatar size="md" name={data.me.username} />
          </ChLink>
        </Link>
        <Link href="/logout">
          <ChLink>
            <Text>logout</Text>
          </ChLink>
        </Link>
      </Flex>
    );
  }
  return (
    <Flex bg="tomato" p={4}>
      {body}
    </Flex>
  );
}
