import { Avatar, Box, Button, Flex, Link as ChLink } from "@chakra-ui/core";
import Link from "next/link";
import React from "react";

import { MeQuery, useLogoutMutation } from "../generated/graphql";

type NavbarProps = {
  dataMe?: MeQuery;
  fetchingMe?: boolean;
};

export function Navbar({ dataMe }: NavbarProps) {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  // const [{ data, fetching }] = useMeQuery({
  //   // Do not run this query on the server.
  //   pause: isServer()
  // });

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
        {dataMe.me?.username.toString()}
        <Link href="/profile" passHref>
          <ChLink mr={2}>
            <Avatar size="md" name={dataMe.me?.username} />
          </ChLink>
        </Link>
        <Button
          bg="transparent"
          border="1px solid gray"
          isLoading={logoutFetching}
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
    <Flex bg="papayawhip" p={4}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
}
