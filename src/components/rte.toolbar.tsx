import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdInsertLink,
  MdLooksOne,
  MdLooksTwo
} from "react-icons/md";
import { GrEmoji } from "react-icons/gr";
import { ReactEditor } from "slate-react";
import { BlockButton } from "./rte.block-button";
import { LinkButton } from "./rte.link-button";
import { MarkButton } from "./rte.mark-button";
import { IoIosAttach, IoIosSend } from "react-icons/io";
import { VscMention } from "react-icons/vsc";

interface ToolbarProps {
  editor: ReactEditor;
}

export function Toolbar({ editor }: ToolbarProps) {
  return (
    <Flex alignItems="center" bg="#f5f6f7">
      <Flex>
        <MarkButton
          editor={editor}
          format="bold"
          icon={MdFormatBold}
          label="bold"
        />
        <MarkButton
          editor={editor}
          format="italic"
          icon={MdFormatItalic}
          label="italic"
        />
        <MarkButton
          editor={editor}
          format="underline"
          icon={MdFormatUnderlined}
          label="underline"
        />
        <MarkButton editor={editor} format="code" icon={MdCode} label="code" />
        <LinkButton
          editor={editor}
          format="link"
          icon={MdInsertLink}
          label="anchor"
        />
        <BlockButton format="heading-one" icon={MdLooksOne} label="h1" />
        <BlockButton format="heading-two" icon={MdLooksTwo} label="h2" />
        <BlockButton format="quote" icon={MdFormatQuote} label="quote" />

        <BlockButton
          format="numbered-list"
          icon={MdFormatListNumbered}
          label="numbered list"
        />
        <BlockButton
          format="bulleted-list"
          icon={MdFormatListBulleted}
          label="bulleted list"
        />
      </Flex>

      <Flex ml="auto">
        <IconButton
          aria-label="mention picker"
          icon={<VscMention size="1.6em" />}
          lineHeight="1.2"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          border="1px"
          px="8px"
          borderRadius="2px"
          fontSize="14px"
          fontWeight="semibold"
          bg="#f5f6f7"
          borderColor="transparent" // "#ccd0d5"
          color="#4b4f56"
          size="sm"
          _hover={{ bg: "#ebedf0" }}
          _active={{
            bg: "#dddfe2",
            transform: "scale(0.98)",
            borderColor: "#bec3c9"
          }}
          _focus={{
            boxShadow:
              "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)"
          }}
          onMouseDown={(event) => {
            event.preventDefault();
            console.log("MENTION PICKER MOUSE DOWN");
          }}
        />
        <IconButton
          aria-label="emoji picker"
          icon={<GrEmoji size="1.3em" />}
          lineHeight="1.2"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          border="1px"
          px="8px"
          borderRadius="2px"
          fontSize="14px"
          fontWeight="semibold"
          bg="#f5f6f7"
          borderColor="transparent" // "#ccd0d5"
          color="#4b4f56"
          size="sm"
          _hover={{ bg: "#ebedf0" }}
          _active={{
            bg: "#dddfe2",
            transform: "scale(0.98)",
            borderColor: "#bec3c9"
          }}
          _focus={{
            boxShadow:
              "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)"
          }}
          onMouseDown={(event) => {
            event.preventDefault();
            console.log("EMOJI PICKER MOUSE DOWN");
          }}
        />
        <IconButton
          aria-label="attach file"
          icon={<IoIosAttach size="1.4em" />}
          lineHeight="1.2"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          border="1px"
          px="8px"
          borderRadius="2px"
          fontSize="14px"
          fontWeight="semibold"
          bg="#f5f6f7"
          borderColor="transparent" // "#ccd0d5"
          color="#4b4f56"
          size="sm"
          _hover={{ bg: "#ebedf0" }}
          _active={{
            bg: "#dddfe2",
            transform: "scale(0.98)",
            borderColor: "#bec3c9"
          }}
          _focus={{
            boxShadow:
              "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)"
          }}
          onMouseDown={(event) => {
            event.preventDefault();
            console.log("ATTACH FILE MOUSE DOWN");
          }}
        />
        <IconButton
          aria-label="send meessage"
          // bg="#f5f6f7"
          border="1px"
          borderRadius="2px"
          borderColor="transparent" // "#ccd0d5"
          color="#f5f6f7" // "#4b4f56"
          colorScheme="teal"
          fontSize="14px"
          fontWeight="semibold"
          icon={<IoIosSend size="1.4em" />}
          lineHeight="1.2"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          px="8px"
          size="sm"
          // _hover={{ bg: "#ebedf0" }}

          _hover={{
            background: "white",
            color: "teal.500",
            borderColor: "teal.500"
          }}
          _active={{
            bg: "#dddfe2",
            transform: "scale(0.98)",
            borderColor: "#bec3c9"
          }}
          _focus={{
            boxShadow:
              "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)"
          }}
          onMouseDown={(event) => {
            event.preventDefault();
            console.log("SEND MESSAGE MOUSE DOWN");
          }}
        />
      </Flex>
    </Flex>
  );
}
