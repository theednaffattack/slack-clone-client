import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Link, Text } from "@chakra-ui/core";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { Wrapper } from "../components/flex-wrapper";
import { InputField } from "../components/forms.input-field";
import {
  FieldError,
  RegisterMutation,
  useRegisterMutation
} from "../generated/graphql";
import { toErrorMap } from "../lib/utilities.toErrorMap";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../lib/utilities.create-urql-client";
import { formatValidationErrors } from "../lib/utilities.graphQLErrors.format-validation-errors";

function Register() {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        keepMeSignedIn: true,
        termsAndConditions: true
      }}
      onSubmit={async (values, { setErrors }) => {
        const response = await register({
          data: {
            password: values.password,
            // firstName: "iti2",
            // lastName: "itiToo",
            email: values.email,
            username: values.username,
            termsAndConditions: true, //values.termsAndConditions,
            keepMeSignedIn: true // values.keepMeSignedIn
          }
        });

        // If the response object has an error property
        // it may be either a Network error or a graphQLErrors array.
        // from: https://formidable.com/open-source/urql/docs/basics/errors/
        // We filter for validation errors set on our resolvers via type-graphql
        // middleware (these are set as decorators on the resolver function itself).
        // These validation errors are set into the graphQLErrors array at
        // "response.error.graphQLErrors[].extensions.valErrors[]"
        let validationErrors: FieldError[];
        if (response.error) {
          validationErrors = formatValidationErrors<RegisterMutation>(response);

          setErrors(toErrorMap(validationErrors));
        }

        if (response.data?.register.errors) {
          // These errors are custom responses to registration errors,
          // example = "You've selected a username which is already reserved."
          // Call the utility function "toErrorMap" to match formik's error
          // shape.
          setErrors(toErrorMap(response.data.register.errors));
        } else if (response.data?.register.user) {
          router.push("/");
        }

        return response;
      }}
    >
      {({ handleSubmit, isSubmitting }) => {
        return (
          <Wrapper flexDirection="column">
            <>
              <Form onSubmit={handleSubmit}>
                <InputField
                  isRequired={true}
                  label="Username"
                  name="username"
                  placeholder="Idi Ogunye"
                  autoComplete="username"
                />

                <Box my={4}>
                  <InputField
                    isRequired={true}
                    label="Email"
                    name="email"
                    placeholder="email"
                    type="email"
                    autoComplete="email"
                  />
                </Box>
                <Box my={4}>
                  <InputField
                    isRequired={true}
                    label="Password"
                    name="password"
                    placeholder="password"
                    type="password"
                    autoComplete="current-password"
                  />
                </Box>

                <InputField
                  isRequired={true}
                  label="Terms & Conditions"
                  name="termsAndConditions"
                  placeholder="termsAndConditions"
                  type="hidden"
                  autoComplete="termsAndConditions"
                />
                <InputField
                  isRequired={true}
                  label="Keep Me Signed In"
                  name="keepMeSignedIn"
                  placeholder="keepMeSignedIn"
                  type="hidden"
                  autoComplete="keepMeSignedIn"
                />
                <Button
                  colorScheme="teal"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  register
                </Button>
              </Form>

              <Text mx="auto" mt={3}>
                Already a member?{" "}
                <NextLink href="/login" passHref>
                  <Link color="crimson">Sign in</Link>
                </NextLink>
              </Text>
            </>
          </Wrapper>
        );
      }}
    </Formik>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Register);
