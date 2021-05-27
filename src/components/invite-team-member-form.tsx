import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import {
  TeamRoleEnum,
  useInviteNewTeamMemberMutation
} from "../generated/graphql";

type InviteTeamMemberFormProps = {
  children?: React.ReactNode;
  teamId: string;
};

export function InviteTeamMemberForm({ teamId }: InviteTeamMemberFormProps) {
  const [
    inviteNewTeamMember,
    { data, error: errorGql, loading }
  ] = useInviteNewTeamMemberMutation();
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={async ({ email }, formikBag) => {
        try {
          const response = await inviteNewTeamMember({
            variables: {
              data: { email: email, teamId, teamRoles: [TeamRoleEnum.Member] }
            }
          });
          console.log("VIEW INVITATION RESPONSE", response);

          formikBag.resetForm({ values: { email: "" } });
        } catch (error) {
          console.warn("INVITE TEAM MEMBER ERROR", error);
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
          <Form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {loading ? (
              <Flex>
                <Text>loading...</Text>
              </Flex>
            ) : null}
            {data ? (
              <Flex>
                <Text>{JSON.stringify(data, null, 2)}</Text>
              </Flex>
            ) : null}
            <Flex
              p={[2]}
              pt={["10px", "20px", "20px", "20px", "55px"]}
              w={["80%"]}
              flexDirection="column"
              alignItems="center"
            >
              {errorGql ? <Flex>{errorGql.message}</Flex> : null}
              {errorsFormik.email ? (
                <Flex>
                  <pre>{JSON.stringify(errorsFormik, null, 2)}</pre>
                </Flex>
              ) : null}
              {data ? (
                <Flex>
                  <Text>success!</Text>
                </Flex>
              ) : null}
              <Flex
                flexDirection="column"
                alignItems="center"
                width={["300px", "300px", "300px", "450px"]}
              >
                <Input
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  id="email"
                  name="email"
                />
                <Button
                  w={["250px", "250px", "250px", "250px", "250px"]}
                  type="submit"
                  colorScheme="teal"
                >
                  invite new team member
                </Button>
              </Flex>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
}
