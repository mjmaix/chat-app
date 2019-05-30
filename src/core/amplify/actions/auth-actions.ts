import { Auth } from 'aws-amplify';

export interface ProfileModel {
  email: string;
  familyName: string;
  givenName: string;
  phoneNumber: string;
  picture?: string;
}

export interface EmailOnlyModel {
  email: string;
}

export const ChallengeModel = {
  email: '',
  code: '',
};

export interface PasswordResetModel {
  email: string;
  password: string;
  code: string;
}

export interface PasswordChangeModel extends PasswordRequiredModel {
  oldPassword: string;
}

export interface PasswordRequiredModel {
  password: string;
}

export const handleSignUp = async (
  data: ProfileModel & PasswordRequiredModel,
) => {
  const { password, ...attrs } = data;
  return Auth.signUp({
    username: attrs.email,
    password,
    attributes: {
      email: attrs.email,
      family_name: attrs.familyName,
      given_name: attrs.givenName,
      phone_number: attrs.phoneNumber,
    },
  });
};

export const handleResend = async (data: EmailOnlyModel) => {
  return Auth.resendSignUp(data.email);
};

export const handleConfirmSignUp = async (data: ChallengeModel) => {
  return Auth.confirmSignUp(data.email, data.code);
};

export const handleForgotPassword = async (data: EmailOnlyModel) => {
  return Auth.forgotPassword(data.email);
};

export const handleForgotPasswordSubmit = async (data: PasswordResetModel) => {
  return Auth.forgotPasswordSubmit(data.email, data.code, data.password);
};

export const handleChangePasswordSubmit = async (data: PasswordChangeModel) => {
  const currentUser = await Auth.currentAuthenticatedUser();
  return Auth.forgotPasswordSubmit(
    currentUser,
    data.oldPassword,
    data.password,
  );
};

export const handleCompleteNewPassword = async (
  data: PasswordRequiredModel,
) => {
  const currentUser = await Auth.currentAuthenticatedUser();
  const userAttrs = await Auth.userAttributes(currentUser);
  console.log('handleCompleteNewPassword', userAttrs);
  // const requiredAttributes: ProfileModel = {
  //   email: userAttrs.email,
  //   phoneNumber: userAttrs.phoneNumber,
  //   givenName: userAttrs.givenName,
  //   familyName: userAttrs.familyName,
  // };
  // return Auth.completeNewPassword(
  //   currentUser,
  //   data.password,
  //   requiredAttributes,
  // );
};
