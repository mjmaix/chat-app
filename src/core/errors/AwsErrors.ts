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
export const InvalidParameterException = {
  code: 'InvalidParameterException',
  name: 'Invalid Parameter Exception',
};
