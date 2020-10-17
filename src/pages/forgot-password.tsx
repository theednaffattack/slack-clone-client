import React from "react";
import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/core";

import { Wrapper } from "../components/register.wrapper";
import { InputField } from "../components/forms.input-field";
import { useForgotPasswordMutation } from "../generated/graphql";

function ForgotPassword() {
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={async (values) => {
        await forgotPassword();
      }}
    >
      {({ handleSubmit, isSubmitting }) => {
        return (
          <Wrapper>
            <Form onSubmit={handleSubmit}>
              <InputField
                isRequired={true}
                label="email"
                name="email"
                placeholder="idi@idi.com"
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
