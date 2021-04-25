import { ApolloCache, ApolloClient, FetchResult } from "@apollo/client";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import produce from "immer";
import React from "react";
import {
  CreateTeamMutation,
  GetAllTeamsForUserDocument,
  GetAllTeamsForUserQuery,
  GetAllTeamsForUserQueryVariables,
  useCreateTeamMutation
} from "../generated/graphql";

// interface AddTeamFormProps {}

export const AddTeamForm: React.FC = () => {
  const [createTeam, { client }] = useCreateTeamMutation();
  return (
    <Formik
      onSubmit={async (values, formikBag) => {
        try {
          const response = await createTeam({
            variables: {
              name: values.name
            },
            update: (cache, result) => addTeamUpdateCache(cache, result, client)
          });

          if (response.data?.createTeam.errors) {
            response.data?.createTeam.errors.forEach(({ field, message }) => {
              formikBag.setFieldError(field, message);
            });
          }
        } catch (error) {
          console.warn("ERROR ADDING TEAM", error);
        }
      }}
      initialValues={{ name: "" }}
    >
      {({ errors, handleSubmit, handleBlur, handleChange, values }) => {
        return (
          <Form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <Flex flexDirection="column" alignItems="center" maxWidth="375px">
              <Flex
                id="add-team-form-wrapper"
                flexDirection="column"
                width="100%"
                maxWidth="325px"
              >
                <Input
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  placeholder="Team name"
                  name="name"
                  value={values.name}
                />
                <Button my={2} type="submit" colorScheme="teal">
                  submit
                </Button>
              </Flex>

              <Flex id="message-bar" height="2ch">
                <Text color="crimson">{errors ? errors.name : null}</Text>
              </Flex>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

function addTeamUpdateCache(
  cache: ApolloCache<CreateTeamMutation>,
  {
    data
  }: FetchResult<CreateTeamMutation, Record<string, any>, Record<string, any>>,
  client: ApolloClient<any>
): void {
  const teamsCache = cache.readQuery<
    GetAllTeamsForUserQuery,
    GetAllTeamsForUserQueryVariables
  >({
    query: GetAllTeamsForUserDocument
  });

  if (teamsCache && data) {
    client.writeQuery<
      GetAllTeamsForUserQuery,
      GetAllTeamsForUserQueryVariables
    >({
      // Use immer to push our new Team
      // onto the end of what's currently
      // in cache, updating the UI.
      data: produce(teamsCache, (staged) => {
        if (staged && data.createTeam.uttData) {
          staged.getAllTeamsForUser.push({
            team: {
              id: data.createTeam.uttData.teamId,
              name: data.createTeam.uttData.name
            },
            teamId: data.createTeam.uttData.teamId,
            userId: data.createTeam.uttData.userId,
            userToTeamId: data.createTeam.uttData.userToTeamId,
            __typename: "UserToTeam"
          });
        } else {
          return;
        }
      }),
      query: GetAllTeamsForUserDocument
    });
  }
}
