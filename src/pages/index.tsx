import { Box, Text } from "@chakra-ui/core";
import { Navbar } from "../components/navbar";

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

export default Index;
