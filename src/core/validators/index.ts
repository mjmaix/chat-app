import * as Yup from 'yup';
export const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .label('Password')
    .min(8)
    .required(),
  email: Yup.string()
    .label('Email')
    .email()
    .required(),
  familyName: Yup.string()
    .label('Family name')
    .notRequired()
    .ensure(),
  givenName: Yup.string()
    .label('Given name')
    .notRequired()
    .ensure(),
  phoneNumber: Yup.string()
    .label('Mobile number')
    .matches(/^[=+\s]*(?:[0-9][=+\s]*){8,}$/, 'Not a valid mobile number')
    .required(),
  picture: Yup.string()
    .label('Profile picture')
    .url()
    .notRequired()
    .ensure(),
});

export const UpdateProfileSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email()
    .required(),
  familyName: Yup.string()
    .label('Family name')
    .notRequired()
    .ensure(),
  givenName: Yup.string()
    .label('Given name')
    .notRequired()
    .ensure(),
  phoneNumber: Yup.string()
    .label('Mobile number')
    .matches(/^[=+\s]*(?:[0-9][=+\s]*){8,}$/, 'Not a valid mobile number')
    .required(),
});

export const SignInSchema = Yup.object().shape({
  password: Yup.string()
    .label('Password')
    .required(),
  email: Yup.string()
    .label('Email')
    .email()
    .required(),
});

export const ChallengeSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email()
    .required(),
  code: Yup.string()
    .label('Code')
    .email()
    .required('Required'),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email()
    .required(),
});

export const PasswordResetSchema = Yup.object().shape({
  password: Yup.string()
    .label('Password')
    .required(),
  code: Yup.string()
    .label('Code')
    .required(),
  email: Yup.string()
    .label('Email')
    .email()
    .required(),
});

export const PasswordChangeSchema = Yup.object().shape({
  passwordOld: Yup.string()
    .label('Old password')
    .required(),
  password: Yup.string()
    .label('New password')
    .required(),
});
