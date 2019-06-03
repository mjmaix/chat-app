import { CognitoUser } from '@aws-amplify/auth';
import { CurrentUserOpts } from '@aws-amplify/auth/lib/types';
import { Auth } from 'aws-amplify';

import { WrapKnownExceptions } from '../../errors/ExceptionHandler';
import {
  ChallengeModel,
  EmailModel,
  PasswordChangeModel,
  PasswordRequiredModel,
  PasswordResetModel,
  ProfileModel,
  SignInModel,
  SignUpModel,
} from './../models';

type SignUpModel = typeof ProfileModel & typeof PasswordRequiredModel;

const getUserAttrs = (
  user: CognitoUser & { attributes: CurrentUserAttributes },
) => {
  return {
    email: user.attributes.email,
    familyName: user.attributes.family_name,
    givenName: user.attributes.given_name,
    phoneNumber: user.attributes.phone_number,
    picture: user.attributes.picture,
  } as typeof ProfileModel;
};

export const handleGetCurrentUserAttrs = async (opts: CurrentUserOpts) => {
  const currentUser = await Auth.currentAuthenticatedUser(opts).catch(
    WrapKnownExceptions,
  );
  const attrs = getUserAttrs(currentUser);
  return attrs;
};

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
  }).catch(WrapKnownExceptions);
};

export const handleSignIn = async (data: typeof SignInModel) => {
  const { email, password } = data;
  return Auth.signIn({ username: email, password }).catch(WrapKnownExceptions);
};

export const handleSignOut = async (global = false) => {
  return Auth.signOut({ global }).catch(WrapKnownExceptions);
};

export const handleUpdateProfile = async (data: typeof ProfileModel) => {
  const { email, familyName, givenName, phoneNumber, picture } = data;
  const user = await Auth.currentAuthenticatedUser().catch(WrapKnownExceptions);

  return Auth.updateUserAttributes(user, {
    email,
    family_name: familyName,
    given_name: givenName,
    phone_number: phoneNumber,
    picture,
  }).catch(WrapKnownExceptions);
};

export const handleCheckVerifiedContact = async () => {
  const user = await Auth.currentAuthenticatedUser().catch(WrapKnownExceptions);
  return Auth.verifiedContact(user).catch(WrapKnownExceptions);
};

export const handleVerifyContact = async (
  contact: Contact,
  data: typeof ChallengeModel,
) => {
  return Auth.verifyCurrentUserAttributeSubmit(contact, data.code).catch(
    WrapKnownExceptions,
  );
};

export const handleResend = async (data: typeof EmailModel) => {
  return Auth.resendSignUp(data.email).catch(WrapKnownExceptions);
};

export const handleConfirmSignUp = async (data: typeof ChallengeModel) => {
  return Auth.confirmSignUp(data.email, data.code).catch(WrapKnownExceptions);
};

export const handleForgotPassword = async (data: typeof EmailModel) => {
  return Auth.forgotPassword(data.email).catch(WrapKnownExceptions);
};

export const handleForgotPasswordSubmit = async (
  data: typeof PasswordResetModel,
) => {
  await Auth.forgotPasswordSubmit(data.email, data.code, data.password);
  return handleSignOut(true).catch(WrapKnownExceptions);
};

export const handleChangePasswordSubmit = async (
  data: typeof PasswordChangeModel,
) => {
  const currentUser = await Auth.currentAuthenticatedUser().catch(
    WrapKnownExceptions,
  );
  return Auth.changePassword(
    currentUser,
    data.passwordOld,
    data.password,
  ).catch(WrapKnownExceptions);
};

export const handleCompleteNewPassword = async (
  data: typeof PasswordRequiredModel,
) => {
  const currentUser = await Auth.currentAuthenticatedUser().catch(
    WrapKnownExceptions,
  );
  const attrs = getUserAttrs(currentUser);

  return Auth.completeNewPassword(currentUser, data.password, attrs).catch(
    WrapKnownExceptions,
  );
};
