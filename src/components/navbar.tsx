import {
  Avatar,
  Box,
  Button,
  Flex,
  Link as ChLink,
  Text
} from "@chakra-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { useLogoutMutation, useMeQuery } from "../generated/graphql";

export function Navbar() {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
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
        <Button
          bg="transparent"
          border="1px solid gray"
          isLoading={logoutFetching}
          onClick={() => {
            logout();

            // router.push("/login");
          }}
        >
          logout
        </Button>
        {/* <Link href="/logout">
          <ChLink>
            <Text>logout</Text>
          </ChLink>
        </Link> */}
      </Flex>
    );
  }
  return (
    <Flex bg="papayawhip" p={4}>
      {body}
    </Flex>
  );
}
