import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/core";

import { Wrapper } from "../components/register.wrapper";
import { InputField } from "../components/forms.input-field";

function Login() {
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
              <Button type="submit" isLoading={isSubmitting}>
                register
              </Button>
            </Form>
          </Wrapper>
        );
      }}
    </Formik>
  );
}

export default Login;
