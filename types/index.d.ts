import { CognitoUser } from '@aws-amplify/auth';

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

  interface ChatCurrentUserAttributes {
    email: string;
    email_verified: boolean;
    phone_number: string;
    phone_number_verified: false;
    sub: string;
    family_name?: string;
    given_name?: string;
    picture?: string;
    address?: string;
    birthdate?: string;
    gender?: string;
    locale?: string;
    middle_name?: string;
    name?: string;
    nickname?: string;
    preferred_username?: string;
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
    contentType: string;
    progressCallback?: (param: { loaded: number; total: number }) => void;
  }
}
