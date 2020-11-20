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
};

export type Query = {
  __typename?: "Query";
  batchTeams: Array<Team>;
  getAllTeamMembers: Array<UserToTeam>;
  getAllTeamsForUser: Array<Team>;
  teamMembers?: Maybe<Array<Maybe<User>>>;
  me?: Maybe<User>;
  helloWorld: Scalars["String"];
  getAllMyMessages?: Maybe<User>;
  getListToCreateThread: Array<Maybe<User>>;
  getMyMessagesFromUser?: Maybe<Array<Message>>;
  getChannelName: Scalars["String"];
  getAllChannelMembers: Array<User>;
  getAllChannelMessages: Array<Message>;
  loadChannelsByTeamId: Array<Channel>;
  channelMembers?: Maybe<Array<Maybe<User>>>;
  loadDirectMessagesThreadById: Thread;
  loadDirectMessageThreadsByTeamAndUser: Array<Thread>;
};

export type QueryGetAllTeamMembersArgs = {
  teamId: Scalars["String"];
};

export type QueryTeamMembersArgs = {
  teamIds: Array<Scalars["ID"]>;
};

export type QueryGetListToCreateThreadArgs = {
  teamId: Scalars["String"];
};

export type QueryGetMyMessagesFromUserArgs = {
  input: GetMessagesFromUserInput;
};

export type QueryGetChannelNameArgs = {
  channelId: Scalars["String"];
};

export type QueryGetAllChannelMembersArgs = {
  channelId: Scalars["String"];
};

export type QueryGetAllChannelMessagesArgs = {
  teamId?: Maybe<Scalars["String"]>;
  channelId?: Maybe<Scalars["String"]>;
};

export type QueryLoadChannelsByTeamIdArgs = {
  teamId: Scalars["String"];
};

export type QueryChannelMembersArgs = {
  channelIds: Array<Scalars["ID"]>;
};

export type QueryLoadDirectMessagesThreadByIdArgs = {
  teamId: Scalars["String"];
  threadId: Scalars["String"];
};

export type QueryLoadDirectMessageThreadsByTeamAndUserArgs = {
  teamId: Scalars["String"];
};

export type Team = {
  __typename?: "Team";
  id: Scalars["ID"];
  name: Scalars["String"];
  owner: User;
  channels: Array<Maybe<Channel>>;
  threads: Array<Maybe<Thread>>;
  members: Array<Maybe<User>>;
  userToTeams: Array<Maybe<UserToTeam>>;
};

export type User = {
  __typename?: "User";
  id?: Maybe<Scalars["ID"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  channels_created?: Maybe<Channel>;
  images?: Maybe<Array<Maybe<Image>>>;
  files?: Maybe<Array<Maybe<FileEntity>>>;
  mappedMessages?: Maybe<Array<Maybe<Message>>>;
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
  threads?: Maybe<Array<Thread>>;
  thread_invitations?: Maybe<Array<Maybe<Thread>>>;
  channel_memberships?: Maybe<Array<Maybe<Channel>>>;
  profileImageUri?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  team_ownership: Scalars["String"];
  messages?: Maybe<Array<Message>>;
  sent_messages?: Maybe<Array<Message>>;
  userToTeams?: Maybe<Array<UserToTeam>>;
};

export type Channel = {
  __typename?: "Channel";
  id?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
  messages?: Maybe<Array<Maybe<Message>>>;
  last_message?: Maybe<Scalars["String"]>;
  message_count: Scalars["Int"];
  /** Determines whether this channel is viewable to the public. (default = false) */
  public?: Maybe<Scalars["Boolean"]>;
  team: Array<Team>;
  invitees?: Maybe<Array<Maybe<User>>>;
  created_by: User;
  created_at?: Maybe<Scalars["DateTime"]>;
  updated_at?: Maybe<Scalars["DateTime"]>;
};

export type Message = {
  __typename?: "Message";
  id: Scalars["ID"];
  created_at?: Maybe<Scalars["DateTime"]>;
  updated_at?: Maybe<Scalars["DateTime"]>;
  message: Scalars["String"];
  images?: Maybe<Array<Maybe<Image>>>;
  files?: Maybe<Array<Maybe<FileEntity>>>;
  sentBy: User;
  user: User;
  channel?: Maybe<Channel>;
  thread?: Maybe<Thread>;
};

export type Image = {
  __typename?: "Image";
  id: Scalars["ID"];
  uri: Scalars["String"];
  message?: Maybe<Message>;
  user: User;
};

export type FileEntity = {
  __typename?: "FileEntity";
  id: Scalars["ID"];
  uri: Scalars["String"];
  file_type: FileTypeEnum;
  message?: Maybe<Message>;
  upload_user: User;
};

/** css | csv | image-all | pdf | svg | docx | other */
export enum FileTypeEnum {
  Css = "CSS",
  Csv = "CSV",
  Image = "IMAGE",
  Pdf = "PDF",
  Svg = "SVG",
  Md = "MD",
  Doc = "DOC",
  Other = "OTHER"
}

export type Thread = {
  __typename?: "Thread";
  id?: Maybe<Scalars["ID"]>;
  messages?: Maybe<Array<Maybe<Message>>>;
  last_message?: Maybe<Scalars["String"]>;
  message_count: Scalars["Int"];
  user: User;
  team?: Maybe<Team>;
  invitees: Array<User>;
  created_at?: Maybe<Scalars["DateTime"]>;
  updated_at?: Maybe<Scalars["DateTime"]>;
};

export type UserToTeam = {
  __typename?: "UserToTeam";
  userToTeamId: Scalars["ID"];
  userId: Scalars["ID"];
  teamId: Scalars["ID"];
  teamRoleAuthorizations: Array<TeamRoleEnum>;
  user: User;
  team: Team;
};

/** admin | owner | member | public guest */
export enum TeamRoleEnum {
  Admin = "ADMIN",
  Owner = "OWNER",
  Member = "MEMBER",
  PublicGuest = "PUBLIC_GUEST"
}

export type GetMessagesFromUserInput = {
  sentBy: Scalars["String"];
  user: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createProduct: Product;
  createUser: User;
  addTeamMember: UserToTeamIdReferencesOnlyClass;
  createTeam: Team;
  teamLogin?: Maybe<User>;
  changePasswordFromContextUserid?: Maybe<User>;
  changePasswordFromToken?: Maybe<User>;
  confirmUser: Scalars["Boolean"];
  forgotPassword: Scalars["Boolean"];
  login?: Maybe<User>;
  logout: Scalars["Boolean"];
  register: User;
  addProfilePicture: UploadProfilePictueReturnType;
  editUserInfo: User;
  adminEditUserInfo: UserClassTypeWithReferenceIds;
  signS3: SignedS3Payload;
  signS3GetObject: SignedS3Payload;
  addMessageToChannel: AddMessagePayload;
  addChannelMember: Scalars["Boolean"];
  removeChannelMember: Scalars["Boolean"];
  createChannel: Channel;
  updateChannelName: Scalars["Boolean"];
  deleteChannel: Scalars["Boolean"];
  addDirectMessageToThread: AddDirectMessagePayload;
  createDirectMessage: AddDirectMessagePayload;
};

export type MutationCreateProductArgs = {
  data: ProductInput;
};

export type MutationCreateUserArgs = {
  data: RegisterInput;
};

export type MutationAddTeamMemberArgs = {
  roles: Array<TeamRoleEnum>;
  teamId: Scalars["String"];
  email: Scalars["String"];
};

export type MutationCreateTeamArgs = {
  name: Scalars["String"];
};

export type MutationTeamLoginArgs = {
  email: Scalars["Int"];
  password: Scalars["Int"];
  teamId: Scalars["String"];
};

export type MutationChangePasswordFromContextUseridArgs = {
  data: PasswordInput;
};

export type MutationChangePasswordFromTokenArgs = {
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

export type MutationEditUserInfoArgs = {
  data: EditUserInput;
};

export type MutationAdminEditUserInfoArgs = {
  data: EditUserInput;
};

export type MutationSignS3Args = {
  files: Array<ImageSubInput>;
  action: S3SignatureAction;
};

export type MutationSignS3GetObjectArgs = {
  files: Array<FileInput>;
  action?: Maybe<S3SignatureAction>;
};

export type MutationAddMessageToChannelArgs = {
  data: AddMessageToChannelInput;
};

export type MutationAddChannelMemberArgs = {
  channelId: Scalars["String"];
  userId: Scalars["ID"];
};

export type MutationRemoveChannelMemberArgs = {
  channelId: Scalars["String"];
  userId: Scalars["ID"];
};

export type MutationCreateChannelArgs = {
  input: AddChannelInput;
};

export type MutationUpdateChannelNameArgs = {
  channelId: Scalars["String"];
  name: Scalars["String"];
};

export type MutationDeleteChannelArgs = {
  channelId: Scalars["String"];
  channelName: Scalars["String"];
};

export type MutationAddDirectMessageToThreadArgs = {
  input: AddDirectMessageToThreadInput;
};

export type MutationCreateDirectMessageArgs = {
  input: CreateDirectMessageInput;
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
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  username: Scalars["String"];
  email: Scalars["String"];
};

export type UserToTeamIdReferencesOnlyClass = {
  __typename?: "UserToTeamIdReferencesOnlyClass";
  userToTeamId: Scalars["ID"];
  userId: Scalars["ID"];
  teamId: Scalars["ID"];
  teamRoleAuthorizations: Array<TeamRoleEnum>;
};

export type PasswordInput = {
  password: Scalars["String"];
};

export type ChangePasswordInput = {
  password: Scalars["String"];
  token?: Maybe<Scalars["String"]>;
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

export type EditUserInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  teamRoles: Array<TeamRoleEnum>;
  teamId: Scalars["ID"];
};

export type UserClassTypeWithReferenceIds = {
  __typename?: "UserClassTypeWithReferenceIds";
  id?: Maybe<Scalars["ID"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  channels_created?: Maybe<Channel>;
  images?: Maybe<Array<Maybe<Image>>>;
  files?: Maybe<Array<Maybe<FileEntity>>>;
  mappedMessages?: Maybe<Array<Maybe<Message>>>;
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
  threads?: Maybe<Array<Thread>>;
  thread_invitations?: Maybe<Array<Maybe<Thread>>>;
  channel_memberships?: Maybe<Array<Maybe<Channel>>>;
  profileImageUri?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  team_ownership: Scalars["String"];
  messages?: Maybe<Array<Message>>;
  sent_messages?: Maybe<Array<Message>>;
  userToTeams?: Maybe<Array<UserToTeamIdReferencesOnlyClass>>;
};

export type ImageSubInput = {
  type: Scalars["String"];
  lastModified: Scalars["Float"];
  lastModifiedDate: Scalars["DateTime"];
  size: Scalars["Int"];
  name: Scalars["String"];
  webkitRelativePath: Scalars["String"];
  path: Scalars["String"];
};

/** The actions associated with obtaining a signed URL from S3 (get | put | delete) */
export enum S3SignatureAction {
  PutObject = "putObject",
  GetObject = "getObject"
}

export type SignedS3Payload = {
  __typename?: "SignedS3Payload";
  signatures: Array<SignedS3SubPayload>;
};

export type SignedS3SubPayload = {
  __typename?: "SignedS3SubPayload";
  uri: Scalars["String"];
  signedRequest: Scalars["String"];
};

export type FileInput = {
  id: Scalars["ID"];
  uri: Scalars["String"];
};

export type AddMessageToChannelInput = {
  channelId: Scalars["ID"];
  teamId: Scalars["ID"];
  created_at?: Maybe<Scalars["DateTime"]>;
  sentTo: Scalars["String"];
  invitees?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  message: Scalars["String"];
  images?: Maybe<Array<Maybe<Scalars["String"]>>>;
  files?: Maybe<Array<Maybe<FileInputHelper>>>;
};

export type FileInputHelper = {
  uri: Scalars["String"];
  file_type: FileTypeEnum;
};

export type AddMessagePayload = {
  __typename?: "AddMessagePayload";
  success: Scalars["Boolean"];
  channelId: Scalars["ID"];
  message: Message;
  user: User;
  invitees?: Maybe<Array<Maybe<User>>>;
};

export type AddChannelInput = {
  teamId: Scalars["ID"];
  name: Scalars["String"];
};

export type AddDirectMessageToThreadInput = {
  threadId: Scalars["ID"];
  teamId: Scalars["ID"];
  message_text: Scalars["String"];
  invitees: Array<Scalars["String"]>;
};

export type AddDirectMessagePayload = {
  __typename?: "AddDirectMessagePayload";
  success: Scalars["Boolean"];
  threadId: Scalars["ID"];
  message: Message;
  sentBy: User;
  invitees: Array<User>;
};

export type CreateDirectMessageInput = {
  teamId: Scalars["ID"];
  message_text: Scalars["String"];
  invitees: Array<Scalars["String"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  newMessageSub: Message;
  newDirectMessageSub: AddDirectMessagePayload;
};

export type SubscriptionNewMessageSubArgs = {
  data: AddMessageToChannelInput;
};

export type Role = {
  __typename?: "Role";
  id?: Maybe<Scalars["ID"]>;
  teamRoleAuthorizations: Array<TeamRoleEnum>;
};

export type MessageOutput = {
  __typename?: "MessageOutput";
  message: Scalars["String"];
};

export type UserTeam = {
  __typename?: "UserTeam";
  userId: Scalars["ID"];
  teamId: Scalars["ID"];
  name: Scalars["String"];
};

export type GetFileObjectInput = {
  id: Scalars["ID"];
  uri: Scalars["String"];
};

export type GetAllMyMessagesInput = {
  user: Scalars["String"];
};

export type ChangePasswordFromContextUseridMutationVariables = Exact<{
  data: PasswordInput;
}>;

export type ChangePasswordFromContextUseridMutation = {
  __typename?: "Mutation";
} & {
  changePasswordFromContextUserid?: Maybe<
    { __typename?: "User" } & Pick<User, "id" | "name" | "username">
  >;
};

export type ConfirmUserMutationVariables = Exact<{
  token: Scalars["String"];
}>;

export type ConfirmUserMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "confirmUser"
>;

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
  register: { __typename?: "User" } & Pick<User, "id" | "name" | "username">;
};

export type GetAllTeamsForUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllTeamsForUserQuery = { __typename?: "Query" } & {
  getAllTeamsForUser: Array<
    { __typename?: "Team" } & Pick<Team, "id" | "name"> & {
        members: Array<
          Maybe<{ __typename?: "User" } & Pick<User, "id" | "name">>
        >;
      }
  >;
};

export type LoginMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login?: Maybe<
    { __typename?: "User" } & Pick<User, "id" | "name" | "username">
  >;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "name" | "username">>;
};

export const ChangePasswordFromContextUseridDocument = gql`
  mutation ChangePasswordFromContextUserid($data: PasswordInput!) {
    changePasswordFromContextUserid(data: $data) {
      id
      name
      username
    }
  }
`;
export type ChangePasswordFromContextUseridMutationFn = Apollo.MutationFunction<
  ChangePasswordFromContextUseridMutation,
  ChangePasswordFromContextUseridMutationVariables
>;

/**
 * __useChangePasswordFromContextUseridMutation__
 *
 * To run a mutation, you first call `useChangePasswordFromContextUseridMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordFromContextUseridMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordFromContextUseridMutation, { data, loading, error }] = useChangePasswordFromContextUseridMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordFromContextUseridMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePasswordFromContextUseridMutation,
    ChangePasswordFromContextUseridMutationVariables
  >
) {
  return Apollo.useMutation<
    ChangePasswordFromContextUseridMutation,
    ChangePasswordFromContextUseridMutationVariables
  >(ChangePasswordFromContextUseridDocument, baseOptions);
}
export type ChangePasswordFromContextUseridMutationHookResult = ReturnType<
  typeof useChangePasswordFromContextUseridMutation
>;
export type ChangePasswordFromContextUseridMutationResult = Apollo.MutationResult<
  ChangePasswordFromContextUseridMutation
>;
export type ChangePasswordFromContextUseridMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordFromContextUseridMutation,
  ChangePasswordFromContextUseridMutationVariables
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
      id
      name
      username
    }
  }
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
export const GetAllTeamsForUserDocument = gql`
  query GetAllTeamsForUser {
    getAllTeamsForUser {
      id
      name
      members {
        id
        name
      }
    }
  }
`;

/**
 * __useGetAllTeamsForUserQuery__
 *
 * To run a query within a React component, call `useGetAllTeamsForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTeamsForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTeamsForUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTeamsForUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllTeamsForUserQuery,
    GetAllTeamsForUserQueryVariables
  >
) {
  return Apollo.useQuery<
    GetAllTeamsForUserQuery,
    GetAllTeamsForUserQueryVariables
  >(GetAllTeamsForUserDocument, baseOptions);
}
export function useGetAllTeamsForUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllTeamsForUserQuery,
    GetAllTeamsForUserQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    GetAllTeamsForUserQuery,
    GetAllTeamsForUserQueryVariables
  >(GetAllTeamsForUserDocument, baseOptions);
}
export type GetAllTeamsForUserQueryHookResult = ReturnType<
  typeof useGetAllTeamsForUserQuery
>;
export type GetAllTeamsForUserLazyQueryHookResult = ReturnType<
  typeof useGetAllTeamsForUserLazyQuery
>;
export type GetAllTeamsForUserQueryResult = Apollo.QueryResult<
  GetAllTeamsForUserQuery,
  GetAllTeamsForUserQueryVariables
>;
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      name
      username
    }
  }
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
      id
      name
      username
    }
  }
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
