import _ from 'lodash';

import { logError, logInfo } from '../reports';
import { AwsException, AwsExceptions } from './AwsExceptions';

/* tslint:disable:max-classes-per-file */

const pickSafeMessage = (listedException: AwsException, rawMessage: string) => {
  let pickedMessage = listedException.safeMessage;

  // NOTE: specific message?
  const mappedMsgs = listedException.mappedSafeMessages;
  if (mappedMsgs && mappedMsgs[rawMessage]) {
    if (_.isBoolean(mappedMsgs[rawMessage])) {
      pickedMessage = rawMessage; // NOTE: key is allowed if boolean
    } else {
      pickedMessage = mappedMsgs[rawMessage] as string; // NOTE: otherwise get the value as message
    }
  }

  return pickedMessage;
};

export class SafeException extends Error {
  public code?: string;
  public constructor(error: AwsException, rawMessage: string) {
    super();
    this.code = error.code;
    this.message = pickSafeMessage(AwsExceptions[this.code], rawMessage);
  }
}
export class UncaughtException extends Error {}

export const WrapKnownExceptions = (rawError: any) => {
  logInfo('[EXCEPTION] before wrap', rawError);
  if (rawError.code) {
    const code: string = rawError.code;
    const registeredError: AwsException = AwsExceptions[code];
    if (registeredError) {
      throw new SafeException(
        registeredError,
        rawError.message || rawError.code || rawError,
      );
    }
  }
  logError('[EXCEPTION] uncaught', typeof rawError, rawError);
  throw new UncaughtException(rawError.message || rawError.code || rawError);
};
