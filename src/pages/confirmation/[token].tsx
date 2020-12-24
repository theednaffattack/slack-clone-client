// import { useConfirmUserMutation } from "../../generated/graphql";
import { Button, Flex, Heading, Link, Skeleton, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import { Router } from "next/router";
import React, { useEffect } from "react";
import { Wrapper } from "../../components/box-wrapper";
import { useConfirmUserMutation } from "../../generated/graphql";

type ConfirmationProps = {
  router: Router;
};

const Confirmation: NextPage<ConfirmationProps> = ({ router }) => {
  let realToken: string;
  if (typeof router.query.token === "string") {
    realToken = router.query.token;
  }
  if (Array.isArray(router.query.token)) {
    realToken = router.query.token[0];
  }
  const [confirmUser, { error, loading }] = useConfirmUserMutation();
  useEffect(() => {
    confirmUser({
      variables: {
        token: realToken
      }
    });
  }, []);

  if (error)
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
  if (!error) {
    return (
      <Wrapper>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading>Confirm User</Heading>
          <Skeleton isLoaded={!loading}>
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

// Confirmation.getInitialProps = async (ctx: MyContext) => {
//   if (!ctx.apolloClient) ctx.apolloClient = initializeApollo();

//   let response;
//   // Take token as a URL param and confirm the user.
//   try {
//     response = await ctx.apolloClient.mutate({
//       mutation: ConfirmUserDocument,
//       variables: {
//         token: ctx.query.token ? (ctx.query.token as string) : ""
//       }
//     });
//   } catch (error) {
//     console.warn("CONFIRMATION GET INITIAL PROPS", error);
//   }
//   return {
//     props: {
//       initialApolloState: ctx.apolloClient.cache.extract()
//     },
//     revalidate: 1,

//     userConfirmed: response?.data?.confirmUser
//   };
// };

export default Confirmation;
