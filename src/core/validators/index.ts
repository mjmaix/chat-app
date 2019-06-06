import * as Yup from 'yup';

export const emailRule = Yup.string()
  .label('Email')
  .email();

export const phoneNumberRule = Yup.string()
  .label('Mobile number')
  .matches(/^[=+\s]*(?:[0-9][=+\s]*){8,}$/, 'Not a valid mobile number');

export const passwordRule = Yup.string()
  .matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    'Ensure that password is 8 to 64 characters long and contains a mix of upper and lower case characters, one numeric and one special character',
  )
  .label('Password')
  .min(8);

export const nameRule = Yup.string()
  .label('Name')
  .ensure();

export const pictureRule = Yup.string()
  .label('Profile picture')
  .ensure();

export const codeRule = Yup.string()
  .matches(
    /^[0-9]{6,6}$/,
    'Ensure that code is 6 characters long and only consists of numbers.',
  )
  .label('Code');

export const SignUpSchema = Yup.object().shape({
  password: passwordRule.required(),
  email: emailRule.required(),
  familyName: nameRule.label('Family name').notRequired(),
  givenName: nameRule.label('Given name').notRequired(),
  phoneNumber: phoneNumberRule.required(),
  picture: pictureRule.notRequired(),
});

export const CompleteNewPasswordSchema = Yup.object().shape({
  password: passwordRule.required(),
  email: emailRule.notRequired(),
  familyName: nameRule.label('Family name').notRequired(),
  givenName: nameRule.label('Given name').notRequired(),
  phoneNumber: phoneNumberRule.required(),
});

export const UpdateProfileSchema = Yup.object().shape({
  email: emailRule.required(),
  familyName: nameRule.label('Family name').notRequired(),
  givenName: nameRule.label('Given name').notRequired(),
  phoneNumber: phoneNumberRule.required(),
  picture: pictureRule.notRequired(),
});

export const SignInEmailSchema = Yup.object().shape({
  password: Yup.string().required(),
  email: emailRule.required(),
});

export const SignInMobileSchema = Yup.object().shape({
  password: Yup.string().required(),
  phoneNumber: phoneNumberRule.required(),
});

export const ChallengeSchema = Yup.object().shape({
  email: emailRule.required(),
  code: codeRule.required('Required'),
});

export const VerifyContactSchema = Yup.object().shape({
  email: emailRule.notRequired(),
  phone_number: phoneNumberRule.notRequired(),
  code: codeRule.required('Required'),
});

export const EmailOnlySchema = Yup.object().shape({
  email: emailRule.required(),
});

export const PasswordResetSchema = Yup.object().shape({
  password: passwordRule.required(),
  code: codeRule.required(),
  email: emailRule.required(),
});

export const PasswordChangeSchema = Yup.object().shape({
  passwordOld: passwordRule.label('Old password').required(),
  password: passwordRule.label('New password').required(),
});

export const CodeSchema = Yup.object().shape({
  code: codeRule.required(),
});
