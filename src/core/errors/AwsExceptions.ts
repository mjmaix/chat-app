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
}

const NetworkingError: AwsException = {
  code: 'NetworkingError',
  name: 'Network Error',
  safeMessage: 'Cannot access internet.',
};

// Change password - wrong password
const InvalidParameterException: AwsException = {
  code: 'InvalidParameterException',
  name: 'Invalid Parameter Exception',
  safeMessage:
    'Use 8 or more characters with a mix of letters, numbers & symbols.',
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

export const AwsExceptions: { [k: string]: AwsException } = {
  NetworkingError,
  InvalidParameterException,
  UserNotFoundException,
  NotAuthorizedException,
  LimitExceededException,
};
