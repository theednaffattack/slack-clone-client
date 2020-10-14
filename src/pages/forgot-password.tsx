import React from "react";
import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/core";

import { Wrapper } from "../components/register.wrapper";
import { InputField } from "../components/forms.input-field";

function ForgotPassword() {
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

              <Button mt={4} type="submit" isLoading={isSubmitting}>
                register
              </Button>
            </Form>
          </Wrapper>
        );
      }}
    </Formik>
  );
}

export default ForgotPassword;
