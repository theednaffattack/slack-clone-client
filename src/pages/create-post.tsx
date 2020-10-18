import { Box, Button, Text } from "@chakra-ui/core";
import { Field, FieldArray, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";

import { InputField } from "../components/forms.input-field";
import { TextArea } from "../components/forms.textarea";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../lib/utilities.create-urql-client";
import { Layout } from "../components/layout.basic";

function CreatePost(): ReactElement {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace("/login");
    }
  }, [data, fetching, router]);

  const [, createPost] = useCreatePostMutation();
  return (
    <Layout>
      <Box>
        <Text fontSize="3xl">Create Post</Text>
        <Formik
          initialValues={{ title: "", text: "", images: [] }}
          onSubmit={async ({ text, title, images }, actions) => {
            const response = await createPost({
              data: { title, text, images }
            });
            console.log("SUBMIT POST", response);
            actions.setSubmitting(false);
            actions.resetForm({
              values: { text: "", title: "", images: [] }
            });
          }}
        >
          {({ handleSubmit, values, isSubmitting }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <InputField
                  isRequired={true}
                  label="title"
                  name="title"
                  placeholder="Title"
                />
                <TextArea
                  isRequired={true}
                  label="text"
                  name="text"
                  placeholder="Message"
                />

                <FieldArray
                  name="images"
                  render={(arrayHelpers) => (
                    <div>
                      {values.images && values.images.length > 0 ? (
                        values.images.map((_image, index) => (
                          <div key={index}>
                            <Field name={`images.${index}`} />
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // remove a image from the list
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                            >
                              +
                            </button>
                          </div>
                        ))
                      ) : (
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          {/* show this when user has removed all images from the list */}
                          Add a image
                        </button>
                      )}
                    </div>
                  )}
                />

                <Button
                  type="submit"
                  colorScheme="teal"
                  disabled={isSubmitting}
                >
                  create post
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient)(CreatePost);
