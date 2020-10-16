import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
  __typename?: 'Query';
  me?: Maybe<User>;
  helloWorld: Scalars['String'];
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
};


export type QueryGetMyMessagesFromUserArgs = {
  input: GetMessagesFromUserInput;
};


export type QueryGetGlobalPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
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

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  mappedMessages: Array<Message>;
  email: Scalars['String'];
  username: Scalars['String'];
  threads?: Maybe<Array<Thread>>;
  likes?: Maybe<Array<Like>>;
  confirmed: Scalars['Boolean'];
  posts?: Maybe<Array<Post>>;
  images?: Maybe<Array<Maybe<Image>>>;
  profileImgUrl?: Maybe<Scalars['String']>;
  messages?: Maybe<Array<Message>>;
  sent_messages?: Maybe<Array<Message>>;
  followers?: Maybe<Array<Maybe<User>>>;
  thread_invitations?: Maybe<Array<Maybe<Thread>>>;
  following?: Maybe<Array<Maybe<User>>>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  created_at?: Maybe<Scalars['DateTime']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  message: Scalars['String'];
  images?: Maybe<Array<Maybe<Image>>>;
  sentBy: User;
  user: User;
  thread?: Maybe<Thread>;
};


export type Image = {
  __typename?: 'Image';
  id: Scalars['ID'];
  uri: Scalars['String'];
  post: Post;
  message?: Maybe<Message>;
  user: User;
};

export type Post = {
  __typename?: 'Post';
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Image>>;
  likes?: Maybe<Array<Like>>;
  comments?: Maybe<Array<Comment>>;
  isCtxUserIdAFollowerOfPostUser?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
  created_at?: Maybe<Scalars['DateTime']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  comments_count: Scalars['Int'];
  likes_count: Scalars['Int'];
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['ID'];
  post: Post;
  user: User;
  count: Scalars['Int'];
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  post: Post;
  user: User;
  created_at?: Maybe<Scalars['DateTime']>;
  content: Scalars['String'];
};

export type Thread = {
  __typename?: 'Thread';
  id?: Maybe<Scalars['ID']>;
  messages?: Maybe<Array<Maybe<Message>>>;
  last_message?: Maybe<Scalars['String']>;
  message_count: Scalars['Int'];
  user: User;
  invitees: Array<User>;
  created_at?: Maybe<Scalars['DateTime']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type GetMessagesFromUserInput = {
  sentBy: Scalars['String'];
  user: Scalars['String'];
};

export type GlobalPostReturnType = {
  __typename?: 'GlobalPostReturnType';
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Image>>;
  likes?: Maybe<Array<Like>>;
  comments?: Maybe<Array<Comment>>;
  user?: Maybe<User>;
  created_at?: Maybe<Scalars['DateTime']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  isCtxUserIdAFollowerOfPostUser?: Maybe<Scalars['Boolean']>;
  comments_count: Scalars['Int'];
  likes_count: Scalars['Int'];
  currently_liked: Scalars['Boolean'];
  success?: Maybe<Scalars['Boolean']>;
  action?: Maybe<Scalars['String']>;
};

export type GetGlobalPostByIdInput = {
  postId: Scalars['ID'];
};

export type FollowingPostReturnType = {
  __typename?: 'FollowingPostReturnType';
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Image>>;
  likes?: Maybe<Array<Like>>;
  comments?: Maybe<Array<Comment>>;
  isCtxUserIdAFollowerOfPostUser?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
  created_at?: Maybe<Scalars['DateTime']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  comments_count: Scalars['Int'];
  likes_count: Scalars['Int'];
  currently_liked: Scalars['Boolean'];
};

export type GetMyFollowingPostByIdInput = {
  postId: Scalars['ID'];
};

export type TransUserReturn = {
  __typename?: 'TransUserReturn';
  id: Scalars['ID'];
  thoseICanMessage?: Maybe<Array<User>>;
};

export type FeedInput = {
  cursor?: Maybe<Scalars['String']>;
  take?: Maybe<Scalars['Int']>;
};

export type ThreadConnection = {
  __typename?: 'ThreadConnection';
  edges: Array<ThreadEdge>;
  pageInfo: PageInfo;
};

export type ThreadEdge = {
  __typename?: 'ThreadEdge';
  node: Thread;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type GetMessagesByThreadIdInput = {
  cursor?: Maybe<Scalars['String']>;
  threadId: Scalars['String'];
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type MessageConnection = {
  __typename?: 'MessageConnection';
  edges: Array<MessageEdge>;
  pageInfo: PageInfo;
};

export type MessageEdge = {
  __typename?: 'MessageEdge';
  node: Message;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  createUser: User;
  changePassword?: Maybe<User>;
  confirmUser: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login?: Maybe<UserResponse>;
  logout: Scalars['Boolean'];
  register: UserResponse;
  addProfilePicture: UploadProfilePictueReturnType;
  createPost: Post;
  editUserInfo: User;
  followUser: Scalars['Boolean'];
  addNewMessage: Scalars['Boolean'];
  unFollowUser: Scalars['Boolean'];
  createMessageThread: Thread;
  addMessageToThread: AddMessagePayload;
  signS3: SignedS3Payload;
  createOrUpdateLikes?: Maybe<LikeReturnType>;
  addCommentToPost: AddCommentPayloadType;
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
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
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
  sentTo: Scalars['String'];
  message: Scalars['String'];
};


export type MutationUnFollowUserArgs = {
  data: UnFollowUserInput;
};


export type MutationCreateMessageThreadArgs = {
  sentTo: Scalars['String'];
  invitees: Array<Scalars['ID']>;
  message: Scalars['String'];
  images?: Maybe<Array<Maybe<Scalars['Upload']>>>;
};


export type MutationAddMessageToThreadArgs = {
  threadId: Scalars['ID'];
  sentTo: Scalars['String'];
  invitees: Array<Scalars['ID']>;
  message: Scalars['String'];
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
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

export type ProductInput = {
  name: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type RegisterInput = {
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  termsAndConditions: Scalars['Boolean'];
  keepMeSignedIn: Scalars['Boolean'];
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UploadProfilePictureInput = {
  user: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
};

export type UploadProfilePictueReturnType = {
  __typename?: 'UploadProfilePictueReturnType';
  message: Scalars['String'];
  profileImgUrl: Scalars['String'];
};

export type PostInput = {
  text: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  user: Scalars['ID'];
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type EditUserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
};

export type FollowUserInput = {
  userIDToFollow: Scalars['String'];
};

export type UnFollowUserInput = {
  userIDToUnFollow: Scalars['String'];
};


export type AddMessagePayload = {
  __typename?: 'AddMessagePayload';
  success: Scalars['Boolean'];
  threadId: Scalars['ID'];
  message: Message;
  user: User;
  invitees: Array<User>;
};

export type ImageSubInput = {
  filename: Scalars['String'];
  filetype: Scalars['String'];
};

export type SignedS3Payload = {
  __typename?: 'SignedS3Payload';
  signatures: Array<SignedS3SubPayload>;
};

export type SignedS3SubPayload = {
  __typename?: 'SignedS3SubPayload';
  url: Scalars['String'];
  signedRequest: Scalars['String'];
};

export type UpdateLikesInput = {
  postId: Scalars['ID'];
};

export type LikeReturnType = {
  __typename?: 'LikeReturnType';
  postId: Scalars['ID'];
  status: LikeStatus;
};

/** Describes whether a like has been created or deleted in the database. */
export enum LikeStatus {
  Created = 'Created',
  Deleted = 'Deleted',
  CountUpdated = 'CountUpdated',
  Undetermined = 'Undetermined'
}

export type NewCommentsArgs = {
  postId: Scalars['ID'];
  content: Scalars['String'];
};

export type AddCommentPayloadType = {
  __typename?: 'AddCommentPayloadType';
  id: Scalars['ID'];
  postId: Scalars['ID'];
  userId: Scalars['ID'];
  created_at?: Maybe<Scalars['String']>;
  content: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
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
};


export type SubscriptionFollowingPostsArgs = {
  data: PostSubInput;
};


export type SubscriptionNewMessageArgs = {
  sentTo: Scalars['String'];
  message: Scalars['String'];
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
  sentBy: Scalars['String'];
  message: Scalars['String'];
};

export type PostSubType = {
  __typename?: 'PostSubType';
  id: Scalars['ID'];
  title: Scalars['String'];
  text: Scalars['String'];
  images: Array<Image>;
  user: User;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type MessageSubType = {
  __typename?: 'MessageSubType';
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  sentBy: User;
  user: User;
  created_at?: Maybe<Scalars['DateTime']>;
  updated_at?: Maybe<Scalars['DateTime']>;
};

export type HandlePostPayload = {
  __typename?: 'HandlePostPayload';
  success: Scalars['Boolean'];
  action: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['Boolean']>;
  images?: Maybe<Array<Image>>;
  isCtxUserIdAFollowerOfPostUser?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
  created_at?: Maybe<Scalars['DateTime']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  comment_count?: Maybe<Scalars['Int']>;
  likes_count: Scalars['Int'];
  currently_liked: Scalars['Boolean'];
};

export type AddMessageToThreadInput_V2 = {
  threadId: Scalars['ID'];
  sentTo: Scalars['String'];
  invitees: Array<Scalars['ID']>;
  message: Scalars['String'];
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CommentCountArgs = {
  postId: Scalars['ID'];
};

export type CommentCountType = {
  __typename?: 'CommentCountType';
  count: Scalars['Int'];
  postId: Scalars['ID'];
};

export type LikesCountArgs = {
  postId: Scalars['ID'];
};

export type LikesCountType = {
  __typename?: 'LikesCountType';
  count: Scalars['Int'];
  postId: Scalars['ID'];
};

export type MessageOutput = {
  __typename?: 'MessageOutput';
  message: Scalars['String'];
};

export type MessageThreadOutput = {
  __typename?: 'MessageThreadOutput';
  message: Scalars['String'];
};

export type LikesCountReturnType = {
  __typename?: 'LikesCountReturnType';
  postId: Scalars['ID'];
  status: LikeStatus;
  count: Scalars['Int'];
};

export type PasswordInput = {
  password: Scalars['String'];
};

export type PostInputOld = {
  text: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  user: Scalars['ID'];
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GetAllMyMessagesInput = {
  user: Scalars['String'];
};

export type PostSubscriptionInput = {
  text: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  user: Scalars['ID'];
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GetMessageThreadsFromUserInput = {
  sentBy: Scalars['String'];
  user: Scalars['String'];
};

export type GetAllMyMessageThreadsInput = {
  user: Scalars['String'];
};

export type ConfirmUserMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmUser'>
);

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'username'>
    )> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);


export const ConfirmUserDocument = gql`
    mutation ConfirmUser($token: String!) {
  confirmUser(token: $token)
}
    `;

export function useConfirmUserMutation() {
  return Urql.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(ConfirmUserDocument);
};
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      email
      username
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};