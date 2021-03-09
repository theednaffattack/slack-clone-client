import { Button, Heading } from "@chakra-ui/react";
import { Router } from "next/router";
import React from "react";

export function TeamMenuSingleCharacter({
  id,
  name,
  router,
  selected
}: {
  id: string;
  name: string;
  router: Router;
  selected: boolean;
}) {
  return (
    <Button
      _hover={{ borderColor: "gray.400" }}
      _expanded={{ bg: "transparent" }}
      _focus={{ boxShadow: "outline" }}
      bg="transparent"
      borderColor={selected ? "limegreen" : "transparent"}
      borderRadius="md"
      borderWidth="1px"
      onClick={(evt) => {
        evt.preventDefault();
        router.push(`/view-team/${id}`);
      }}
      size="lg"
      transition="all 0.2s"
    >
      <Heading size="2xl">{name.charAt(0)}</Heading>
    </Button>
  );
}
