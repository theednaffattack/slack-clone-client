import { Avatar, Box, Button, Flex, Link as ChLink } from "@chakra-ui/core";
import Link from "next/link";
import React from "react";

import { MeQuery, useLogoutMutation } from "../generated/graphql";

type NavbarProps = {
  dataMe?: MeQuery;
  loadingMe?: boolean;
};

export function Navbar({ dataMe }: NavbarProps) {
  const [logout, { loading: loadingLogout }] = useLogoutMutation();

  // user is not logged in
  let body = (
    <>
      <Link href="/login" passHref>
        <ChLink mr={2}>login</ChLink>
      </Link>
      <Link href="/register" passHref>
        <ChLink mr={2}>register</ChLink>
      </Link>
    </>
  );
  // if (fetchingMe) {
  //   // fetching
  // } else
  if (dataMe?.me) {
    // logged in
    body = (
      <>
        <Link href="/profile" passHref>
          <ChLink mr={2}>
            <Avatar size="md" name={dataMe.me?.username} />
          </ChLink>
        </Link>
        <Button
          bg="transparent"
          border="1px solid gray"
          isLoading={loadingLogout}
          onClick={async () => {
            await logout();
          }}
        >
          logout
        </Button>
      </>
    );
  }
  return (
    <Flex alignItems="center" bg="papayawhip" p={4}>
      <Box mr={2}>Branding</Box>
      <Box mr={2}>
        <Link href="/" passHref>
          <ChLink mr={2}>home</ChLink>
        </Link>
      </Box>
      <Box mr={2}>
        <Link href="/create-post" passHref>
          <ChLink mr={2}>create post</ChLink>
        </Link>
      </Box>

      <Box ml="auto">{body}</Box>
    </Flex>
  );
}
