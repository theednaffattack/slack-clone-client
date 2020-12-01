import { Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import produce from "immer";
import React, { useState } from "react";
import { Node } from "slate";
import {
  LoadDirectMessagesThreadByIdDocument,
  LoadDirectMessagesThreadByIdQuery,
  LoadDirectMessagesThreadByIdQueryVariables,
  LoadDirectMessageThreadsByTeamAndUserDocument,
  LoadDirectMessageThreadsByTeamAndUserQuery,
  LoadDirectMessageThreadsByTeamAndUserQueryVariables,
  useAddMessageToChannelMutation
} from "../generated/graphql";
import { Preview } from "./rte.preview";
import { RichTextInput } from "./rte_v2";

interface AddChannelMessageFormProps {
  name: string;
  placeholder?: string;
  teamId: string;
  channelId: string;
  invitees: string[];
}

const RESET: Node[] = [
  {
    children: [
      {
        text: ""
      }
    ],
    type: "paragraph"
  }
];

export const AddChannelMessageForm: React.FC<AddChannelMessageFormProps> = ({
  placeholder,
  teamId,
  channelId,
  invitees
}) => {
  const [addMessage, { client }] = useAddMessageToChannelMutation();

  const [formValue, setFormValue] = useState<Node[]>(RESET);

  return (
    <Formik
      onSubmit={async (values, formikBag) => {
        try {
          await addMessage({
            variables: {
              data: {
                channelId,
                teamId,
                invitees,
                sentTo: "",
                message: values.message_text
              }
            },
            update: (cache, { data }) => {
              const dmControllerCache = cache.readQuery<
                LoadDirectMessageThreadsByTeamAndUserQuery,
                LoadDirectMessageThreadsByTeamAndUserQueryVariables
              >({
                query: LoadDirectMessageThreadsByTeamAndUserDocument,
                variables: { teamId }
              });

              const dmMessageThreadCache = cache.readQuery<
                LoadDirectMessagesThreadByIdQuery,
                LoadDirectMessagesThreadByIdQueryVariables
              >({
                query: LoadDirectMessagesThreadByIdDocument,
                variables: { teamId, threadId }
              });

              // Update Viewer (showing Message Thread)
              // Check if we have both cache and 'data'
              // our mutation response.
              if (dmMessageThreadCache && data) {
                client.writeQuery<
                  LoadDirectMessagesThreadByIdQuery,
                  LoadDirectMessagesThreadByIdQueryVariables
                >({
                  // Use immer to push our new message
                  // onto the end of what's currently
                  // in cache, updating the UI.
                  data: produce(dmMessageThreadCache, (staged) => {
                    if (staged) {
                      staged.loadDirectMessagesThreadById.messages?.push(
                        data.addDirectMessageToThread.message
                      );
                    } else {
                      return dmMessageThreadCache;
                    }
                  }),
                  query: LoadDirectMessagesThreadByIdDocument,
                  variables: { teamId, threadId }
                });
              }

              // Update DM Controller Cache (sidebar accordion)
              if (dmControllerCache && data) {
                cache.writeQuery<
                  LoadDirectMessageThreadsByTeamAndUserQuery,
                  LoadDirectMessageThreadsByTeamAndUserQueryVariables
                >({
                  data: produce(dmControllerCache, (draft) => {
                    if (draft) {
                      const threadToUpdate = draft.loadDirectMessageThreadsByTeamAndUser
                        .map(({ id }) => id)
                        .indexOf(data.addDirectMessageToThread.threadId);

                      draft.loadDirectMessageThreadsByTeamAndUser[
                        threadToUpdate
                      ].last_message =
                        data.addDirectMessageToThread.message.message;
                    }
                  }),
                  query: LoadDirectMessageThreadsByTeamAndUserDocument,
                  variables: { teamId }
                });
              }
            }
          });
          formikBag.resetForm({
            values: {
              message_text: RESET
            }
          });
        } catch (error) {
          console.warn("ERROR ADDING MESSAGE TO DM THREAD", error);
        }
      }}
      initialValues={{
        message_text: [
          {
            children: [
              {
                text: ""
              }
            ]
          }
        ]
      }}
    >
      {({ handleSubmit, handleBlur, handleChange, setFieldValue, values }) => {
        return (
          <Form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <Preview formValue={formValue} />

            <RichTextInput value={formValue} setValue={setFormValue} />

            <Flex id="message-bar" height="2ch" px={3} mb={1}>
              <Text>Example helper message</Text>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};
