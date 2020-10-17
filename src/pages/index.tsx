import { Box, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";

import { Navbar } from "../components/navbar";
import { createUrqlClient } from "../lib/utilities.create-urql-client";

function Index() {
  return (
    <>
      <Navbar />
      <Box>
        <Text>Hello world</Text>
      </Box>
    </>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
