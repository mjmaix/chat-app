import { CognitoUser } from '@aws-amplify/auth';
import {
  CurrentUserOpts,
  GetPreferredMFAOpts,
} from '@aws-amplify/auth/lib/types';
import { Auth } from 'aws-amplify';
import _ from 'lodash';

import { NavigationService } from '../../../utils';
import { WrapKnownExceptions } from '../../errors';
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
  const { email, password } = data;
  const user = await Auth.signIn({
    username: email.toLowerCase(),
    password,
  }).catch(WrapKnownExceptions);
  return user;
};

export const handleSignOut = async (global = false) => {
  return Auth.signOut({ global }).catch(WrapKnownExceptions);
};

export const handleUpdateProfile = async (data: typeof ProfileModel) => {
  const { email, familyName, givenName, phoneNumber, picture } = data;
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);

  return Auth.updateUserAttributes(user, {
    email: email.toLowerCase(),
    family_name: familyName,
    given_name: givenName,
    phone_number: phoneNumber,
    picture,
  }).catch(WrapKnownExceptions);
};

export const handleCheckVerifiedContact = async () => {
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);
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
  return Auth.confirmSignUp(data.email.toLowerCase(), data.code).catch(
    WrapKnownExceptions,
  );
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
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);
  return Auth.setupTOTP(user).catch(WrapKnownExceptions);
};

export const handleSetMfa = async (mfa: MFAChoice) => {
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);
  return Auth.setPreferredMFA(user, mfa).catch(WrapKnownExceptions);
};

export const handleGetPreferredMfa: (
  opts?: GetPreferredMFAOpts,
) => Promise<MFAChoice> = async opts => {
  const user = await Auth.currentUserPoolUser().catch(WrapKnownExceptions);
  return Auth.getPreferredMFA(user, opts).catch(WrapKnownExceptions) as Promise<
    MFAChoice
  >;
};
