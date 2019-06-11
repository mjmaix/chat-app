import { CognitoUser } from '@aws-amplify/auth';
import {
  CurrentUserOpts,
  GetPreferredMFAOpts,
} from '@aws-amplify/auth/lib/types';
import { Auth } from 'aws-amplify';
import _ from 'lodash';

import { WrapKnownExceptions } from '../../errors';
import { logInfo } from '../../reports';
import {
  ChallengeModel,
  CodeRequiredModel,
  EmailModel,
  PasswordChangeModel,
  PasswordRequiredModel,
  PasswordResetModel,
  ProfileModel,
  SignInModel,
  SignUpModel,
} from '../models';
import { VerifyContactModel } from '../models/index';

type SignUpModel = typeof ProfileModel & typeof PasswordRequiredModel;

export const handleGetCurrentUserAttrs = async (opts?: CurrentUserOpts) => {
  const currentUser: ChatCognitoUser = await Auth.currentUserPoolUser(
    opts,
  ).catch(WrapKnownExceptions);
  return currentUser.attributes;
};

export const handleGetCurrentUser = async (opts?: CurrentUserOpts) => {
  const currentUser = await Auth.currentUserPoolUser(opts).catch(
    WrapKnownExceptions,
  );
  return currentUser as ChatCognitoUser;
};

export const handleSignUp = async (data: typeof SignUpModel) => {
  const { password, ...attrs } = data;
  const user = await Auth.signUp({
    username: attrs.email,
    password,
    attributes: {
      email: attrs.email,
      family_name: attrs.family_name,
      given_name: attrs.given_name,
      phone_number: attrs.phone_number,
    },
  }).catch(WrapKnownExceptions);

  return user;
};

export const handleSignIn = async (data: typeof SignInModel) => {
  logInfo('[START] handleSignIn');
  const { email, password, phone_number } = data;
  const user = await Auth.signIn({
    username: email.toLowerCase() || phone_number,
    password,
  }).catch(WrapKnownExceptions);
  return user;
};

export const handleSignOut = async (global = false) => {
  logInfo('[START] handleSignOut');
  return Auth.signOut({ global }).catch(WrapKnownExceptions);
};

export const handleUpdateProfile = async (data: typeof ProfileModel) => {
  logInfo('[START] handleUpdateProfile');
  const { email, family_name, given_name, phone_number, picture } = data;
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);

  const buildAttrs: any = {
    email: email.toLowerCase(),
    family_name,
    given_name,
    picture: picture || '', // TODO: workaround, https://github.com/jaredpalmer/formik/pull/728 - wait for formik to support Yup transform during validation
  };
  if (phone_number) {
    buildAttrs.phone_number = phone_number || '';
  }

  return Auth.updateUserAttributes(user, buildAttrs).catch(WrapKnownExceptions);
};

export const handleCheckVerifiedContact = async (opts?: CurrentUserOpts) => {
  logInfo('[START] handleCheckVerifiedContact');
  const user = await Auth.currentUserPoolUser(opts).catch(WrapKnownExceptions);
  const verif = await Auth.verifiedContact(user).catch(WrapKnownExceptions);
  return verif;
};

export const handleVerifyContact = async (data: typeof VerifyContactModel) => {
  logInfo('[START] handleVerifyContact', data);
  const contact = data.contact as Contact;
  const verif = await Auth.verifyCurrentUserAttributeSubmit(
    contact,
    data.code,
  ).catch(WrapKnownExceptions);

  return verif;
};

export const handleVerifyContactResend = async (contact: Contact) => {
  logInfo('[START] handleVerifyContactResend');
  return Auth.verifyCurrentUserAttribute(contact).catch(WrapKnownExceptions);
};

export const handleResend = async (data: typeof EmailModel) => {
  logInfo('[START] handleResend');
  return Auth.resendSignUp(data.email).catch(WrapKnownExceptions);
};

export const handleConfirmSignUp = async (data: typeof ChallengeModel) => {
  logInfo('[START] handleConfirmSignUp');
  return Auth.confirmSignUp(data.email.toLowerCase(), data.code).catch(
    WrapKnownExceptions,
  );
};

export const handleForgotPassword = async (data: typeof EmailModel) => {
  logInfo('[START] handleForgotPassword');
  return Auth.forgotPassword(data.email).catch(WrapKnownExceptions);
};

export const handleForgotPasswordSubmit = async (
  data: typeof PasswordResetModel,
) => {
  logInfo('[START] handleForgotPasswordSubmit');
  await Auth.forgotPasswordSubmit(data.email, data.code, data.password);
  return handleSignOut(true).catch(WrapKnownExceptions);
};

export const handleChangePasswordSubmit = async (
  data: typeof PasswordChangeModel,
) => {
  logInfo('[START] handleChangePasswordSubmit');
  const currentUser = await Auth.currentUserPoolUser().catch(
    WrapKnownExceptions,
  );
  return Auth.changePassword(
    currentUser,
    data.passwordOld,
    data.password,
  ).catch(WrapKnownExceptions);
};

export const handleCompleteNewPassword = async (
  unAuthUser: ChatCognitoUser,
  data: Partial<typeof SignUpModel> & typeof PasswordRequiredModel,
) => {
  logInfo('[START] handleCompleteNewPassword');
  const { requiredAttributes } = unAuthUser.challengeParam;
  const camelCaseData = _.reduce(
    data,
    (acc, v, k) => ({ ...acc, [_.snakeCase(k)]: v }),
    {},
  );
  const valueForReqdAttrs = _.pick(camelCaseData, requiredAttributes);

  return Auth.completeNewPassword(
    unAuthUser,
    data.password,
    valueForReqdAttrs,
  ).catch(WrapKnownExceptions);
};

export const handleSetupMfaTotp = async () => {
  logInfo('[START] handleSetupMfaTotp');
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);
  return Auth.setupTOTP(user).catch(WrapKnownExceptions);
};

export const handleVerifyMfaTotp = async (data: typeof CodeRequiredModel) => {
  logInfo('[START] handleVerifyMfaTotp');
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);
  await Auth.verifyTotpToken(user, data.code).catch(WrapKnownExceptions);

  return handleSetMfa('TOTP');
};

export const handleSetupMfaSms = async () => {
  logInfo('[START] handleSetupMfaSms');
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);
  return Auth.enableSMS(user).catch(WrapKnownExceptions);
};

export const handleVerifyMfaSms = async (data: typeof CodeRequiredModel) => {
  logInfo('[START] handleVerifyMfaSms');
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);
  await Auth.verifyTotpToken(user, data.code).catch(WrapKnownExceptions);

  return handleSetMfa('SMS');
};

export const handleSetMfa = async (mfa: MfaOption) => {
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);
  return Auth.setPreferredMFA(user, mfa).catch(WrapKnownExceptions);
};

export const handleGetPreferredMfa = async (opts?: GetPreferredMFAOpts) => {
  logInfo('[START] handleGetPreferredMfa');
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);

  const preferred = await Auth.getPreferredMFA(user, opts).catch(
    WrapKnownExceptions,
  );

  return preferred as MfaChallengeType;
};

export const handleConfirmSignIn = async (
  unAuthUser: ChatCognitoUser,
  data: typeof CodeRequiredModel,
) => {
  logInfo('[START] handleConfirmSignIn');
  const mfaType = unAuthUser.challengeName as Nullable<MfaSignIn>;
  return Auth.confirmSignIn(unAuthUser, data.code, mfaType).catch(
    WrapKnownExceptions,
  );
};
