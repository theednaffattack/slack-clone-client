import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
};

export type AddChannelInput = {
  teamId: Scalars["ID"];
  name: Scalars["String"];
};

export type AddDirectMessagePayload = {
  __typename?: "AddDirectMessagePayload";
  success: Scalars["Boolean"];
  threadId: Scalars["ID"];
  message: Message;
  sentBy: User;
  invitees: Array<User>;
};

export type AddDirectMessageToThreadInput = {
  threadId: Scalars["ID"];
  teamId: Scalars["ID"];
  message_text: Scalars["String"];
  invitees: Array<Scalars["String"]>;
};

export type AddMessagePayload = {
  __typename?: "AddMessagePayload";
  success: Scalars["Boolean"];
  channelId: Scalars["ID"];
  message: Message;
  user: User;
  invitees?: Maybe<Array<Maybe<User>>>;
};

export type AddMessageToChannelInput = {
  channelId: Scalars["ID"];
  teamId: Scalars["ID"];
  created_at?: Maybe<Scalars["DateTime"]>;
  invitees: Array<Scalars["ID"]>;
  message: Scalars["String"];
  images?: Maybe<Array<Maybe<Scalars["String"]>>>;
  files?: Maybe<Array<Maybe<FileInputHelper>>>;
};

export type AddTeamMemberByEmailInput = {
  email: Scalars["String"];
  teamRoles: Array<TeamRoleEnum>;
  teamId: Scalars["ID"];
};

export type AddTeamMemberByIdInput = {
  userId: Scalars["String"];
  teamRoles: Array<TeamRoleEnum>;
  teamId: Scalars["ID"];
};

export type AddThreadPayload = {
  __typename?: "AddThreadPayload";
  success: Scalars["Boolean"];
  channelId: Scalars["ID"];
  created_at?: Maybe<Scalars["DateTime"]>;
  threadId: Scalars["ID"];
  message: Message;
  sentBy: User;
  invitees?: Maybe<Array<Maybe<User>>>;
};

export type ChangePasswordInput = {
  password: Scalars["String"];
  token?: Maybe<Scalars["String"]>;
};

export type ChangePasswordResponse = {
  __typename?: "ChangePasswordResponse";
  errors?: Maybe<FieldError>;
  user?: Maybe<User>;
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
  team: Team;
  invitees?: Maybe<Array<Maybe<User>>>;
  threads?: Maybe<Array<Maybe<Thread>>>;
  created_by: User;
  created_at?: Maybe<Scalars["DateTime"]>;
  updated_at?: Maybe<Scalars["DateTime"]>;
};

export type CreateDirectMessageInput = {
  teamId: Scalars["ID"];
  message_text: Scalars["String"];
  invitees: Array<Scalars["String"]>;
};

export type EditUserInfoResponse = {
  __typename?: "EditUserInfoResponse";
  errors?: Maybe<FieldError>;
  userWithRoles?: Maybe<UserExtendedWithTeamRoles>;
};

export type EditUserInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  teamRoles: Array<TeamRoleEnum>;
  teamId: Scalars["ID"];
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type FileEntity = {
  __typename?: "FileEntity";
  id: Scalars["ID"];
  uri: Scalars["String"];
  file_type: FileTypeEnum;
  message?: Maybe<Message>;
  upload_user: User;
};

export type FileInput = {
  id: Scalars["ID"];
  uri: Scalars["String"];
};

export type FileInputHelper = {
  uri: Scalars["String"];
  file_type: FileTypeEnum;
};

export type FileInput_V2 = {
  type: Scalars["String"];
  lastModified: Scalars["Float"];
  lastModifiedDate: Scalars["String"];
  size: Scalars["Int"];
  name: Scalars["String"];
  webkitRelativePath: Scalars["String"];
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

export type GetMessagesFromUserInput = {
  sentBy: Scalars["String"];
  user: Scalars["String"];
};

export type Image = {
  __typename?: "Image";
  id: Scalars["ID"];
  uri: Scalars["String"];
  message?: Maybe<Message>;
  user: User;
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

export type Invitation = {
  __typename?: "Invitation";
  id: Scalars["ID"];
  email: Scalars["EmailAddress"];
  teamId: Scalars["ID"];
  team: Team;
  status: InvitationStatusEnum;
  created_at?: Maybe<Scalars["DateTime"]>;
  updated_at?: Maybe<Scalars["DateTime"]>;
};

/** admin | owner | member | public guest */
export enum InvitationStatusEnum {
  Accepted = "ACCEPTED",
  Pending = "PENDING",
  AcceptError = "ACCEPT_ERROR",
  Reissued = "REISSUED",
  Rescinded = "RESCINDED",
  Sent = "SENT",
  Unsent = "UNSENT"
}

export type InviteTeamMemberInput = {
  email: Scalars["String"];
  teamRoles: Array<TeamRoleEnum>;
  teamId: Scalars["ID"];
};

export type InviteTeamMemberResponse = {
  __typename?: "InviteTeamMemberResponse";
  errors?: Maybe<Array<FieldError>>;
  invitation?: Maybe<Invitation>;
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  accessToken?: Maybe<Scalars["String"]>;
};

export type MeResponse = {
  __typename?: "MeResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
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

export type Mutation = {
  __typename?: "Mutation";
  signS3: SignedS3Payload;
  signS3Files: SignedS3Payload;
  signS3GetObject: SignedS3Payload;
  inviteNewTeamMember: InviteTeamMemberResponse;
  addTeamMemberByEmail: UserToTeamIdReferencesOnlyClass;
  addTeamMemberById: UserToTeamIdReferencesOnlyClass;
  createTeam: TeamResponse;
  teamLogin?: Maybe<User>;
  addMessageToChannel: AddMessagePayload;
  addThreadToChannel: AddThreadPayload;
  addChannelMember: Scalars["Boolean"];
  removeChannelMember: Scalars["Boolean"];
  createChannel: Channel;
  updateChannelName: Scalars["Boolean"];
  deleteChannel: Scalars["Boolean"];
  addDirectMessageToThread: AddDirectMessagePayload;
  createDirectMessage: AddDirectMessagePayload;
  adminEditUserInfo: UserClassTypeWithReferenceIds;
  changePasswordFromContextUserid?: Maybe<User>;
  changePasswordFromToken: ChangePasswordResponse;
  confirmUser: Scalars["Boolean"];
  createUser: User;
  createProduct: Product;
  editCurrentUserInfo: EditUserInfoResponse;
  forgotPassword: Scalars["Boolean"];
  login: LoginResponse;
  logout: Scalars["Boolean"];
  addProfilePicture: UploadProfilePictueReturnType;
  register: RegisterResponse;
  revokeRefreshTokensForUser: Scalars["Boolean"];
};

export type MutationSignS3Args = {
  files: Array<ImageSubInput>;
  action: S3SignatureAction;
};

export type MutationSignS3FilesArgs = {
  files: Array<FileInput_V2>;
  action: S3SignatureAction;
};

export type MutationSignS3GetObjectArgs = {
  files: Array<FileInput>;
  action?: Maybe<S3SignatureAction>;
};

export type MutationInviteNewTeamMemberArgs = {
  data: InviteTeamMemberInput;
};

export type MutationAddTeamMemberByEmailArgs = {
  data: AddTeamMemberByEmailInput;
};

export type MutationAddTeamMemberByIdArgs = {
  data: AddTeamMemberByIdInput;
};

export type MutationCreateTeamArgs = {
  name: Scalars["String"];
};

export type MutationTeamLoginArgs = {
  email: Scalars["Int"];
  password: Scalars["Int"];
  teamId: Scalars["String"];
};

export type MutationAddMessageToChannelArgs = {
  data: AddMessageToChannelInput;
};

export type MutationAddThreadToChannelArgs = {
  data: AddMessageToChannelInput;
};

export type MutationAddChannelMemberArgs = {
  channelId: Scalars["String"];
  userId: Scalars["String"];
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

export type MutationAdminEditUserInfoArgs = {
  data: EditUserInput;
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

export type MutationCreateUserArgs = {
  data: RegisterInput;
};

export type MutationCreateProductArgs = {
  data: ProductInput;
};

export type MutationEditCurrentUserInfoArgs = {
  data: EditUserInput;
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type MutationAddProfilePictureArgs = {
  data: UploadProfilePictureInput;
};

export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars["Int"];
};

export type PasswordInput = {
  password: Scalars["String"];
};

export type Product = {
  __typename?: "Product";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type ProductInput = {
  name: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  batchTeams: Array<Team>;
  getAllTeamMembers: Array<UserToTeam>;
  getAllTeamsForUser: Array<UserToTeam>;
  teamMembers?: Maybe<Array<Maybe<User>>>;
  getChannelName: Scalars["String"];
  getAllChannelMembers: Array<User>;
  getAllChannelMessages: Array<Message>;
  getAllChannelThreads: Array<Thread>;
  loadChannelsByTeamId: Array<Channel>;
  channelMembers?: Maybe<Array<Maybe<User>>>;
  loadDirectMessagesThreadById: Thread;
  loadDirectMessageThreadsByTeamAndUser: Array<Thread>;
  getAllMyMessages?: Maybe<User>;
  getListToCreateThread: Array<Maybe<User>>;
  getMyMessagesFromUser?: Maybe<Array<Message>>;
  bye: Scalars["String"];
  me?: Maybe<MeResponse>;
  helloWorld: Scalars["String"];
};

export type QueryGetAllTeamMembersArgs = {
  teamId: Scalars["String"];
};

export type QueryTeamMembersArgs = {
  teamIds: Array<Scalars["ID"]>;
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

export type QueryGetAllChannelThreadsArgs = {
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

export type QueryGetListToCreateThreadArgs = {
  teamId: Scalars["String"];
};

export type QueryGetMyMessagesFromUserArgs = {
  input: GetMessagesFromUserInput;
};

export type RegisterInput = {
  password: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  username: Scalars["String"];
  email: Scalars["String"];
};

export type RegisterResponse = {
  __typename?: "RegisterResponse";
  errors?: Maybe<FieldError>;
  user?: Maybe<User>;
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

export type Subscription = {
  __typename?: "Subscription";
  newMessageSub: AddThreadPayload;
  newDirectMessageSub: AddDirectMessagePayload;
};

export type SubscriptionNewMessageSubArgs = {
  data: AddMessageToChannelInput;
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
  invitations: Array<Maybe<Invitation>>;
};

export type TeamResponse = {
  __typename?: "TeamResponse";
  errors?: Maybe<Array<FieldError>>;
  uttData?: Maybe<UttData>;
};

/** admin | owner | member | public guest */
export enum TeamRoleEnum {
  Admin = "ADMIN",
  Owner = "OWNER",
  Member = "MEMBER",
  PublicGuest = "PUBLIC_GUEST"
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
  channel?: Maybe<Channel>;
  created_at?: Maybe<Scalars["DateTime"]>;
  updated_at?: Maybe<Scalars["DateTime"]>;
};

export type UploadProfilePictueReturnType = {
  __typename?: "UploadProfilePictueReturnType";
  message: Scalars["String"];
  profileImgUrl: Scalars["String"];
};

export type UploadProfilePictureInput = {
  user: Scalars["ID"];
  image?: Maybe<Scalars["String"]>;
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
  team_scopes: Array<Scalars["String"]>;
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

export type UserExtendedWithTeamRoles = {
  __typename?: "UserExtendedWithTeamRoles";
  user: User;
  teamRoles: Array<TeamRoleEnum>;
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

export type UserToTeamIdReferencesOnlyClass = {
  __typename?: "UserToTeamIdReferencesOnlyClass";
  userToTeamId: Scalars["ID"];
  userId: Scalars["ID"];
  teamId: Scalars["ID"];
  teamRoleAuthorizations: Array<TeamRoleEnum>;
};

export type UttData = {
  __typename?: "UttData";
  name: Scalars["String"];
  teamId: Scalars["String"];
  userId: Scalars["String"];
  userToTeamId: Scalars["String"];
};

export type AddChannelMemberMutationVariables = Exact<{
  channelId: Scalars["String"];
  userId: Scalars["String"];
}>;

export type AddChannelMemberMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "addChannelMember"
>;

export type AddDirectMessageToThreadMutationVariables = Exact<{
  input: AddDirectMessageToThreadInput;
}>;

export type AddDirectMessageToThreadMutation = { __typename?: "Mutation" } & {
  addDirectMessageToThread: { __typename?: "AddDirectMessagePayload" } & Pick<
    AddDirectMessagePayload,
    "success" | "threadId"
  > & {
      message: { __typename?: "Message" } & Pick<
        Message,
        "id" | "created_at" | "message"
      >;
      sentBy: { __typename?: "User" } & Pick<
        User,
        "id" | "username" | "profileImageUri"
      >;
    };
};

export type AddMessageToChannelMutationVariables = Exact<{
  data: AddMessageToChannelInput;
}>;

export type AddMessageToChannelMutation = { __typename?: "Mutation" } & {
  addMessageToChannel: { __typename?: "AddMessagePayload" } & Pick<
    AddMessagePayload,
    "success" | "channelId"
  > & {
      message: { __typename?: "Message" } & Pick<Message, "id" | "message">;
      user: { __typename?: "User" } & Pick<User, "id" | "name" | "username">;
      invitees?: Maybe<
        Array<
          Maybe<
            { __typename?: "User" } & Pick<User, "id" | "name" | "username">
          >
        >
      >;
    };
};

export type AddTeamMemberByIdMutationVariables = Exact<{
  data: AddTeamMemberByIdInput;
}>;

export type AddTeamMemberByIdMutation = { __typename?: "Mutation" } & {
  addTeamMemberById: { __typename?: "UserToTeamIdReferencesOnlyClass" } & Pick<
    UserToTeamIdReferencesOnlyClass,
    "userToTeamId" | "userId" | "teamId" | "teamRoleAuthorizations"
  >;
};

export type AddThreadToChannelMutationVariables = Exact<{
  data: AddMessageToChannelInput;
}>;

export type AddThreadToChannelMutation = { __typename?: "Mutation" } & {
  addThreadToChannel: { __typename?: "AddThreadPayload" } & Pick<
    AddThreadPayload,
    "success" | "channelId" | "created_at" | "threadId"
  > & {
      invitees?: Maybe<
        Array<
          Maybe<
            { __typename?: "User" } & Pick<
              User,
              "id" | "name" | "username" | "profileImageUri"
            >
          >
        >
      >;
      message: { __typename?: "Message" } & Pick<
        Message,
        "id" | "created_at" | "message"
      >;
    };
};

export type ChangePasswordFromTokenMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;

export type ChangePasswordFromTokenMutation = { __typename?: "Mutation" } & {
  changePasswordFromToken: { __typename?: "ChangePasswordResponse" } & {
    errors?: Maybe<
      { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
    >;
    user?: Maybe<
      { __typename?: "User" } & Pick<User, "id" | "name" | "username">
    >;
  };
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

export type CreateChannelMutationVariables = Exact<{
  input: AddChannelInput;
}>;

export type CreateChannelMutation = { __typename?: "Mutation" } & {
  createChannel: { __typename?: "Channel" } & Pick<Channel, "id" | "name"> & {
      invitees?: Maybe<
        Array<Maybe<{ __typename?: "User" } & Pick<User, "id" | "username">>>
      >;
    };
};

export type CreateDirectMessageMutationVariables = Exact<{
  input: CreateDirectMessageInput;
}>;

export type CreateDirectMessageMutation = { __typename?: "Mutation" } & {
  createDirectMessage: { __typename?: "AddDirectMessagePayload" } & Pick<
    AddDirectMessagePayload,
    "success" | "threadId"
  > & {
      message: { __typename?: "Message" } & Pick<
        Message,
        "id" | "message" | "created_at"
      > & { sentBy: { __typename?: "User" } & Pick<User, "id" | "username"> };
      invitees: Array<{ __typename?: "User" } & Pick<User, "id" | "username">>;
    };
};

export type CreateTeamMutationVariables = Exact<{
  name: Scalars["String"];
}>;

export type CreateTeamMutation = { __typename?: "Mutation" } & {
  createTeam: { __typename?: "TeamResponse" } & {
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >;
    uttData?: Maybe<
      { __typename?: "UttData" } & Pick<
        UttData,
        "name" | "teamId" | "userId" | "userToTeamId"
      >
    >;
  };
};

export type EditCurrentUserInfoMutationVariables = Exact<{
  data: EditUserInput;
}>;

export type EditCurrentUserInfoMutation = { __typename?: "Mutation" } & {
  editCurrentUserInfo: { __typename?: "EditUserInfoResponse" } & {
    errors?: Maybe<
      { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
    >;
    userWithRoles?: Maybe<
      { __typename?: "UserExtendedWithTeamRoles" } & Pick<
        UserExtendedWithTeamRoles,
        "teamRoles"
      > & {
          user: { __typename?: "User" } & Pick<
            User,
            "id" | "firstName" | "username"
          >;
        }
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

export type InviteNewTeamMemberMutationVariables = Exact<{
  data: InviteTeamMemberInput;
}>;

export type InviteNewTeamMemberMutation = { __typename?: "Mutation" } & {
  inviteNewTeamMember: { __typename?: "InviteTeamMemberResponse" } & {
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >;
    invitation?: Maybe<
      { __typename?: "Invitation" } & Pick<
        Invitation,
        "id" | "email" | "teamId" | "status"
      >
    >;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "RegisterResponse" } & {
    errors?: Maybe<
      { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
    >;
    user?: Maybe<
      { __typename?: "User" } & Pick<User, "id" | "name" | "username">
    >;
  };
};

export type SignS3FilesMutationVariables = Exact<{
  files: Array<FileInput_V2> | FileInput_V2;
  action: S3SignatureAction;
}>;

export type SignS3FilesMutation = { __typename?: "Mutation" } & {
  signS3Files: { __typename?: "SignedS3Payload" } & {
    signatures: Array<
      { __typename?: "SignedS3SubPayload" } & Pick<
        SignedS3SubPayload,
        "uri" | "signedRequest"
      >
    >;
  };
};

export type SignS3GetObjectMutationVariables = Exact<{
  files: Array<FileInput> | FileInput;
  action?: Maybe<S3SignatureAction>;
}>;

export type SignS3GetObjectMutation = { __typename?: "Mutation" } & {
  signS3GetObject: { __typename?: "SignedS3Payload" } & {
    signatures: Array<
      { __typename?: "SignedS3SubPayload" } & Pick<
        SignedS3SubPayload,
        "uri" | "signedRequest"
      >
    >;
  };
};

export type SignS3MutationVariables = Exact<{
  files: Array<ImageSubInput> | ImageSubInput;
  action: S3SignatureAction;
}>;

export type SignS3Mutation = { __typename?: "Mutation" } & {
  signS3: { __typename?: "SignedS3Payload" } & {
    signatures: Array<
      { __typename?: "SignedS3SubPayload" } & Pick<
        SignedS3SubPayload,
        "uri" | "signedRequest"
      >
    >;
  };
};

export type GetAllChannelThreadsQueryVariables = Exact<{
  channelId: Scalars["String"];
  teamId: Scalars["String"];
}>;

export type GetAllChannelThreadsQuery = { __typename?: "Query" } & {
  getAllChannelThreads: Array<
    { __typename?: "Thread" } & Pick<
      Thread,
      "id" | "created_at" | "last_message"
    > & {
        invitees: Array<
          { __typename?: "User" } & Pick<
            User,
            "id" | "username" | "name" | "profileImageUri"
          >
        >;
        messages?: Maybe<
          Array<
            Maybe<
              { __typename?: "Message" } & Pick<
                Message,
                "id" | "message" | "created_at"
              >
            >
          >
        >;
      }
  >;
};

export type GetAllMyMessagesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllMyMessagesQuery = { __typename?: "Query" } & {
  getAllMyMessages?: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "id" | "username" | "profileImageUri"
    > & {
        mappedMessages?: Maybe<
          Array<
            Maybe<
              { __typename?: "Message" } & Pick<
                Message,
                "id" | "created_at" | "message"
              > & {
                  images?: Maybe<
                    Array<
                      Maybe<
                        { __typename?: "Image" } & Pick<Image, "id" | "uri">
                      >
                    >
                  >;
                  files?: Maybe<
                    Array<
                      Maybe<
                        { __typename?: "FileEntity" } & Pick<
                          FileEntity,
                          "id" | "uri" | "file_type"
                        >
                      >
                    >
                  >;
                }
            >
          >
        >;
      }
  >;
};

export type GetAllTeamMembersQueryVariables = Exact<{
  teamId: Scalars["String"];
}>;

export type GetAllTeamMembersQuery = { __typename?: "Query" } & {
  getAllTeamMembers: Array<
    { __typename?: "UserToTeam" } & Pick<
      UserToTeam,
      "teamRoleAuthorizations"
    > & {
        user: { __typename?: "User" } & Pick<
          User,
          "id" | "name" | "username" | "profileImageUri"
        >;
      }
  >;
};

export type GetAllTeamsForUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllTeamsForUserQuery = { __typename?: "Query" } & {
  getAllTeamsForUser: Array<
    { __typename?: "UserToTeam" } & Pick<
      UserToTeam,
      "userToTeamId" | "userId" | "teamId"
    > & { team: { __typename?: "Team" } & Pick<Team, "id" | "name"> }
  >;
};

export type LoadChannelsByTeamIdQueryVariables = Exact<{
  teamId: Scalars["String"];
}>;

export type LoadChannelsByTeamIdQuery = { __typename?: "Query" } & {
  loadChannelsByTeamId: Array<
    { __typename?: "Channel" } & Pick<Channel, "id" | "name"> & {
        invitees?: Maybe<
          Array<
            Maybe<
              { __typename?: "User" } & Pick<
                User,
                "id" | "username" | "profileImageUri"
              >
            >
          >
        >;
      }
  >;
};

export type LoadDirectMessageThreadsByTeamAndUserQueryVariables = Exact<{
  teamId: Scalars["String"];
}>;

export type LoadDirectMessageThreadsByTeamAndUserQuery = {
  __typename?: "Query";
} & {
  loadDirectMessageThreadsByTeamAndUser: Array<
    { __typename?: "Thread" } & Pick<Thread, "id" | "last_message"> & {
        invitees: Array<
          { __typename?: "User" } & Pick<User, "id" | "username">
        >;
      }
  >;
};

export type LoadDirectMessagesThreadByIdQueryVariables = Exact<{
  teamId: Scalars["String"];
  threadId: Scalars["String"];
}>;

export type LoadDirectMessagesThreadByIdQuery = { __typename?: "Query" } & {
  loadDirectMessagesThreadById: { __typename?: "Thread" } & Pick<
    Thread,
    "id" | "last_message"
  > & {
      invitees: Array<{ __typename?: "User" } & Pick<User, "id" | "username">>;
      messages?: Maybe<
        Array<
          Maybe<
            { __typename?: "Message" } & Pick<
              Message,
              "id" | "created_at" | "message"
            >
          >
        >
      >;
    };
};

export type LoginMutationVariables = Exact<{
  password: Scalars["String"];
  username: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "LoginResponse" } & Pick<
    LoginResponse,
    "accessToken"
  > & {
      errors?: Maybe<
        Array<
          { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
        >
      >;
      user?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "username">>;
    };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<
    { __typename?: "MeResponse" } & {
      errors?: Maybe<
        Array<
          { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
        >
      >;
      user?: Maybe<
        { __typename?: "User" } & Pick<User, "id" | "name" | "username">
      >;
    }
  >;
};

export type NewMessageSubSubscriptionVariables = Exact<{
  data: AddMessageToChannelInput;
}>;

export type NewMessageSubSubscription = { __typename?: "Subscription" } & {
  newMessageSub: { __typename?: "AddThreadPayload" } & Pick<
    AddThreadPayload,
    "success" | "created_at" | "channelId" | "threadId"
  > & {
      invitees?: Maybe<
        Array<Maybe<{ __typename?: "User" } & Pick<User, "id">>>
      >;
      message: { __typename?: "Message" } & Pick<Message, "id" | "message">;
    };
};

export const AddChannelMemberDocument = gql`
  mutation AddChannelMember($channelId: String!, $userId: String!) {
    addChannelMember(channelId: $channelId, userId: $userId)
  }
`;
export type AddChannelMemberMutationFn = Apollo.MutationFunction<
  AddChannelMemberMutation,
  AddChannelMemberMutationVariables
>;

/**
 * __useAddChannelMemberMutation__
 *
 * To run a mutation, you first call `useAddChannelMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddChannelMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addChannelMemberMutation, { data, loading, error }] = useAddChannelMemberMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddChannelMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddChannelMemberMutation,
    AddChannelMemberMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddChannelMemberMutation,
    AddChannelMemberMutationVariables
  >(AddChannelMemberDocument, options);
}
export type AddChannelMemberMutationHookResult = ReturnType<
  typeof useAddChannelMemberMutation
>;
export type AddChannelMemberMutationResult = Apollo.MutationResult<AddChannelMemberMutation>;
export type AddChannelMemberMutationOptions = Apollo.BaseMutationOptions<
  AddChannelMemberMutation,
  AddChannelMemberMutationVariables
>;
export const AddDirectMessageToThreadDocument = gql`
  mutation AddDirectMessageToThread($input: AddDirectMessageToThreadInput!) {
    addDirectMessageToThread(input: $input) {
      success
      threadId
      message {
        id
        created_at
        message
      }
      sentBy {
        id
        username
        profileImageUri
      }
    }
  }
`;
export type AddDirectMessageToThreadMutationFn = Apollo.MutationFunction<
  AddDirectMessageToThreadMutation,
  AddDirectMessageToThreadMutationVariables
>;

/**
 * __useAddDirectMessageToThreadMutation__
 *
 * To run a mutation, you first call `useAddDirectMessageToThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDirectMessageToThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDirectMessageToThreadMutation, { data, loading, error }] = useAddDirectMessageToThreadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddDirectMessageToThreadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddDirectMessageToThreadMutation,
    AddDirectMessageToThreadMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddDirectMessageToThreadMutation,
    AddDirectMessageToThreadMutationVariables
  >(AddDirectMessageToThreadDocument, options);
}
export type AddDirectMessageToThreadMutationHookResult = ReturnType<
  typeof useAddDirectMessageToThreadMutation
>;
export type AddDirectMessageToThreadMutationResult = Apollo.MutationResult<AddDirectMessageToThreadMutation>;
export type AddDirectMessageToThreadMutationOptions = Apollo.BaseMutationOptions<
  AddDirectMessageToThreadMutation,
  AddDirectMessageToThreadMutationVariables
>;
export const AddMessageToChannelDocument = gql`
  mutation AddMessageToChannel($data: AddMessageToChannelInput!) {
    addMessageToChannel(data: $data) {
      success
      channelId
      message {
        id
        message
      }
      user {
        id
        name
        username
      }
      invitees {
        id
        name
        username
      }
    }
  }
`;
export type AddMessageToChannelMutationFn = Apollo.MutationFunction<
  AddMessageToChannelMutation,
  AddMessageToChannelMutationVariables
>;

/**
 * __useAddMessageToChannelMutation__
 *
 * To run a mutation, you first call `useAddMessageToChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMessageToChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMessageToChannelMutation, { data, loading, error }] = useAddMessageToChannelMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddMessageToChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddMessageToChannelMutation,
    AddMessageToChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddMessageToChannelMutation,
    AddMessageToChannelMutationVariables
  >(AddMessageToChannelDocument, options);
}
export type AddMessageToChannelMutationHookResult = ReturnType<
  typeof useAddMessageToChannelMutation
>;
export type AddMessageToChannelMutationResult = Apollo.MutationResult<AddMessageToChannelMutation>;
export type AddMessageToChannelMutationOptions = Apollo.BaseMutationOptions<
  AddMessageToChannelMutation,
  AddMessageToChannelMutationVariables
>;
export const AddTeamMemberByIdDocument = gql`
  mutation AddTeamMemberById($data: AddTeamMemberByIdInput!) {
    addTeamMemberById(data: $data) {
      userToTeamId
      userId
      teamId
      teamRoleAuthorizations
    }
  }
`;
export type AddTeamMemberByIdMutationFn = Apollo.MutationFunction<
  AddTeamMemberByIdMutation,
  AddTeamMemberByIdMutationVariables
>;

/**
 * __useAddTeamMemberByIdMutation__
 *
 * To run a mutation, you first call `useAddTeamMemberByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTeamMemberByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTeamMemberByIdMutation, { data, loading, error }] = useAddTeamMemberByIdMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddTeamMemberByIdMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddTeamMemberByIdMutation,
    AddTeamMemberByIdMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddTeamMemberByIdMutation,
    AddTeamMemberByIdMutationVariables
  >(AddTeamMemberByIdDocument, options);
}
export type AddTeamMemberByIdMutationHookResult = ReturnType<
  typeof useAddTeamMemberByIdMutation
>;
export type AddTeamMemberByIdMutationResult = Apollo.MutationResult<AddTeamMemberByIdMutation>;
export type AddTeamMemberByIdMutationOptions = Apollo.BaseMutationOptions<
  AddTeamMemberByIdMutation,
  AddTeamMemberByIdMutationVariables
>;
export const AddThreadToChannelDocument = gql`
  mutation AddThreadToChannel($data: AddMessageToChannelInput!) {
    addThreadToChannel(data: $data) {
      success
      channelId
      created_at
      threadId
      invitees {
        id
        name
        username
        profileImageUri
      }
      message {
        id
        created_at
        message
      }
    }
  }
`;
export type AddThreadToChannelMutationFn = Apollo.MutationFunction<
  AddThreadToChannelMutation,
  AddThreadToChannelMutationVariables
>;

/**
 * __useAddThreadToChannelMutation__
 *
 * To run a mutation, you first call `useAddThreadToChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddThreadToChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addThreadToChannelMutation, { data, loading, error }] = useAddThreadToChannelMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddThreadToChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddThreadToChannelMutation,
    AddThreadToChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddThreadToChannelMutation,
    AddThreadToChannelMutationVariables
  >(AddThreadToChannelDocument, options);
}
export type AddThreadToChannelMutationHookResult = ReturnType<
  typeof useAddThreadToChannelMutation
>;
export type AddThreadToChannelMutationResult = Apollo.MutationResult<AddThreadToChannelMutation>;
export type AddThreadToChannelMutationOptions = Apollo.BaseMutationOptions<
  AddThreadToChannelMutation,
  AddThreadToChannelMutationVariables
>;
export const ChangePasswordFromTokenDocument = gql`
  mutation ChangePasswordFromToken($data: ChangePasswordInput!) {
    changePasswordFromToken(data: $data) {
      errors {
        field
        message
      }
      user {
        id
        name
        username
      }
    }
  }
`;
export type ChangePasswordFromTokenMutationFn = Apollo.MutationFunction<
  ChangePasswordFromTokenMutation,
  ChangePasswordFromTokenMutationVariables
>;

/**
 * __useChangePasswordFromTokenMutation__
 *
 * To run a mutation, you first call `useChangePasswordFromTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordFromTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordFromTokenMutation, { data, loading, error }] = useChangePasswordFromTokenMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordFromTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePasswordFromTokenMutation,
    ChangePasswordFromTokenMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangePasswordFromTokenMutation,
    ChangePasswordFromTokenMutationVariables
  >(ChangePasswordFromTokenDocument, options);
}
export type ChangePasswordFromTokenMutationHookResult = ReturnType<
  typeof useChangePasswordFromTokenMutation
>;
export type ChangePasswordFromTokenMutationResult = Apollo.MutationResult<ChangePasswordFromTokenMutation>;
export type ChangePasswordFromTokenMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordFromTokenMutation,
  ChangePasswordFromTokenMutationVariables
>;
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangePasswordFromContextUseridMutation,
    ChangePasswordFromContextUseridMutationVariables
  >(ChangePasswordFromContextUseridDocument, options);
}
export type ChangePasswordFromContextUseridMutationHookResult = ReturnType<
  typeof useChangePasswordFromContextUseridMutation
>;
export type ChangePasswordFromContextUseridMutationResult = Apollo.MutationResult<ChangePasswordFromContextUseridMutation>;
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(
    ConfirmUserDocument,
    options
  );
}
export type ConfirmUserMutationHookResult = ReturnType<
  typeof useConfirmUserMutation
>;
export type ConfirmUserMutationResult = Apollo.MutationResult<ConfirmUserMutation>;
export type ConfirmUserMutationOptions = Apollo.BaseMutationOptions<
  ConfirmUserMutation,
  ConfirmUserMutationVariables
>;
export const CreateChannelDocument = gql`
  mutation CreateChannel($input: AddChannelInput!) {
    createChannel(input: $input) {
      id
      name
      invitees {
        id
        username
      }
    }
  }
`;
export type CreateChannelMutationFn = Apollo.MutationFunction<
  CreateChannelMutation,
  CreateChannelMutationVariables
>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >(CreateChannelDocument, options);
}
export type CreateChannelMutationHookResult = ReturnType<
  typeof useCreateChannelMutation
>;
export type CreateChannelMutationResult = Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<
  CreateChannelMutation,
  CreateChannelMutationVariables
>;
export const CreateDirectMessageDocument = gql`
  mutation CreateDirectMessage($input: CreateDirectMessageInput!) {
    createDirectMessage(input: $input) {
      success
      threadId
      message {
        id
        message
        created_at
        sentBy {
          id
          username
        }
      }
      invitees {
        id
        username
      }
    }
  }
`;
export type CreateDirectMessageMutationFn = Apollo.MutationFunction<
  CreateDirectMessageMutation,
  CreateDirectMessageMutationVariables
>;

/**
 * __useCreateDirectMessageMutation__
 *
 * To run a mutation, you first call `useCreateDirectMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDirectMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDirectMessageMutation, { data, loading, error }] = useCreateDirectMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDirectMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDirectMessageMutation,
    CreateDirectMessageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDirectMessageMutation,
    CreateDirectMessageMutationVariables
  >(CreateDirectMessageDocument, options);
}
export type CreateDirectMessageMutationHookResult = ReturnType<
  typeof useCreateDirectMessageMutation
>;
export type CreateDirectMessageMutationResult = Apollo.MutationResult<CreateDirectMessageMutation>;
export type CreateDirectMessageMutationOptions = Apollo.BaseMutationOptions<
  CreateDirectMessageMutation,
  CreateDirectMessageMutationVariables
>;
export const CreateTeamDocument = gql`
  mutation CreateTeam($name: String!) {
    createTeam(name: $name) {
      errors {
        field
        message
      }
      uttData {
        name
        teamId
        userId
        userToTeamId
      }
    }
  }
`;
export type CreateTeamMutationFn = Apollo.MutationFunction<
  CreateTeamMutation,
  CreateTeamMutationVariables
>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTeamMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTeamMutation,
    CreateTeamMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(
    CreateTeamDocument,
    options
  );
}
export type CreateTeamMutationHookResult = ReturnType<
  typeof useCreateTeamMutation
>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<
  CreateTeamMutation,
  CreateTeamMutationVariables
>;
export const EditCurrentUserInfoDocument = gql`
  mutation EditCurrentUserInfo($data: EditUserInput!) {
    editCurrentUserInfo(data: $data) {
      errors {
        field
        message
      }
      userWithRoles {
        user {
          id
          firstName
          username
        }
        teamRoles
      }
    }
  }
`;
export type EditCurrentUserInfoMutationFn = Apollo.MutationFunction<
  EditCurrentUserInfoMutation,
  EditCurrentUserInfoMutationVariables
>;

/**
 * __useEditCurrentUserInfoMutation__
 *
 * To run a mutation, you first call `useEditCurrentUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCurrentUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCurrentUserInfoMutation, { data, loading, error }] = useEditCurrentUserInfoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditCurrentUserInfoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditCurrentUserInfoMutation,
    EditCurrentUserInfoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    EditCurrentUserInfoMutation,
    EditCurrentUserInfoMutationVariables
  >(EditCurrentUserInfoDocument, options);
}
export type EditCurrentUserInfoMutationHookResult = ReturnType<
  typeof useEditCurrentUserInfoMutation
>;
export type EditCurrentUserInfoMutationResult = Apollo.MutationResult<EditCurrentUserInfoMutation>;
export type EditCurrentUserInfoMutationOptions = Apollo.BaseMutationOptions<
  EditCurrentUserInfoMutation,
  EditCurrentUserInfoMutationVariables
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const InviteNewTeamMemberDocument = gql`
  mutation InviteNewTeamMember($data: InviteTeamMemberInput!) {
    inviteNewTeamMember(data: $data) {
      errors {
        field
        message
      }
      invitation {
        id
        email
        teamId
        status
      }
    }
  }
`;
export type InviteNewTeamMemberMutationFn = Apollo.MutationFunction<
  InviteNewTeamMemberMutation,
  InviteNewTeamMemberMutationVariables
>;

/**
 * __useInviteNewTeamMemberMutation__
 *
 * To run a mutation, you first call `useInviteNewTeamMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteNewTeamMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteNewTeamMemberMutation, { data, loading, error }] = useInviteNewTeamMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInviteNewTeamMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InviteNewTeamMemberMutation,
    InviteNewTeamMemberMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    InviteNewTeamMemberMutation,
    InviteNewTeamMemberMutationVariables
  >(InviteNewTeamMemberDocument, options);
}
export type InviteNewTeamMemberMutationHookResult = ReturnType<
  typeof useInviteNewTeamMemberMutation
>;
export type InviteNewTeamMemberMutationResult = Apollo.MutationResult<InviteNewTeamMemberMutation>;
export type InviteNewTeamMemberMutationOptions = Apollo.BaseMutationOptions<
  InviteNewTeamMemberMutation,
  InviteNewTeamMemberMutationVariables
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
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
      errors {
        field
        message
      }
      user {
        id
        name
        username
      }
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const SignS3FilesDocument = gql`
  mutation SignS3Files($files: [FileInput_v2!]!, $action: S3SignatureAction!) {
    signS3Files(files: $files, action: $action) {
      signatures {
        uri
        signedRequest
      }
    }
  }
`;
export type SignS3FilesMutationFn = Apollo.MutationFunction<
  SignS3FilesMutation,
  SignS3FilesMutationVariables
>;

/**
 * __useSignS3FilesMutation__
 *
 * To run a mutation, you first call `useSignS3FilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignS3FilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signS3FilesMutation, { data, loading, error }] = useSignS3FilesMutation({
 *   variables: {
 *      files: // value for 'files'
 *      action: // value for 'action'
 *   },
 * });
 */
export function useSignS3FilesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignS3FilesMutation,
    SignS3FilesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignS3FilesMutation, SignS3FilesMutationVariables>(
    SignS3FilesDocument,
    options
  );
}
export type SignS3FilesMutationHookResult = ReturnType<
  typeof useSignS3FilesMutation
>;
export type SignS3FilesMutationResult = Apollo.MutationResult<SignS3FilesMutation>;
export type SignS3FilesMutationOptions = Apollo.BaseMutationOptions<
  SignS3FilesMutation,
  SignS3FilesMutationVariables
>;
export const SignS3GetObjectDocument = gql`
  mutation SignS3GetObject(
    $files: [FileInput!]!
    $action: S3SignatureAction = getObject
  ) {
    signS3GetObject(files: $files, action: $action) {
      signatures {
        uri
        signedRequest
      }
    }
  }
`;
export type SignS3GetObjectMutationFn = Apollo.MutationFunction<
  SignS3GetObjectMutation,
  SignS3GetObjectMutationVariables
>;

/**
 * __useSignS3GetObjectMutation__
 *
 * To run a mutation, you first call `useSignS3GetObjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignS3GetObjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signS3GetObjectMutation, { data, loading, error }] = useSignS3GetObjectMutation({
 *   variables: {
 *      files: // value for 'files'
 *      action: // value for 'action'
 *   },
 * });
 */
export function useSignS3GetObjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignS3GetObjectMutation,
    SignS3GetObjectMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SignS3GetObjectMutation,
    SignS3GetObjectMutationVariables
  >(SignS3GetObjectDocument, options);
}
export type SignS3GetObjectMutationHookResult = ReturnType<
  typeof useSignS3GetObjectMutation
>;
export type SignS3GetObjectMutationResult = Apollo.MutationResult<SignS3GetObjectMutation>;
export type SignS3GetObjectMutationOptions = Apollo.BaseMutationOptions<
  SignS3GetObjectMutation,
  SignS3GetObjectMutationVariables
>;
export const SignS3Document = gql`
  mutation SignS3($files: [ImageSubInput!]!, $action: S3SignatureAction!) {
    signS3(files: $files, action: $action) {
      signatures {
        uri
        signedRequest
      }
    }
  }
`;
export type SignS3MutationFn = Apollo.MutationFunction<
  SignS3Mutation,
  SignS3MutationVariables
>;

/**
 * __useSignS3Mutation__
 *
 * To run a mutation, you first call `useSignS3Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignS3Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signS3Mutation, { data, loading, error }] = useSignS3Mutation({
 *   variables: {
 *      files: // value for 'files'
 *      action: // value for 'action'
 *   },
 * });
 */
export function useSignS3Mutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignS3Mutation,
    SignS3MutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignS3Mutation, SignS3MutationVariables>(
    SignS3Document,
    options
  );
}
export type SignS3MutationHookResult = ReturnType<typeof useSignS3Mutation>;
export type SignS3MutationResult = Apollo.MutationResult<SignS3Mutation>;
export type SignS3MutationOptions = Apollo.BaseMutationOptions<
  SignS3Mutation,
  SignS3MutationVariables
>;
export const GetAllChannelThreadsDocument = gql`
  query GetAllChannelThreads($channelId: String!, $teamId: String!) {
    getAllChannelThreads(teamId: $teamId, channelId: $channelId) {
      id
      created_at
      invitees {
        id
        username
        name
        profileImageUri
      }
      last_message
      messages {
        id
        message
        created_at
      }
    }
  }
`;

/**
 * __useGetAllChannelThreadsQuery__
 *
 * To run a query within a React component, call `useGetAllChannelThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllChannelThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllChannelThreadsQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetAllChannelThreadsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllChannelThreadsQuery,
    GetAllChannelThreadsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAllChannelThreadsQuery,
    GetAllChannelThreadsQueryVariables
  >(GetAllChannelThreadsDocument, options);
}
export function useGetAllChannelThreadsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllChannelThreadsQuery,
    GetAllChannelThreadsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllChannelThreadsQuery,
    GetAllChannelThreadsQueryVariables
  >(GetAllChannelThreadsDocument, options);
}
export type GetAllChannelThreadsQueryHookResult = ReturnType<
  typeof useGetAllChannelThreadsQuery
>;
export type GetAllChannelThreadsLazyQueryHookResult = ReturnType<
  typeof useGetAllChannelThreadsLazyQuery
>;
export type GetAllChannelThreadsQueryResult = Apollo.QueryResult<
  GetAllChannelThreadsQuery,
  GetAllChannelThreadsQueryVariables
>;
export const GetAllMyMessagesDocument = gql`
  query GetAllMyMessages {
    getAllMyMessages {
      id
      username
      profileImageUri
      mappedMessages {
        id
        created_at
        message
        images {
          id
          uri
        }
        files {
          id
          uri
          file_type
        }
      }
    }
  }
`;

/**
 * __useGetAllMyMessagesQuery__
 *
 * To run a query within a React component, call `useGetAllMyMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMyMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMyMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllMyMessagesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllMyMessagesQuery,
    GetAllMyMessagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables>(
    GetAllMyMessagesDocument,
    options
  );
}
export function useGetAllMyMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllMyMessagesQuery,
    GetAllMyMessagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllMyMessagesQuery,
    GetAllMyMessagesQueryVariables
  >(GetAllMyMessagesDocument, options);
}
export type GetAllMyMessagesQueryHookResult = ReturnType<
  typeof useGetAllMyMessagesQuery
>;
export type GetAllMyMessagesLazyQueryHookResult = ReturnType<
  typeof useGetAllMyMessagesLazyQuery
>;
export type GetAllMyMessagesQueryResult = Apollo.QueryResult<
  GetAllMyMessagesQuery,
  GetAllMyMessagesQueryVariables
>;
export const GetAllTeamMembersDocument = gql`
  query GetAllTeamMembers($teamId: String!) {
    getAllTeamMembers(teamId: $teamId) {
      user {
        id
        name
        username
        profileImageUri
      }
      teamRoleAuthorizations
    }
  }
`;

/**
 * __useGetAllTeamMembersQuery__
 *
 * To run a query within a React component, call `useGetAllTeamMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTeamMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTeamMembersQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetAllTeamMembersQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllTeamMembersQuery,
    GetAllTeamMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAllTeamMembersQuery,
    GetAllTeamMembersQueryVariables
  >(GetAllTeamMembersDocument, options);
}
export function useGetAllTeamMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllTeamMembersQuery,
    GetAllTeamMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllTeamMembersQuery,
    GetAllTeamMembersQueryVariables
  >(GetAllTeamMembersDocument, options);
}
export type GetAllTeamMembersQueryHookResult = ReturnType<
  typeof useGetAllTeamMembersQuery
>;
export type GetAllTeamMembersLazyQueryHookResult = ReturnType<
  typeof useGetAllTeamMembersLazyQuery
>;
export type GetAllTeamMembersQueryResult = Apollo.QueryResult<
  GetAllTeamMembersQuery,
  GetAllTeamMembersQueryVariables
>;
export const GetAllTeamsForUserDocument = gql`
  query GetAllTeamsForUser {
    getAllTeamsForUser {
      userToTeamId
      userId
      teamId
      team {
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAllTeamsForUserQuery,
    GetAllTeamsForUserQueryVariables
  >(GetAllTeamsForUserDocument, options);
}
export function useGetAllTeamsForUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllTeamsForUserQuery,
    GetAllTeamsForUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllTeamsForUserQuery,
    GetAllTeamsForUserQueryVariables
  >(GetAllTeamsForUserDocument, options);
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
export const LoadChannelsByTeamIdDocument = gql`
  query LoadChannelsByTeamId($teamId: String!) {
    loadChannelsByTeamId(teamId: $teamId) {
      id
      name
      invitees {
        id
        username
        profileImageUri
      }
    }
  }
`;

/**
 * __useLoadChannelsByTeamIdQuery__
 *
 * To run a query within a React component, call `useLoadChannelsByTeamIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadChannelsByTeamIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadChannelsByTeamIdQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useLoadChannelsByTeamIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    LoadChannelsByTeamIdQuery,
    LoadChannelsByTeamIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    LoadChannelsByTeamIdQuery,
    LoadChannelsByTeamIdQueryVariables
  >(LoadChannelsByTeamIdDocument, options);
}
export function useLoadChannelsByTeamIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LoadChannelsByTeamIdQuery,
    LoadChannelsByTeamIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    LoadChannelsByTeamIdQuery,
    LoadChannelsByTeamIdQueryVariables
  >(LoadChannelsByTeamIdDocument, options);
}
export type LoadChannelsByTeamIdQueryHookResult = ReturnType<
  typeof useLoadChannelsByTeamIdQuery
>;
export type LoadChannelsByTeamIdLazyQueryHookResult = ReturnType<
  typeof useLoadChannelsByTeamIdLazyQuery
>;
export type LoadChannelsByTeamIdQueryResult = Apollo.QueryResult<
  LoadChannelsByTeamIdQuery,
  LoadChannelsByTeamIdQueryVariables
>;
export const LoadDirectMessageThreadsByTeamAndUserDocument = gql`
  query LoadDirectMessageThreadsByTeamAndUser($teamId: String!) {
    loadDirectMessageThreadsByTeamAndUser(teamId: $teamId) {
      id
      last_message
      invitees {
        id
        username
      }
    }
  }
`;

/**
 * __useLoadDirectMessageThreadsByTeamAndUserQuery__
 *
 * To run a query within a React component, call `useLoadDirectMessageThreadsByTeamAndUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadDirectMessageThreadsByTeamAndUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadDirectMessageThreadsByTeamAndUserQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useLoadDirectMessageThreadsByTeamAndUserQuery(
  baseOptions: Apollo.QueryHookOptions<
    LoadDirectMessageThreadsByTeamAndUserQuery,
    LoadDirectMessageThreadsByTeamAndUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    LoadDirectMessageThreadsByTeamAndUserQuery,
    LoadDirectMessageThreadsByTeamAndUserQueryVariables
  >(LoadDirectMessageThreadsByTeamAndUserDocument, options);
}
export function useLoadDirectMessageThreadsByTeamAndUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LoadDirectMessageThreadsByTeamAndUserQuery,
    LoadDirectMessageThreadsByTeamAndUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    LoadDirectMessageThreadsByTeamAndUserQuery,
    LoadDirectMessageThreadsByTeamAndUserQueryVariables
  >(LoadDirectMessageThreadsByTeamAndUserDocument, options);
}
export type LoadDirectMessageThreadsByTeamAndUserQueryHookResult = ReturnType<
  typeof useLoadDirectMessageThreadsByTeamAndUserQuery
>;
export type LoadDirectMessageThreadsByTeamAndUserLazyQueryHookResult = ReturnType<
  typeof useLoadDirectMessageThreadsByTeamAndUserLazyQuery
>;
export type LoadDirectMessageThreadsByTeamAndUserQueryResult = Apollo.QueryResult<
  LoadDirectMessageThreadsByTeamAndUserQuery,
  LoadDirectMessageThreadsByTeamAndUserQueryVariables
>;
export const LoadDirectMessagesThreadByIdDocument = gql`
  query LoadDirectMessagesThreadById($teamId: String!, $threadId: String!) {
    loadDirectMessagesThreadById(teamId: $teamId, threadId: $threadId) {
      id
      last_message
      invitees {
        id
        username
      }
      messages {
        id
        created_at
        message
      }
    }
  }
`;

/**
 * __useLoadDirectMessagesThreadByIdQuery__
 *
 * To run a query within a React component, call `useLoadDirectMessagesThreadByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadDirectMessagesThreadByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadDirectMessagesThreadByIdQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useLoadDirectMessagesThreadByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    LoadDirectMessagesThreadByIdQuery,
    LoadDirectMessagesThreadByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    LoadDirectMessagesThreadByIdQuery,
    LoadDirectMessagesThreadByIdQueryVariables
  >(LoadDirectMessagesThreadByIdDocument, options);
}
export function useLoadDirectMessagesThreadByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LoadDirectMessagesThreadByIdQuery,
    LoadDirectMessagesThreadByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    LoadDirectMessagesThreadByIdQuery,
    LoadDirectMessagesThreadByIdQueryVariables
  >(LoadDirectMessagesThreadByIdDocument, options);
}
export type LoadDirectMessagesThreadByIdQueryHookResult = ReturnType<
  typeof useLoadDirectMessagesThreadByIdQuery
>;
export type LoadDirectMessagesThreadByIdLazyQueryHookResult = ReturnType<
  typeof useLoadDirectMessagesThreadByIdLazyQuery
>;
export type LoadDirectMessagesThreadByIdQueryResult = Apollo.QueryResult<
  LoadDirectMessagesThreadByIdQuery,
  LoadDirectMessagesThreadByIdQueryVariables
>;
export const LoginDocument = gql`
  mutation Login($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      errors {
        field
        message
      }
      user {
        id
        username
      }
      accessToken
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
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
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
      errors {
        field
        message
      }
      user {
        id
        name
        username
      }
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const NewMessageSubDocument = gql`
  subscription NewMessageSub($data: AddMessageToChannelInput!) {
    newMessageSub(data: $data) {
      success
      created_at
      channelId
      invitees {
        id
      }
      threadId
      message {
        id
        message
      }
    }
  }
`;

/**
 * __useNewMessageSubSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubSubscription({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useNewMessageSubSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    NewMessageSubSubscription,
    NewMessageSubSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    NewMessageSubSubscription,
    NewMessageSubSubscriptionVariables
  >(NewMessageSubDocument, options);
}
export type NewMessageSubSubscriptionHookResult = ReturnType<
  typeof useNewMessageSubSubscription
>;
export type NewMessageSubSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubSubscription>;
