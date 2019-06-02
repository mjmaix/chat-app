type Nullable<T> = T | null;
declare module '*.jpg';

/**
 * AWS Cognito
 */
type Contact = 'email' | 'phone_number';
interface VerifiedContact {
  verified: { [key in Contact]?: string };
  unverified: { [key in Contact]?: string };
}
interface CurrentUserAttributes {
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

interface S3Object {
  key: string;
}
/**
 * AWS Storage
 */
interface StorageConfig {
  level: 'private' | 'protected' | 'public';
  contentType: string;
  progressCallback: (param: { loaded: number; total: number }) => void;
}
