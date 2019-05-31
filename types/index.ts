type Nullable<T> = T | null;
type Contact = 'email' | 'phone_number';
interface VerifiedContact {
  verified: { [key in Contact]?: string };
  unverified: { [key in Contact]?: string };
}
declare module '*.jpg';
