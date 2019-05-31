type Nullable<T> = T | null;
declare module '*.jpg';

/**
 * Cognito
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
