export const ProfileModel = {
  email: '',
  familyName: '',
  givenName: '',
  phoneNumber: '',
  picture: '',
};

export const EmailModel = {
  email: '',
};

export const ChallengeModel = {
  email: '',
  code: '',
};

export const PasswordResetModel = {
  email: '',
  password: '',
  code: '',
};

export const PasswordRequiredModel = {
  password: '',
};

export const PasswordChangeModel = {
  ...PasswordRequiredModel,
  oldPassword: '',
};

export const SignUpModel = {
  ...ProfileModel,
  ...PasswordRequiredModel,
};

export const SignInModel = {
  ...EmailModel,
  ...PasswordRequiredModel,
};
