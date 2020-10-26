import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: "Query";
  me?: Maybe<User>;
  helloWorld: Scalars["String"];
  GetAllMyImages: Array<Image>;
  getThoseIFollowAndTheirPostsResolver?: Maybe<User>;
  getMyMessagesFromUser?: Maybe<Array<Message>>;
  getGlobalPosts?: Maybe<Array<GlobalPostReturnType>>;
  getGlobalPostById?: Maybe<GlobalPostReturnType>;
  meAndAllFollowers?: Maybe<User>;
  myFollowingPosts?: Maybe<Array<FollowingPostReturnType>>;
  getMyFollowingPostById?: Maybe<FollowingPostReturnType>;
  getAllMyMessages?: Maybe<User>;
  getMessageThreads?: Maybe<Array<Maybe<Thread>>>;
  getListToCreateThread?: Maybe<TransUserReturn>;
  getOnlyThreads?: Maybe<ThreadConnection>;
  getMessagesByThreadId?: Maybe<MessageConnection>;
  getGlobalPostsRelay?: Maybe<PostConnection>;
  getGlobalPostsSimplePagination?: Maybe<PaginatedPosts>;
};

export type QueryGetMyMessagesFromUserArgs = {
  input: GetMessagesFromUserInput;
};

export type QueryGetGlobalPostsArgs = {
  cursor?: Maybe<Scalars["String"]>;
  skip?: Maybe<Scalars["Int"]>;
  take?: Maybe<Scalars["Int"]>;
};

export type QueryGetGlobalPostByIdArgs = {
  getpostinput: GetGlobalPostByIdInput;
};

export type QueryGetMyFollowingPostByIdArgs = {
  getpostinput: GetMyFollowingPostByIdInput;
};

export type QueryGetOnlyThreadsArgs = {
  feedinput: FeedInput;
};

export type QueryGetMessagesByThreadIdArgs = {
  input: GetMessagesByThreadIdInput;
};

export type QueryGetGlobalPostsRelayArgs = {
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Float"]>;
  last?: Maybe<Scalars["Float"]>;
};

export type QueryGetGlobalPostsSimplePaginationArgs = {
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Float"]>;
  last?: Maybe<Scalars["Float"]>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  mappedMessages: Array<Message>;
  email: Scalars["String"];
  username: Scalars["String"];
  threads?: Maybe<Array<Thread>>;
  likes?: Maybe<Array<Like>>;
  confirmed: Scalars["Boolean"];
  posts?: Maybe<Array<Post>>;
  images?: Maybe<Array<Maybe<Image>>>;
  profileImgUrl?: Maybe<Scalars["String"]>;
  messages?: Maybe<Array<Message>>;
  sent_messages?: Maybe<Array<Message>>;
  followers?: Maybe<Array<Maybe<User>>>;
  thread_invitations?: Maybe<Array<Maybe<Thread>>>;
  following?: Maybe<Array<Maybe<User>>>;
};

export type Message = {
  __typename?: "Message";
  id: Scalars["ID"];
  created_at?: Maybe<Scalars["DateTime"]>;
  updated_at?: Maybe<Scalars["DateTime"]>;
  message: Scalars["String"];
  images?: Maybe<Array<Maybe<Image>>>;
  sentBy: User;
  user: User;
  thread?: Maybe<Thread>;
};

export type Image = {
  __typename?: "Image";
  id: Scalars["ID"];
  uri: Scalars["String"];
  post: Post;
  message?: Maybe<Message>;
  user: User;
};

export type Post = {
  __typename?: "Post";
  id?: Maybe<Scalars["ID"]>;
  title?: Maybe<Scalars["String"]>;
  text?: Maybe<Scalars["String"]>;
  images?: Maybe<Array<Image>>;
  likes?: Maybe<Array<Like>>;
  comments?: Maybe<Array<Comment>>;
  isCtxUserIdAFollowerOfPostUser?: Maybe<Scalars["Boolean"]>;
  userId?: Maybe<Scalars["ID"]>;
  user?: Maybe<User>;
  created_at?: Maybe<Scalars["DateTime"]>;
  updated_at?: Maybe<Scalars["DateTime"]>;
  comments_count: Scalars["Int"];
  likes_count: Scalars["Int"];
};

export type Like = {
  __typename?: "Like";
  id: Scalars["ID"];
  postId: Scalars["ID"];
  post: Post;
  userId: Scalars["ID"];
  user: User;
  count: Scalars["Int"];
};

export type Comment = {
  __typename?: "Comment";
  id: Scalars["ID"];
  postId: Scalars["ID"];
  post: Post;
  userId: Scalars["ID"];
  user: User;
  created_at?: Maybe<Scalars["DateTime"]>;
  content: Scalars["String"];
};

export type Thread = {
  __typename?: "Thread";
  id?: Maybe<Scalars["ID"]>;
  messages?: Maybe<Array<Maybe<Message>>>;
  last_message?: Maybe<Scalars["String"]>;
  message_count: Scalars["Int"];
  user: User;
  invitees: Array<User>;
  created_at?: Maybe<Scalars["DateTime"]>;
  updated_at?: Maybe<Scalars["DateTime"]>;
};

export type GetMessagesFromUserInput = {
  sentBy: Scalars["String"];
  user: Scalars["String"];
};

export type GlobalPostReturnType = {
  __typename?: "GlobalPostReturnType";
  id?: Maybe<Scalars["ID"]>;
  title?: Maybe<Scalars["String"]>;
  text?: Maybe<Scalars["String"]>;
  images?: Maybe<Array<Image>>;
  likes?: Maybe<Array<Like>>;
  comments?: Maybe<Array<Comment>>;
  user?: Maybe<User>;
  created_at?: Maybe<Scalars["DateTime"]>;
  updated_at?: Maybe<Scalars["DateTime"]>;
  isCtxUserIdAFollowerOfPostUser?: Maybe<Scalars["Boolean"]>;
  comments_count: Scalars["Int"];
  likes_count: Scalars["Int"];
  currently_liked: Scalars["Boolean"];
  success?: Maybe<Scalars["Boolean"]>;
  action?: Maybe<Scalars["String"]>;
};

export type GetGlobalPostByIdInput = {
  postId: Scalars["ID"];
};

export type FollowingPostReturnType = {
  __typename?: "FollowingPostReturnType";
  id?: Maybe<Scalars["ID"]>;
  title?: Maybe<Scalars["String"]>;
  text?: Maybe<Scalars["String"]>;
  images?: Maybe<Array<Image>>;
  likes?: Maybe<Array<Like>>;
  comments?: Maybe<Array<Comment>>;
  isCtxUserIdAFollowerOfPostUser?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<User>;
  created_at?: Maybe<Scalars["DateTime"]>;
  updated_at?: Maybe<Scalars["DateTime"]>;
  comments_count: Scalars["Int"];
  likes_count: Scalars["Int"];
  currently_liked: Scalars["Boolean"];
};

export type GetMyFollowingPostByIdInput = {
  postId: Scalars["ID"];
};

export type TransUserReturn = {
  __typename?: "TransUserReturn";
  id: Scalars["ID"];
  thoseICanMessage?: Maybe<Array<User>>;
};

export type FeedInput = {
  cursor?: Maybe<Scalars["String"]>;
  take?: Maybe<Scalars["Int"]>;
};

export type ThreadConnection = {
  __typename?: "ThreadConnection";
  edges: Array<ThreadEdge>;
  pageInfo: PageInfo;
};

export type ThreadEdge = {
  __typename?: "ThreadEdge";
  node: Thread;
};

export type PageInfo = {
  __typename?: "PageInfo";
  startCursor: Scalars["String"];
  endCursor: Scalars["String"];
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
};

export type GetMessagesByThreadIdInput = {
  cursor?: Maybe<Scalars["String"]>;
  threadId: Scalars["String"];
  skip?: Maybe<Scalars["Int"]>;
  take?: Maybe<Scalars["Int"]>;
};

export type MessageConnection = {
  __typename?: "MessageConnection";
  edges: Array<MessageEdge>;
  pageInfo: PageInfo;
};

export type MessageEdge = {
  __typename?: "MessageEdge";
  node: Message;
};

export type PostConnection = {
  __typename?: "PostConnection";
  pageInfo: PageInfoType;
  edges: Array<PostEdge>;
};

export type PageInfoType = {
  __typename?: "PageInfoType";
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
};

export type PostEdge = {
  __typename?: "PostEdge";
  node: GlobalPostReturnType;
  /** Used in `before` and `after` args */
  cursor: Scalars["String"];
};

export type PaginatedPosts = {
  __typename?: "PaginatedPosts";
  posts: Array<GlobalPostReturnType>;
  hasMore: Scalars["Boolean"];
};

export type Mutation = {
  __typename?: "Mutation";
  createProduct: Product;
  createUser: User;
  changePassword?: Maybe<UserResponse>;
  confirmUser: Scalars["Boolean"];
  forgotPassword: Scalars["Boolean"];
  login?: Maybe<UserResponse>;
  logout: Scalars["Boolean"];
  register: UserResponse;
  addProfilePicture: UploadProfilePictueReturnType;
  createPost: Post;
  editUserInfo: User;
  followUser: Scalars["Boolean"];
  addNewMessage: Scalars["Boolean"];
  unFollowUser: Scalars["Boolean"];
  createMessageThread: Thread;
  addMessageToThread: AddMessagePayload;
  signS3: SignedS3Payload;
  createOrUpdateLikes?: Maybe<LikeReturnType>;
  addCommentToPost: AddCommentPayloadType;
  resendConfirmationEmail: UserResponse;
};

export type MutationCreateProductArgs = {
  data: ProductInput;
};

export type MutationCreateUserArgs = {
  data: RegisterInput;
};

export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};

export type MutationConfirmUserArgs = {
  token: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type MutationAddProfilePictureArgs = {
  data: UploadProfilePictureInput;
};

export type MutationCreatePostArgs = {
  data: PostInput;
};

export type MutationEditUserInfoArgs = {
  data: EditUserInput;
};

export type MutationFollowUserArgs = {
  data: FollowUserInput;
};

export type MutationAddNewMessageArgs = {
  sentTo: Scalars["String"];
  message: Scalars["String"];
};

export type MutationUnFollowUserArgs = {
  data: UnFollowUserInput;
};

export type MutationCreateMessageThreadArgs = {
  sentTo: Scalars["String"];
  invitees: Array<Scalars["ID"]>;
  message: Scalars["String"];
  images?: Maybe<Array<Maybe<Scalars["Upload"]>>>;
};

export type MutationAddMessageToThreadArgs = {
  threadId: Scalars["ID"];
  sentTo: Scalars["String"];
  invitees: Array<Scalars["ID"]>;
  message: Scalars["String"];
  images?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type MutationSignS3Args = {
  files: Array<ImageSubInput>;
};

export type MutationCreateOrUpdateLikesArgs = {
  input: UpdateLikesInput;
};

export type MutationAddCommentToPostArgs = {
  input: NewCommentsArgs;
};

export type MutationResendConfirmationEmailArgs = {
  data: ResendConfirmationEmailInput;
};

export type ProductInput = {
  name: Scalars["String"];
};

export type Product = {
  __typename?: "Product";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type RegisterInput = {
  password: Scalars["String"];
  email: Scalars["String"];
  username: Scalars["String"];
  termsAndConditions: Scalars["Boolean"];
  keepMeSignedIn: Scalars["Boolean"];
};

export type ChangePasswordInput = {
  password: Scalars["String"];
  token: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type UploadProfilePictureInput = {
  user: Scalars["ID"];
  image?: Maybe<Scalars["String"]>;
};

export type UploadProfilePictueReturnType = {
  __typename?: "UploadProfilePictueReturnType";
  message: Scalars["String"];
  profileImgUrl: Scalars["String"];
};

export type PostInput = {
  text: Scalars["String"];
  title?: Maybe<Scalars["String"]>;
  images?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type EditUserInput = {
  username: Scalars["String"];
  email: Scalars["String"];
};

export type FollowUserInput = {
  userIDToFollow: Scalars["String"];
};

export type UnFollowUserInput = {
  userIDToUnFollow: Scalars["String"];
};

export type AddMessagePayload = {
  __typename?: "AddMessagePayload";
  success: Scalars["Boolean"];
  threadId: Scalars["ID"];
  message: Message;
  user: User;
  invitees: Array<User>;
};

export type ImageSubInput = {
  filename: Scalars["String"];
  filetype: Scalars["String"];
};

export type SignedS3Payload = {
  __typename?: "SignedS3Payload";
  signatures: Array<SignedS3SubPayload>;
};

export type SignedS3SubPayload = {
  __typename?: "SignedS3SubPayload";
  url: Scalars["String"];
  signedRequest: Scalars["String"];
};

export type UpdateLikesInput = {
  postId: Scalars["ID"];
};

export type LikeReturnType = {
  __typename?: "LikeReturnType";
  postId: Scalars["ID"];
  status: LikeStatus;
};

/** Describes whether a like has been created or deleted in the database. */
export enum LikeStatus {
  Created = "Created",
  Deleted = "Deleted",
  CountUpdated = "CountUpdated",
  Undetermined = "Undetermined"
}

export type NewCommentsArgs = {
  postId: Scalars["ID"];
  content: Scalars["String"];
};

export type AddCommentPayloadType = {
  __typename?: "AddCommentPayloadType";
  id: Scalars["ID"];
  postId: Scalars["ID"];
  userId: Scalars["ID"];
  created_at?: Maybe<Scalars["String"]>;
  content: Scalars["String"];
};

export type ResendConfirmationEmailInput = {
  username: Scalars["String"];
};

export type Subscription = {
  __typename?: "Subscription";
  followingPosts: PostSubType;
  newMessage: MessageSubType;
  globalPosts?: Maybe<GlobalPostReturnType>;
  followingPostsSub: HandlePostPayload;
  messageThreads: AddMessagePayload;
  getMessagesByThreadId: AddMessagePayload;
  newMessageByThreadId: AddMessagePayload;
  likesUpdated: LikeReturnType;
  newComment: AddCommentPayloadType;
  commentCount: CommentCountType;
  likesCount: LikesCountType;
  globalPostsRelay?: Maybe<GlobalPostReturnType>;
};

export type SubscriptionFollowingPostsArgs = {
  data: PostSubInput;
};

export type SubscriptionNewMessageArgs = {
  sentTo: Scalars["String"];
  message: Scalars["String"];
};

export type SubscriptionMessageThreadsArgs = {
  data: AddMessageToThreadInput_V2;
};

export type SubscriptionGetMessagesByThreadIdArgs = {
  input: GetMessagesByThreadIdInput;
};

export type SubscriptionNewCommentArgs = {
  input: NewCommentsArgs;
};

export type SubscriptionCommentCountArgs = {
  input: CommentCountArgs;
};

export type SubscriptionLikesCountArgs = {
  input: LikesCountArgs;
};

export type PostSubInput = {
  sentBy: Scalars["String"];
  message: Scalars["String"];
};

export type PostSubType = {
  __typename?: "PostSubType";
  id: Scalars["ID"];
  title: Scalars["String"];
  text: Scalars["String"];
  images: Array<Image>;
  user: User;
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};

export type MessageSubType = {
  __typename?: "MessageSubType";
  id: Scalars["ID"];
  message?: Maybe<Scalars["String"]>;
  sentBy: User;
  user: User;
  created_at?: Maybe<Scalars["DateTime"]>;
  updated_at?: Maybe<Scalars["DateTime"]>;
};

export type HandlePostPayload = {
  __typename?: "HandlePostPayload";
  success: Scalars["Boolean"];
  action: Scalars["String"];
  id?: Maybe<Scalars["ID"]>;
  title?: Maybe<Scalars["Boolean"]>;
  images?: Maybe<Array<Image>>;
  isCtxUserIdAFollowerOfPostUser?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<User>;
  created_at?: Maybe<Scalars["DateTime"]>;
  updated_at?: Maybe<Scalars["DateTime"]>;
  comment_count?: Maybe<Scalars["Int"]>;
  likes_count: Scalars["Int"];
  currently_liked: Scalars["Boolean"];
};

export type AddMessageToThreadInput_V2 = {
  threadId: Scalars["ID"];
  sentTo: Scalars["String"];
  invitees: Array<Scalars["ID"]>;
  message: Scalars["String"];
  images?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type CommentCountArgs = {
  postId: Scalars["ID"];
};

export type CommentCountType = {
  __typename?: "CommentCountType";
  count: Scalars["Int"];
  postId: Scalars["ID"];
};

export type LikesCountArgs = {
  postId: Scalars["ID"];
};

export type LikesCountType = {
  __typename?: "LikesCountType";
  count: Scalars["Int"];
  postId: Scalars["ID"];
};

export type MessageOutput = {
  __typename?: "MessageOutput";
  message: Scalars["String"];
};

export type MessageThreadOutput = {
  __typename?: "MessageThreadOutput";
  message: Scalars["String"];
};

export type LikesCountReturnType = {
  __typename?: "LikesCountReturnType";
  postId: Scalars["ID"];
  status: LikeStatus;
  count: Scalars["Int"];
};

export type PasswordInput = {
  password: Scalars["String"];
};

export type PostInputOld = {
  text: Scalars["String"];
  title?: Maybe<Scalars["String"]>;
  user: Scalars["ID"];
  images?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type GetAllMyMessagesInput = {
  user: Scalars["String"];
};

export type PostSubscriptionInput = {
  text: Scalars["String"];
  title?: Maybe<Scalars["String"]>;
  user: Scalars["ID"];
  images?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type GetMessageThreadsFromUserInput = {
  sentBy: Scalars["String"];
  user: Scalars["String"];
};

export type GetAllMyMessageThreadsInput = {
  user: Scalars["String"];
};

export type ErrorTypicalFragment = { __typename?: "FieldError" } & Pick<
  FieldError,
  "field" | "message"
>;

export type TypicalUserResponseFragment = { __typename?: "UserResponse" } & {
  errors?: Maybe<Array<{ __typename?: "FieldError" } & ErrorTypicalFragment>>;
  user?: Maybe<{ __typename?: "User" } & UserBaseFragment>;
};

export type UserBaseFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username"
>;

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;

export type ChangePasswordMutation = { __typename?: "Mutation" } & {
  changePassword?: Maybe<
    { __typename?: "UserResponse" } & TypicalUserResponseFragment
  >;
};

export type ConfirmUserMutationVariables = Exact<{
  token: Scalars["String"];
}>;

export type ConfirmUserMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "confirmUser"
>;

export type CreateOrUpdateLikesMutationVariables = Exact<{
  input: UpdateLikesInput;
}>;

export type CreateOrUpdateLikesMutation = { __typename?: "Mutation" } & {
  createOrUpdateLikes?: Maybe<
    { __typename?: "LikeReturnType" } & Pick<
      LikeReturnType,
      "postId" | "status"
    >
  >;
};

export type CreatePostMutationVariables = Exact<{
  data: PostInput;
}>;

export type CreatePostMutation = { __typename?: "Mutation" } & {
  createPost: { __typename?: "Post" } & Pick<Post, "id" | "title" | "text"> & {
      images?: Maybe<
        Array<{ __typename?: "Image" } & Pick<Image, "id" | "uri">>
      >;
    };
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "forgotPassword"
>;

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserResponse" } & TypicalUserResponseFragment;
};

export type GetGlobalPostsRelayQueryVariables = Exact<{
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Float"]>;
  last?: Maybe<Scalars["Float"]>;
}>;

export type GetGlobalPostsRelayQuery = { __typename?: "Query" } & {
  getGlobalPostsRelay?: Maybe<
    { __typename?: "PostConnection" } & {
      pageInfo: { __typename?: "PageInfoType" } & Pick<
        PageInfoType,
        "hasNextPage" | "hasPreviousPage" | "endCursor" | "startCursor"
      >;
      edges: Array<
        { __typename?: "PostEdge" } & Pick<PostEdge, "cursor"> & {
            node: { __typename?: "GlobalPostReturnType" } & Pick<
              GlobalPostReturnType,
              | "id"
              | "title"
              | "text"
              | "likes_count"
              | "comments_count"
              | "currently_liked"
              | "created_at"
            > & {
                images?: Maybe<
                  Array<{ __typename?: "Image" } & Pick<Image, "id" | "uri">>
                >;
                likes?: Maybe<
                  Array<{ __typename?: "Like" } & Pick<Like, "id">>
                >;
              };
          }
      >;
    }
  >;
};

export type GetGlobalPostsSimplePaginationQueryVariables = Exact<{
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Float"]>;
}>;

export type GetGlobalPostsSimplePaginationQuery = { __typename?: "Query" } & {
  getGlobalPostsSimplePagination?: Maybe<
    { __typename?: "PaginatedPosts" } & Pick<PaginatedPosts, "hasMore"> & {
        posts: Array<
          { __typename?: "GlobalPostReturnType" } & Pick<
            GlobalPostReturnType,
            "id" | "title" | "text" | "created_at"
          > & {
              images?: Maybe<
                Array<{ __typename?: "Image" } & Pick<Image, "id" | "uri">>
              >;
            }
        >;
      }
  >;
};

export type GetGlobalPostsQueryVariables = Exact<{
  cursor?: Maybe<Scalars["String"]>;
  skip?: Maybe<Scalars["Int"]>;
  take?: Maybe<Scalars["Int"]>;
}>;

export type GetGlobalPostsQuery = { __typename?: "Query" } & {
  getGlobalPosts?: Maybe<
    Array<
      { __typename?: "GlobalPostReturnType" } & Pick<
        GlobalPostReturnType,
        "id" | "title" | "text" | "created_at"
      > & {
          images?: Maybe<
            Array<{ __typename?: "Image" } & Pick<Image, "id" | "uri">>
          >;
          likes?: Maybe<
            Array<{ __typename?: "Like" } & Pick<Like, "id" | "count">>
          >;
        }
    >
  >;
};

export type LoginMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login?: Maybe<{ __typename?: "UserResponse" } & TypicalUserResponseFragment>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & UserBaseFragment>;
};

export const ErrorTypicalFragmentDoc = gql`
  fragment ErrorTypical on FieldError {
    field
    message
  }
`;
export const UserBaseFragmentDoc = gql`
  fragment UserBase on User {
    id
    username
  }
`;
export const TypicalUserResponseFragmentDoc = gql`
  fragment TypicalUserResponse on UserResponse {
    errors {
      ...ErrorTypical
    }
    user {
      ...UserBase
    }
  }
  ${ErrorTypicalFragmentDoc}
  ${UserBaseFragmentDoc}
`;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($data: ChangePasswordInput!) {
    changePassword(data: $data) {
      ...TypicalUserResponse
    }
  }
  ${TypicalUserResponseFragmentDoc}
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >
) {
  return Apollo.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, baseOptions);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult = Apollo.MutationResult<
  ChangePasswordMutation
>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const ConfirmUserDocument = gql`
  mutation ConfirmUser($token: String!) {
    confirmUser(token: $token)
  }
`;
export type ConfirmUserMutationFn = Apollo.MutationFunction<
  ConfirmUserMutation,
  ConfirmUserMutationVariables
>;

/**
 * __useConfirmUserMutation__
 *
 * To run a mutation, you first call `useConfirmUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmUserMutation, { data, loading, error }] = useConfirmUserMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmUserMutation,
    ConfirmUserMutationVariables
  >
) {
  return Apollo.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(
    ConfirmUserDocument,
    baseOptions
  );
}
export type ConfirmUserMutationHookResult = ReturnType<
  typeof useConfirmUserMutation
>;
export type ConfirmUserMutationResult = Apollo.MutationResult<
  ConfirmUserMutation
>;
export type ConfirmUserMutationOptions = Apollo.BaseMutationOptions<
  ConfirmUserMutation,
  ConfirmUserMutationVariables
>;
export const CreateOrUpdateLikesDocument = gql`
  mutation CreateOrUpdateLikes($input: UpdateLikesInput!) {
    createOrUpdateLikes(input: $input) {
      postId
      status
    }
  }
`;
export type CreateOrUpdateLikesMutationFn = Apollo.MutationFunction<
  CreateOrUpdateLikesMutation,
  CreateOrUpdateLikesMutationVariables
>;

/**
 * __useCreateOrUpdateLikesMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateLikesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateLikesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateLikesMutation, { data, loading, error }] = useCreateOrUpdateLikesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateLikesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOrUpdateLikesMutation,
    CreateOrUpdateLikesMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateOrUpdateLikesMutation,
    CreateOrUpdateLikesMutationVariables
  >(CreateOrUpdateLikesDocument, baseOptions);
}
export type CreateOrUpdateLikesMutationHookResult = ReturnType<
  typeof useCreateOrUpdateLikesMutation
>;
export type CreateOrUpdateLikesMutationResult = Apollo.MutationResult<
  CreateOrUpdateLikesMutation
>;
export type CreateOrUpdateLikesMutationOptions = Apollo.BaseMutationOptions<
  CreateOrUpdateLikesMutation,
  CreateOrUpdateLikesMutationVariables
>;
export const CreatePostDocument = gql`
  mutation CreatePost($data: PostInput!) {
    createPost(data: $data) {
      id
      title
      text
      images {
        id
        uri
      }
    }
  }
`;
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePostMutation,
    CreatePostMutationVariables
  >
) {
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    baseOptions
  );
}
export type CreatePostMutationHookResult = ReturnType<
  typeof useCreatePostMutation
>;
export type CreatePostMutationResult = Apollo.MutationResult<
  CreatePostMutation
>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>;
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >
) {
  return Apollo.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, baseOptions);
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<
  ForgotPasswordMutation
>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      ...TypicalUserResponse
    }
  }
  ${TypicalUserResponseFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const GetGlobalPostsRelayDocument = gql`
  query GetGlobalPostsRelay(
    $before: String
    $after: String
    $first: Float
    $last: Float
  ) {
    getGlobalPostsRelay(
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      edges {
        cursor
        node {
          id
          title
          text
          likes_count
          comments_count
          currently_liked
          images {
            id
            uri
          }
          likes {
            id
          }
          created_at
        }
      }
    }
  }
`;

/**
 * __useGetGlobalPostsRelayQuery__
 *
 * To run a query within a React component, call `useGetGlobalPostsRelayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGlobalPostsRelayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGlobalPostsRelayQuery({
 *   variables: {
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useGetGlobalPostsRelayQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetGlobalPostsRelayQuery,
    GetGlobalPostsRelayQueryVariables
  >
) {
  return Apollo.useQuery<
    GetGlobalPostsRelayQuery,
    GetGlobalPostsRelayQueryVariables
  >(GetGlobalPostsRelayDocument, baseOptions);
}
export function useGetGlobalPostsRelayLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetGlobalPostsRelayQuery,
    GetGlobalPostsRelayQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    GetGlobalPostsRelayQuery,
    GetGlobalPostsRelayQueryVariables
  >(GetGlobalPostsRelayDocument, baseOptions);
}
export type GetGlobalPostsRelayQueryHookResult = ReturnType<
  typeof useGetGlobalPostsRelayQuery
>;
export type GetGlobalPostsRelayLazyQueryHookResult = ReturnType<
  typeof useGetGlobalPostsRelayLazyQuery
>;
export type GetGlobalPostsRelayQueryResult = Apollo.QueryResult<
  GetGlobalPostsRelayQuery,
  GetGlobalPostsRelayQueryVariables
>;
export const GetGlobalPostsSimplePaginationDocument = gql`
  query GetGlobalPostsSimplePagination($after: String, $first: Float) {
    getGlobalPostsSimplePagination(after: $after, first: $first) {
      hasMore
      posts {
        id
        title
        text
        created_at
        images {
          id
          uri
        }
      }
    }
  }
`;

/**
 * __useGetGlobalPostsSimplePaginationQuery__
 *
 * To run a query within a React component, call `useGetGlobalPostsSimplePaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGlobalPostsSimplePaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGlobalPostsSimplePaginationQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useGetGlobalPostsSimplePaginationQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetGlobalPostsSimplePaginationQuery,
    GetGlobalPostsSimplePaginationQueryVariables
  >
) {
  return Apollo.useQuery<
    GetGlobalPostsSimplePaginationQuery,
    GetGlobalPostsSimplePaginationQueryVariables
  >(GetGlobalPostsSimplePaginationDocument, baseOptions);
}
export function useGetGlobalPostsSimplePaginationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetGlobalPostsSimplePaginationQuery,
    GetGlobalPostsSimplePaginationQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    GetGlobalPostsSimplePaginationQuery,
    GetGlobalPostsSimplePaginationQueryVariables
  >(GetGlobalPostsSimplePaginationDocument, baseOptions);
}
export type GetGlobalPostsSimplePaginationQueryHookResult = ReturnType<
  typeof useGetGlobalPostsSimplePaginationQuery
>;
export type GetGlobalPostsSimplePaginationLazyQueryHookResult = ReturnType<
  typeof useGetGlobalPostsSimplePaginationLazyQuery
>;
export type GetGlobalPostsSimplePaginationQueryResult = Apollo.QueryResult<
  GetGlobalPostsSimplePaginationQuery,
  GetGlobalPostsSimplePaginationQueryVariables
>;
export const GetGlobalPostsDocument = gql`
  query GetGlobalPosts($cursor: String, $skip: Int, $take: Int) {
    getGlobalPosts(cursor: $cursor, skip: $skip, take: $take) {
      id
      title
      text
      images {
        id
        uri
      }
      likes {
        id
        count
      }
      created_at
    }
  }
`;

/**
 * __useGetGlobalPostsQuery__
 *
 * To run a query within a React component, call `useGetGlobalPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGlobalPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGlobalPostsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetGlobalPostsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetGlobalPostsQuery,
    GetGlobalPostsQueryVariables
  >
) {
  return Apollo.useQuery<GetGlobalPostsQuery, GetGlobalPostsQueryVariables>(
    GetGlobalPostsDocument,
    baseOptions
  );
}
export function useGetGlobalPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetGlobalPostsQuery,
    GetGlobalPostsQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetGlobalPostsQuery, GetGlobalPostsQueryVariables>(
    GetGlobalPostsDocument,
    baseOptions
  );
}
export type GetGlobalPostsQueryHookResult = ReturnType<
  typeof useGetGlobalPostsQuery
>;
export type GetGlobalPostsLazyQueryHookResult = ReturnType<
  typeof useGetGlobalPostsLazyQuery
>;
export type GetGlobalPostsQueryResult = Apollo.QueryResult<
  GetGlobalPostsQuery,
  GetGlobalPostsQueryVariables
>;
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...TypicalUserResponse
    }
  }
  ${TypicalUserResponseFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      ...UserBase
    }
  }
  ${UserBaseFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
