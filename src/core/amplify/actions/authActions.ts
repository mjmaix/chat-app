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

type SignUpModel = typeof ProfileModel & typeof PasswordRequiredModel;

const getUserAttrs = (
  user: CognitoUser & { attributes: ChatCurrentUserAttributes },
) => {
  return {
    email: user.attributes.email,
    familyName: user.attributes.family_name,
    givenName: user.attributes.given_name,
    phoneNumber: user.attributes.phone_number,
    picture: user.attributes.picture,
  } as typeof ProfileModel;
};

export const handleGetCurrentUserAttrs = async (opts?: CurrentUserOpts) => {
  const currentUser = await Auth.currentUserPoolUser(opts).catch(
    WrapKnownExceptions,
  );
  const attrs = getUserAttrs(currentUser);
  return attrs;
};

export const handleSignUp = async (data: typeof SignUpModel) => {
  const { password, ...attrs } = data;
  const user = await Auth.signUp({
    username: attrs.email,
    password,
    attributes: {
      email: attrs.email,
      family_name: attrs.familyName,
      given_name: attrs.givenName,
      phone_number: attrs.phoneNumber,
    },
  }).catch(WrapKnownExceptions);

  return user;
};

export const handleSignIn = async (data: typeof SignInModel) => {
  logInfo('[START] handleSignIn');
  const { email, password, phoneNumber } = data;
  const user = await Auth.signIn({
    username: email.toLowerCase(),
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
  const { email, familyName, givenName, phoneNumber, picture } = data;
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);

  return Auth.updateUserAttributes(user, {
    email: email.toLowerCase(),
    family_name: familyName,
    given_name: givenName,
    phone_number: phoneNumber,
    picture: picture || '', // TODO: workaround, https://github.com/jaredpalmer/formik/pull/728 - wait for formik to support Yup transform during validation
  }).catch(WrapKnownExceptions);
};

export const handleCheckVerifiedContact = async (opts?: CurrentUserOpts) => {
  logInfo('[START] handleCheckVerifiedContact');
  const user = await Auth.currentUserPoolUser(opts).catch(WrapKnownExceptions);
  const verif = await Auth.verifiedContact(user).catch(WrapKnownExceptions);
  return verif;
};

export const handleVerifyContact = async (
  contact: Contact,
  data: typeof ChallengeModel,
) => {
  logInfo('[START] handleVerifyContact');
  return Auth.verifyCurrentUserAttributeSubmit(contact, data.code).catch(
    WrapKnownExceptions,
  );
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

  return Auth.setPreferredMFA(user, 'TOTP').catch(WrapKnownExceptions);
};

export const handleSetMfa = async (mfa: SetPreferredMfa) => {
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);
  return Auth.setPreferredMFA(user, mfa).catch(WrapKnownExceptions);
};

  logInfo('[START] handleGetPreferredMfa');
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);
  return Auth.getPreferredMFA(user, opts).catch(WrapKnownExceptions) as Promise<
    MFAChoice
  >;
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
