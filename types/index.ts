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
  family_name: string;
  given_name: string;
  phone_number: string;
  phone_number_verified: false;
  sub: string;
}

/**
 * AWS Storage
 */
interface StorageConfig {
  level: 'private' | 'protected' | 'public';
  contentType: string;
  progressCallback: (param: { loaded: number; total: number }) => void;
}
