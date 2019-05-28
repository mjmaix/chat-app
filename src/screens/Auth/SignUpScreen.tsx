import { Formik } from 'formik';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import * as Yup from 'yup';
import { Header } from '../../components';
import { EmailInput, PasswordInput } from '../../components/Inputs';
import { FormikInputWrapper } from '../../hocs';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';

type Props = NavigationScreenProps;
type Model = typeof formikInitialValues;

const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .label('Password')
    .min(8)
    .required(),
  passwordConfirm: Yup.string()
    .label('Confirm password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
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

const formikInitialValues = {
  email: '',
  password: '',
  passwordConfirm: '',
  familyName: '',
  givenName: '',
  phoneNumber: '',
  picture: '',
};

class SignUpScreen extends Component<Props> {
  public render() {
    const { navigation } = this.props;
    return (
      <StyledScreenContainer>
        <Header text={'Sign up'} message="Please fill in the details" />
        <Formik
          initialValues={formikInitialValues}
          validationSchema={SignUpSchema}
          onSubmit={(values, actions) => {
            this.onPressSignUp(values);
          }}
        >
          {fProps => {
            return (
              <StyledFormContainer>
                <StyledFormRow>
                  <FormikInputWrapper dataKey="email" formProps={fProps}>
                    <StyledTextInput as={EmailInput} />
                  </FormikInputWrapper>
                </StyledFormRow>

                <StyledFormRow>
                  <FormikInputWrapper dataKey="phoneNumber" formProps={fProps}>
                    <StyledTextInput
                      placeholder="Mobile"
                      keyboardType="phone-pad"
                      autoCapitalize="none"
                      textContentType="telephoneNumber"
                    />
                  </FormikInputWrapper>
                </StyledFormRow>

                <StyledFormRow>
                  <FormikInputWrapper dataKey="givenName" formProps={fProps}>
                    <StyledTextInput
                      placeholder="Given name"
                      textContentType="givenName"
                    />
                  </FormikInputWrapper>
                </StyledFormRow>

                <StyledFormRow>
                  <FormikInputWrapper dataKey="familyName" formProps={fProps}>
                    <StyledTextInput
                      placeholder="Family name"
                      textContentType="familyName"
                    />
                  </FormikInputWrapper>
                </StyledFormRow>

                <StyledFormRow>
                  <FormikInputWrapper dataKey="password" formProps={fProps}>
                    <StyledTextInput
                      as={PasswordInput}
                      onSubmitEditing={fProps.handleSubmit}
                    />
                  </FormikInputWrapper>
                </StyledFormRow>

                <StyledFormRow>
                  <FormikInputWrapper
                    dataKey="passwordConfirm"
                    formProps={fProps}
                  >
                    <StyledTextInput
                      as={PasswordInput}
                      placeholder="Confirm password"
                      onSubmitEditing={fProps.handleSubmit}
                    />
                  </FormikInputWrapper>
                </StyledFormRow>
                <StyledFormRow>
                  <StyledButton
                    onPress={fProps.handleSubmit}
                    label={'Sign up'}
                  />
                </StyledFormRow>
              </StyledFormContainer>
            );
          }}
        </Formik>
      </StyledScreenContainer>
    );
  }

  private onPressSignUp = async (form: Model) => {
    Alert.alert('not yet implemented');
    // NavigationService.navigate('SignIn');
  };
}

export { SignUpScreen };
