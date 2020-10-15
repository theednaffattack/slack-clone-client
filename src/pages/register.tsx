import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/core";

import { Wrapper } from "../components/register.wrapper";
import { InputField } from "../components/forms.input-field";
import { useRegisterMutation } from "../generated/graphql";

function Register() {
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
      onSubmit={async (values) => {
        return register({
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
