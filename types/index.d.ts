import { CognitoUser } from '@aws-amplify/auth';

import {
  CreateClConvoMutation,
  GetClConversationQuery,
  GetClUserQuery,
  GetClUserWithConvosQuery,
  ListClConversationsQuery,
  OnCreateClUserSubscription,
  UpdateClMessageMutation,
} from '../src/API';

declare module '*.jpg';
declare global {
  type Nullable<T> = T | null;

  /**
   * AWS Cognito
   */
  type Contact = 'email' | 'phone_number';

  interface VerifiedContact {
    verified: { [key in Contact]?: string };
    unverified: { [key in Contact]?: string };
  }

  interface ChatUserAttributes {
    email: string;
    email_verified: boolean;
    phone_number: string;
    phone_number_verified: false;
    sub: string;
    family_name: string;
    given_name: string;
    picture?: string;
    address?: string;
    birthdate?: string;
    gender?: string;
    locale?: string;
    middle_name?: string;
    name?: string;
    nickname?: string;
    preferred_username: string;
    profile?: string;
    timezone?: string;
    updated_at?: string;
    website?: string;
  }

  type MfaMethod = 'TOTP' | 'SMS' | 'NOMFA';
  type MfaChallengeType = 'SOFTWARE_TOKEN_MFA' | 'SMS_MFA' | 'NOMFA';
  type MfaOption = 'TOTP' | 'SMS' | 'NOMFA';
  type MfaSignIn = 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA';

  type ChallengeName =
    | MfaOption
    | MfaMethod
    | 'CUSTOM_CHALLENGE'
    | 'NEW_PASSWORD_REQUIRED'
    | 'MFA_SETUP';

  type ChatCognitoRequiredAttributes =
    | 'email'
    | 'phone_number'
    | 'family_name'
    | 'given_name';

  type ChatChallengeUserAttributes = {
    [key in ChatCognitoRequiredAttributes]?: any
  };

  interface ChallengeParam {
    requiredAttributes: ChatCognitoRequiredAttributes[];
    userAttributes: ChatChallengeUserAttributes;
    FRIENDLY_DEVICE_NAME?: string;
  }

  interface ChatCognitoUser extends CognitoUser {
    attributes: ChatUserAttributes;
    challengeName: ChallengeName;
    challengeParam: ChallengeParam;
  }

  interface S3Object {
    key: string;
  }

  /**
   * AWS Storage
   */
  interface StorageConfig {
    level: 'private' | 'protected' | 'public';
    contentType?: string;
    progressCallback?: (param: { loaded: number; total: number }) => void;
    identityId?: string;
    track?: boolean;
  }

  /**
   * AppSync
   */

  type ClUserWithConvos = ModelFromGetQuery<
    GetClUserWithConvosQuery,
    'getClUser'
  >;

  type ClUser = ModelFromGetQuery<GetClUserQuery, 'getClUser'>;

  type ClMessage =
    | ModelFromGetQuery<UpdateClMessageMutation, 'updateClMessage'>
    | ConvoClMessage;

  type ClConversation =
    | ModelFromGetQuery<GetClConversationQuery, 'getClConversation'>
    | ModelFromGetQuery<CreateClConvoMutation, 'createClConvo'>;

  type ClConvoLinkConnection = ModelConnectionFromGetQuery<
    OnCreateClUserSubscription,
    'onCreateClUser',
    'convoLinks'
  >;

  type ClMessageConnection = ModelConnectionFromGetQuery<
    GetClConversationQuery,
    'getClConversation',
    'messages'
  >;

  type ClCoversationConnection = ModelConnectionFromGetQuery<
    GetClUserWithConvosQuery,
    'getClUser',
    'convoLinks'
  >;

  type ConvoClMessageConnection = NonNullable<
    Exclude<ClConversation['messages'], [null]>
  >;

  type ConvoClMessage = NonNullable<
    Exclude<NonNullable<ConvoClMessageConnection['items']>, [null]>[0]
  >;
}
