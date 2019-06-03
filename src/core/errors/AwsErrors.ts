interface AwsError {
  code: string;
  message?: string;
  name: string;
}

export const AwsNetworkError: AwsError = {
  code: 'NetworkError',
  message: 'Network error',
  name: 'Network Error',
};

// Change password - wrong password
export const InvalidParameterException: AwsError = {
  code: 'InvalidParameterException',
  name: 'Invalid Parameter Exception',
};

// Forgot password
export const UserNotFoundException: AwsError = {
  code: 'UserNotFoundException',
  name: 'User Not Found Exception',
};
