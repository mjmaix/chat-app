import { alertFail } from '../../utils';
import { logError, logInfo } from '../reports';
import { AwsException, AwsExceptions } from './AwsExceptions';

/* tslint:disable:max-classes-per-file */

export class SafeException extends Error {
  public code?: string;
  public constructor(error: AwsException) {
    super();
    this.message = error.safeMessage;
    this.code = error.code;
  }
}
export class UncaughtException extends Error {}

export const WrapKnownExceptions = (rawError: any) => {
  logInfo('[EXCEPTION] before wrap', rawError);
  if (rawError.code) {
    const code: string = rawError.code;
    const registeredError: AwsException = AwsExceptions[code];
    if (registeredError) {
      throw new SafeException(registeredError);
    }
  }
  logError('[EXCEPTION] uncaught', typeof rawError, rawError);
  throw new UncaughtException(rawError.message || rawError.code || rawError);
};
