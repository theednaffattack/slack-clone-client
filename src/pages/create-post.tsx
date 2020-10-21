import { Box, Button, Text } from "@chakra-ui/core";
import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { InputField } from "../components/forms.input-field";
import { TextArea } from "../components/forms.textarea";
import { Layout } from "../components/layout.basic";
import { PostConnection, useCreatePostMutation } from "../generated/graphql";
import { useIsAuth } from "../lib/utilities.hooks.useIsAuth";

function CreatePost(): ReactElement {
  const router = useRouter();
  useIsAuth();
  const [createPost, { error }] = useCreatePostMutation({
    update(cache, { data: postMutationData }) {
      console.log("CACHE UPDATE FIRING");

      // if there's no data don't screw around with the cache
      if (!postMutationData) return;

      cache.modify({
        fields: {
          getGlobalPostsRelay(existingPosts): PostConnection {
            const { edges, __typename, pageInfo } = existingPosts;

            return {
              edges: [
                {
                  __typename: "PostEdge",
                  cursor: new Date().toISOString(),
                  node: {
                    comments_count: 0,
                    likes_count: 0,
                    currently_liked: true,
                    likes: [],
                    created_at: new Date().toISOString(),
                    __typename: postMutationData?.createPost.__typename,
                    images: postMutationData?.createPost.images,
                    text: postMutationData?.createPost.text,
                    title: postMutationData?.createPost.title,
                    id: postMutationData?.createPost.id
                  }
                },
                ...edges
              ],
              __typename,
              pageInfo
            };
          }
        }
      });
    }
  });
  return (
    <Layout>
      <Box>
        <Text fontSize="3xl">Create Post</Text>
        <Formik
          initialValues={{ title: "", text: "", images: [] }}
          onSubmit={async ({ text, title, images }, actions) => {
            await createPost({
              variables: { data: { text, title, images } }
            });

            actions.setSubmitting(false);
            actions.resetForm({
              values: { text: "", title: "", images: [] }
            });
            if (!error) {
              router.push("/");
            }
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

export default CreatePost;
