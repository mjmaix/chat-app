import * as Yup from 'yup';

const emailRule = Yup.string()
  .label('Email')
  .email()
  .required();

const phoneRule = Yup.string()
  .label('Mobile number')
  .matches(/^[=+\s]*(?:[0-9][=+\s]*){8,}$/, 'Not a valid mobile number')
  .required();

export const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .label('Password')
    .min(8)
    .required(),
  email: emailRule,
  familyName: Yup.string()
    .label('Family name')
    .notRequired()
    .ensure(),
  givenName: Yup.string()
    .label('Given name')
    .notRequired()
    .ensure(),
  phoneNumber: phoneRule,
  picture: Yup.string()
    .label('Profile picture')
    .url()
    .notRequired()
    .ensure(),
});

export const UpdateProfileSchema = Yup.object().shape({
  email: emailRule,
  familyName: Yup.string()
    .label('Family name')
    .notRequired()
    .ensure(),
  givenName: Yup.string()
    .label('Given name')
    .notRequired()
    .ensure(),
  phoneNumber: phoneRule,
  picture: Yup.string()
    .label('Profile picture')
    .notRequired()
    .ensure(),
});

export const SignInSchema = Yup.object().shape({
  password: Yup.string()
    .label('Password')
    .required(),
  email: emailRule,
});

export const ChallengeSchema = Yup.object().shape({
  email: emailRule,
  code: Yup.string()
    .label('Code')
    .required('Required'),
});

export const EmailOnlySchema = Yup.object().shape({
  email: emailRule,
});

export const PasswordResetSchema = Yup.object().shape({
  password: Yup.string()
    .label('Password')
    .required(),
  code: Yup.string()
    .label('Code')
    .required(),
  email: emailRule,
});

export const PasswordChangeSchema = Yup.object().shape({
  passwordOld: Yup.string()
    .label('Old password')
    .required(),
  password: Yup.string()
    .label('New password')
    .required(),
});
