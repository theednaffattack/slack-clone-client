import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useCreateChannelMutation } from "../../generated/graphql";

type CreateChannelFormProps = {
  children?: React.ReactNode;
  teamId: string;
};

export function CreateChannelForm({ teamId }: CreateChannelFormProps) {
  const [createChannel, { data, error: errorGql }] = useCreateChannelMutation();
  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={async ({ name }) => {
        try {
          await createChannel({
            variables: {
              input: { name: name, teamId }
            }
          });
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
