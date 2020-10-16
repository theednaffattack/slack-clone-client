import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/core";
import { useRouter } from "next/router";

import { Wrapper } from "../components/register.wrapper";
import { InputField } from "../components/forms.input-field";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../lib/utilities.toErrorMap";

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
        if (
          response.error?.graphQLErrors &&
          response.error?.graphQLErrors.filter(
            ({ message }) => message === "Argument Validation Error"
          ).length > 0
        ) {
          // First we filter for any "Argument Validation Error" messages
          // we can find. These were set by type-graphql
          const filteredValidationErrors = response.error?.graphQLErrors.filter(
            ({ message }) => message === "Argument Validation Error"
          );

          // We take the filtered validation erros and
          // copy the custom valErrors object created on our
          // server via Apollo's "formatError". These have
          // been formatted to FieldError format, so they're
          // easy to map.

          const extractedValErrors =
            filteredValidationErrors[0].extensions?.valErrors;

          setErrors(toErrorMap(extractedValErrors));
        }

        if (response.data?.register.errors) {
          // These errors are custom responses to registration errors,
          // example = "You've selected a username which is already reserved."
          // Call the utility function "toErrorMap" to match formik's error
          // shape.
          setErrors(toErrorMap(response.data.register.errors));
        } else if (response.data?.register.user) {
          router.push("/profile");
        }

        return response;
      }}
    >
      {({ handleSubmit, isSubmitting }) => {
        return (
          <Wrapper>
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
            </>
          </Wrapper>
        );
      }}
    </Formik>
  );
}

export default Register;
