// import { useConfirmUserMutation } from "../../generated/graphql";
import { FetchResult, NormalizedCacheObject } from "@apollo/client";
import { Button, Flex, Heading, Link, Skeleton, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import React from "react";
import { Wrapper } from "../../components/box-wrapper";
import { ConfirmUserDocument } from "../../generated/graphql";
import { initializeApollo } from "../../lib/config.apollo-client";
import { MyContext } from "../../lib/types";

interface ConfirmationProps {
  props: {
    initialApolloState: NormalizedCacheObject;
  };
  revalidate: number;
  userConfirmed: any;
  response:
    | FetchResult<any, Record<string, any>, Record<string, any>>
    | undefined;
  token: string;
}

const Confirmation: NextPage<ConfirmationProps> = ({ response, token }) => {
  // const router = {
  //   query: {
  //     token: "blah"
  //   }
  // };
  // let realToken = "";
  // if (typeof router.query.token === "string") {
  //   realToken = router.query.token;
  // }
  // if (Array.isArray(router.query.token)) {
  //   realToken = router.query.token[0];
  // }
  // const [confirmUser, { error, loading }] = useConfirmUserMutation();
  // useEffect(() => {
  //   console.log("VIEW QUERY OBJECT", router.query);
  //   console.log("VIEW REAL TOKEN", realToken);

  //   confirmUser({
  //     variables: {
  //       token: realToken
  //     }
  //   });
  // }, []);

  if (response && response.errors)
    return (
      <Wrapper>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          children="error"
        />
      </Wrapper>
    );
  if (!response?.errors) {
    return (
      <Wrapper>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading>Confirm User</Heading>
          {JSON.stringify(response, null, 2)}
          Token: {token}
          <Skeleton isLoaded={!response?.data}>
            <Text>Thank you for confirming your account!</Text>
            <NextLink href="/login" passHref>
              <Link>Login</Link>
            </NextLink>
          </Skeleton>
        </Flex>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Flex
          h="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text mt={4}>
            The confirmation link has expired. Your account has not been
            confirmed.
          </Text>
          <Button type="button" mt={4} colorScheme="teal">
            Request a new confirmation
          </Button>
        </Flex>
      </Wrapper>
    );
  }
};

export async function getServerSideProps(ctx: MyContext) {
  if (!ctx.apolloClient) ctx.apolloClient = initializeApollo();

  let response;
  // Take token as a URL param and confirm the user.
  try {
    response = await ctx.apolloClient.mutate({
      mutation: ConfirmUserDocument,
      variables: {
        token: ctx.query.token ? (ctx.query.token as string) : ""
      }
    });
  } catch (error) {
    console.warn("CONFIRMATION GET INITIAL PROPS", error);
  }
  function parseToken(ctx: MyContext): string {
    if (!ctx) {
      throw new Error("Context is undefined!");
    }
    if (!ctx.query.token) {
      throw new Error("Token is undefined!");
    }
    if (typeof ctx.query.token === "string") {
      return ctx.query.token;
    }
    if (Array.isArray(ctx.query.token)) {
      return ctx.query.token[0];
    }
    // we hope is unreachable
    return "token is undreadable";
  }
  return {
    props: {
      initialApolloState: ctx.apolloClient.cache.extract(),

      response,
      userConfirmed: response?.data?.confirmUser,
      token: parseToken(ctx),

      revalidate: 1
    }
  };
}

export default Confirmation;
