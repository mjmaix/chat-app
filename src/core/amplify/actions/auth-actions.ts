import {
  ProfileModel,
  PasswordRequiredModel,
  SignUpModel,
  EmailModel,
  ChallengeModel,
  PasswordResetModel,
  PasswordChangeModel,
  SignInModel,
} from './../models';
import { Auth } from 'aws-amplify';

type SignUpModel = typeof ProfileModel & typeof PasswordRequiredModel;
export const handleSignUp = async (data: typeof SignUpModel) => {
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

export const handleSignIn = async (data: typeof SignInModel) => {
  const { email, password } = data;
  return Auth.signIn({ username: email, password });
};

export const handleSignOut = async (global = false) => {
  return Auth.signOut({ global });
};

export const handleResend = async (data: typeof EmailModel) => {
  return Auth.resendSignUp(data.email);
};

export const handleConfirmSignUp = async (data: typeof ChallengeModel) => {
  return Auth.confirmSignUp(data.email, data.code);
};

export const handleForgotPassword = async (data: typeof EmailModel) => {
  return Auth.forgotPassword(data.email);
};

export const handleForgotPasswordSubmit = async (
  data: typeof PasswordResetModel,
) => {
  await Auth.forgotPasswordSubmit(data.email, data.code, data.password);
  return handleSignOut(true);
};

export const handleChangePasswordSubmit = async (
  data: typeof PasswordChangeModel,
) => {
  const currentUser = await Auth.currentAuthenticatedUser();
  return Auth.forgotPasswordSubmit(
    currentUser,
    data.oldPassword,
    data.password,
  );
};

export const handleCompleteNewPassword = async (
  data: typeof PasswordRequiredModel,
) => {
  const currentUser = await Auth.currentAuthenticatedUser();
  const userAttrs = await Auth.userAttributes(currentUser);
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
