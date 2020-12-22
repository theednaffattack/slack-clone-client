import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import produce from "immer";
import React from "react";
import {
  LoadChannelsByTeamIdDocument,
  LoadChannelsByTeamIdQuery,
  LoadChannelsByTeamIdQueryVariables,
  useCreateChannelMutation
} from "../generated/graphql";

type CreateChannelFormProps = {
  children?: React.ReactNode;
  teamId: string;
};

export function CreateChannelForm({ teamId }: CreateChannelFormProps) {
  const [
    createChannel,
    { client, data, error: errorGql }
  ] = useCreateChannelMutation();
  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={async ({ name }, formikBag) => {
        try {
          await createChannel({
            update: (cache, { data }) => {
              const channelCache = cache.readQuery<
                LoadChannelsByTeamIdQuery,
                LoadChannelsByTeamIdQueryVariables
              >({
                query: LoadChannelsByTeamIdDocument,
                variables: { teamId }
              });

              if (channelCache && data) {
                client.writeQuery<
                  LoadChannelsByTeamIdQuery,
                  LoadChannelsByTeamIdQueryVariables
                >({
                  query: LoadChannelsByTeamIdDocument,
                  variables: { teamId },
                  data: produce(channelCache, (staged) => {
                    staged.loadChannelsByTeamId.push({
                      __typename: "Channel",
                      name: data.createChannel.name,
                      id: data.createChannel.id,
                      invitees: data.createChannel.invitees
                    });
                  })
                });
              }
            },
            variables: {
              input: { name: name, teamId }
            }
          });
          formikBag.resetForm({ values: { name: "" } });
        } catch (error) {
          console.warn("CREATE CHANNEL ERROR", error);
        }
      }}
    >
      {({
        errors: errorsFormik,
        handleBlur,
        handleChange,
        handleSubmit,
        values
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            {errorGql ? <Flex>{errorGql.message}</Flex> : null}
            {errorsFormik.name ? (
              <Flex>
                <pre>{JSON.stringify(errorsFormik, null, 2)}</pre>
              </Flex>
            ) : null}

            {data ? (
              <Flex>
                <Text>success!</Text>
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
              </Flex>
            ) : null}
            <Input
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              id="name"
              name="name"
            />
            <Button type="submit" colorScheme="teal">
              create channel
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
