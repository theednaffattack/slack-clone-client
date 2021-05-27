import { Flex } from "@chakra-ui/layout";
import { ReactChild, ReactChildren } from "react";

interface RenderSingleTeamBrowserProps {
  children: ReactChild | ReactChildren | null;
}

export function RenderSingleTeamBrowser({
  children
}: RenderSingleTeamBrowserProps) {
  return <Flex flexDirection="column">{children}</Flex>;
}
