// import { useConfirmUserMutation } from "../../generated/graphql";
import { Button, Stack, Text } from "@chakra-ui/core";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Wrapper } from "../../components/box-wrapper";
import { useConfirmUserMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../lib/utilities.create-urql-client";

const Confirmation: NextPage<{ token: string }> = ({ token }) => {
  const [{ data, fetching }, confirmUser] = useConfirmUserMutation();

  const router = useRouter();

  // confirmUser({
  //   token: typeof router.query.token === "string" ? router.query.token : ""
  // });

  return (
    <Wrapper>
      <>
        Confirmation page
        <Text>{token}</Text>
        <Text>Loading: {fetching.toString()}</Text>
        <Text>Data: {data?.confirmUser.toString()}</Text>
        <Button
          colorScheme="teal"
          type="button"
          onClick={() =>
            confirmUser({
              token:
                typeof router.query.token === "string" ? router.query.token : ""
            })
          }
        >
          submit
        </Button>
        <Stack isInline={false}>
          {/* <Code colorScheme="red">{confirmationError}</Code> */}
          {/* <Code colorScheme="yellow">{response}</Code> */}
        </Stack>
        <Text>{}</Text>
      </>
    </Wrapper>
  );
};

// Confirmation.getInitialProps = ({ query }) => {
//   return {
//     token: query.token as string
//   };
// };

export default withUrqlClient(createUrqlClient)(Confirmation);
