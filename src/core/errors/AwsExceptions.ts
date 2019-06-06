export interface AwsException {
  code: string;
  name: string;
  message?: string;
  safeMessage: string;
  region?: string;
  hostname?: string;
  retryable?: boolean;
  time?: Date;
  stack?: string;
  knownMessages?: string[]; // logging existing message
}

const NetworkingError: AwsException = {
  code: 'NetworkingError',
  name: 'Network Error',
  safeMessage:
    'Cannot to complete request. Failed to connect to network/internet.',
};

const NetworkError: AwsException = {
  code: 'NetworkError',
  name: 'Network Error',
  safeMessage:
    'Cannot to complete request. Failed to connect to network/internet.',
};

// Change password - wrong password
const InvalidParameterException: AwsException = {
  code: 'InvalidParameterException',
  name: 'Invalid Parameter Exception',
  safeMessage:
    'Use 8 or more characters with a mix of letters, numbers & symbols.',
  knownMessages: [
    'Invalid attributes given, given_name is missing',
    'User has not set up software token mfa',
    "2 validation errors detected: Value 'Aaaa' at 'userCode' failed to satisfy constraint: Member must satisfy regular expression pattern: [0-9]+; Value 'Aaaa' at 'userCode' failed to satisfy constraint: Member must have length greater than or equal to 6",
  ],
};

// Forgot password
const UserNotFoundException: AwsException = {
  code: 'UserNotFoundException',
  name: 'User Not Found Exception',
  safeMessage: 'Incorrect username or password.',
};

const NotAuthorizedException: AwsException = {
  code: 'NotAuthorizedException',
  name: 'Not Authorized Exception',
  safeMessage: 'Incorrect username or password.',
};

const LimitExceededException: AwsException = {
  code: 'LimitExceededException',
  name: 'Limit Exceeded Exception',
  safeMessage: 'Attempt limit exceeded, please try after some time.',
};

const PasswordResetRequiredException: AwsException = {
  code: 'PasswordResetRequiredException',
  name: 'Password Reset Required Exception',
  safeMessage: 'You must reset your password.',
};

const UserNotConfirmedException: AwsException = {
  code: 'UserNotConfirmedException',
  name: 'User Not Confirmed Exception',
  safeMessage: 'You must confirm your account to complete registration.',
};

const ExpiredCodeException: AwsException = {
  code: 'ExpiredCodeException',
  safeMessage: 'Invalid code provided, please request a code again.',
  knownMessages: ['Invalid code provided, please request a code again.'],
  name: 'Expired Code Exception',
};

const EnableSoftwareTokenMFAException: AwsException = {
  code: 'EnableSoftwareTokenMFAException',
  knownMessages: ['Code mismatch and fail enable Software Token MFA'],
  name: 'Enable Software Token MFA Exception',
  safeMessage: 'Code mismatch and fail enable Software Token MFA',
};

export const AwsExceptions: { [k: string]: AwsException } = {
  EnableSoftwareTokenMFAException,
  ExpiredCodeException,
  NetworkingError,
  NetworkError,
  InvalidParameterException,
  UserNotFoundException,
  NotAuthorizedException,
  LimitExceededException,
  PasswordResetRequiredException,
  UserNotConfirmedException,
};
