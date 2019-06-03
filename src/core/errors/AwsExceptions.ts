export interface AwsException {
  code: string;
  name: string;
  message?: string;
  safeMessage: string;
}

const NetworkError: AwsException = {
  code: 'NetworkError',
  name: 'Network Error',
  safeMessage: 'Network Error',
};

// Change password - wrong password
const InvalidParameterException: AwsException = {
  code: 'InvalidParameterException',
  name: 'Invalid Parameter Exception',
  safeMessage:
    'Use 8 or more characters with a mix of letters, numbers & symbols',
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
  NetworkError,
  InvalidParameterException,
  UserNotFoundException,
  NotAuthorizedException,
  LimitExceededException,
};
