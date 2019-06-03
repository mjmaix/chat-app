import { logError } from '../reports';
import { AwsException, AwsExceptions } from './AwsExceptions';

/* tslint:disable:max-classes-per-file */

export class SafeException extends Error {
  public code?: string;
  public consturctor(error: AwsException) {
    this.message = error.safeMessage;
    this.code = error.code;
  }
}
export class UncaughtException extends Error {}

export const WrapKnownExceptions = (rawError: any) => {
  if (rawError.code) {
    const code: string = rawError.code;
    const registeredError: AwsException = AwsExceptions[code];
    if (registeredError) {
      throw new SafeException(registeredError.safeMessage);
    }
  }
  logError(rawError);
  throw new UncaughtException(rawError.message || rawError.code || rawError);
};
