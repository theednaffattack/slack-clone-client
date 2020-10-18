import React, { useState } from "react";
import { NextPage } from "next";

import { Wrapper } from "../../components/register.wrapper";
import { useConfirmUserMutation } from "../../generated/graphql";
import { Code, Stack, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../lib/utilities.create-urql-client";

const Confirmation: NextPage<{ token: string }> = ({ token }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, confirmUser] = useConfirmUserMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [confirmationError, setConfirmationError] = useState(null);
  // const response = confirmUser({ token })
  //   .then((data) => data)
  //   .catch((err) => setConfirmationError(err.message))
  //   .finally(() => console.log("confrim user fetch compolete"));

  return (
    <Wrapper>
      <>
        Confirmation page
        <Text>{token}</Text>
        <Stack isInline={false}>
          <Code colorScheme="red">{confirmationError}</Code>
          {/* <Code colorScheme="yellow">{response}</Code> */}
        </Stack>
        <Text>{}</Text>
      </>
    </Wrapper>
  );
};

Confirmation.getInitialProps = ({ query }) => {
  return {
    token: query.token as string
  };
};

export default withUrqlClient(createUrqlClient)(Confirmation);
