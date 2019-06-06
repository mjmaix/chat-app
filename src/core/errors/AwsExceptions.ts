export interface AwsException {
  code: string;
  name: string;
  message?: string;
  safeMessage: string;
  mappedSafeMessages?: { [key: string]: boolean | string };
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
  mappedSafeMessages: {
    'Cannot reset password for the user as there is no registered/verified email or phone_number': true,
    'Attribute value for picture must not be null': true,
  },
  knownMessages: [
    'Attribute value for picture must not be null',
    'Cannot reset password for the user as there is no registered/verified email or phone_number',
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

const UsernameExistsException: AwsException = {
  code: 'UsernameExistsException',
  name: 'Username Exists Exception',
  safeMessage: 'An account with the given email already exists.',
  knownMessages: ['An account with the given email already exists.'],
};

const CodeMismatchException: AwsException = {
  code: 'CodeMismatchException',
  message: 'Invalid verification code provided, please try again.',
  name: 'Code Mismatc hException',
  safeMessage: 'Invalid verification code provided, please try again.',
  knownMessages: ['Invalid verification code provided, please try again.'],
};

export const AwsExceptions: { [k: string]: AwsException } = {
  CodeMismatchException,
  UsernameExistsException,
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
