import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Box, Button, Link, Text } from "@chakra-ui/core";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { Wrapper } from "../components/register.wrapper";
import { InputField } from "../components/forms.input-field";
import {
  FieldError,
  LoginMutation,
  useLoginMutation
} from "../generated/graphql";
import { toErrorMap } from "../lib/utilities.toErrorMap";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../lib/utilities.create-urql-client";
import { formatValidationErrors } from "../lib/utilities.graphQLErrors.format-validation-errors";

function Login() {
  const [userConfirmedHelper, setUserConfirmedHelper] = useState(<></>);
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Formik
      initialValues={{ username: "", password: "", user_confirmed: <></> }}
      onSubmit={async (values, { setErrors }) => {
        const response = await login({
          password: values.password,
          username: values.username
        });
        let validationErrors: FieldError[];
        if (response.error) {
          validationErrors = formatValidationErrors<LoginMutation>(response);

          setErrors(toErrorMap(validationErrors));
        }

        if (response.data?.login?.errors) {
          const errorMap = toErrorMap(response.data?.login?.errors);

          if ("user_confirmed" in errorMap) {
            setUserConfirmedHelper(
              <Box>
                <Text color="crimson">{errorMap.user_confirmed}</Text>
                <Box>
                  <NextLink href="/re-confirmation" passHref>
                    <Link>send another confirmation email</Link>
                  </NextLink>
                </Box>
              </Box>
            );

            delete errorMap.user_confirmed;
          } else {
            setErrors(toErrorMap(response.data?.login?.errors));
          }
          // setErrors(toErrorMap(response.data?.login?.errors));
        } else {
          router.push("/");
        }
      }}
    >
      {({ handleSubmit, isSubmitting }) => {
        return (
          <Wrapper>
            <Form onSubmit={handleSubmit}>
              {userConfirmedHelper}
              <InputField
                isRequired={true}
                type="hidden"
                name="user_confirmed"
              />
              <InputField
                isRequired={true}
                label="Username"
                name="username"
                placeholder="Idi Ogunye"
              />
              <Box my={4}>
                <InputField
                  isRequired={true}
                  label="Password"
                  name="password"
                  placeholder="password"
                  type="password"
                />
              </Box>
              <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
                login
              </Button>
            </Form>
          </Wrapper>
        );
      }}
    </Formik>
  );
}

export default withUrqlClient(createUrqlClient)(Login);
