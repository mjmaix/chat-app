interface FormModel {
  [k: string]: string;
}

export const ProfileModel: FormModel = {
  email: '',
  familyName: '',
  givenName: '',
  phoneNumber: '',
  picture: '',
};

export const EmailModel: FormModel = {
  email: '',
};

export const ChallengeModel: FormModel = {
  email: '',
  code: '',
};

export const PasswordResetModel: FormModel = {
  email: '',
  password: '',
  code: '',
};

export const PasswordRequiredModel: FormModel = {
  password: '',
};

export const PasswordChangeModel: FormModel = {
  ...PasswordRequiredModel,
  oldPassword: '',
};

export const SignUpModel: FormModel = {
  ...ProfileModel,
  ...PasswordRequiredModel,
};

export const SignInModel: FormModel = {
  ...EmailModel,
  ...PasswordRequiredModel,
};
