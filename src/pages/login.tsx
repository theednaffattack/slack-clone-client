import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/core";

import { Wrapper } from "../components/register.wrapper";
import { InputField } from "../components/forms.input-field";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../lib/utilities.toErrorMap";

function Login() {
  const [, login] = useLoginMutation();
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await login({
          password: values.password,
          username: values.username
        });
        if (response.data?.login?.errors) {
          setErrors(toErrorMap(response.data?.login?.errors));
        }
      }}
    >
      {({ errors, handleSubmit, isSubmitting }) => {
        return (
          <Wrapper>
            <Form onSubmit={handleSubmit}>
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

export default Login;
