import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/core";

import { Wrapper } from "../components/register.wrapper";
import { InputField } from "../components/forms.input-field";

function Register() {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => console.log("FAKE SUBMIT", values)}
    >
      {({ handleSubmit, isSubmitting }) => {
        return (
          <Wrapper>
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
                  label="Password"
                  name="password"
                  placeholder="password"
                  type="password"
                  autoComplete="current-password"
                />
              </Box>
              <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
                register
              </Button>
            </Form>
          </Wrapper>
        );
      }}
    </Formik>
  );
}

function validateName(value: string) {
  let error;
  if (!value) {
    error = "Name is required";
  } else if (value !== "Naruto") {
    error = "Jeez! You're not a fan 😱";
  }
  return error;
}

export default Register;
