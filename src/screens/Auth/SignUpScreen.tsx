import { Formik } from 'formik';
import React, { Component } from 'react';
import { Alert, Platform } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import * as Yup from 'yup';
import { Header } from '../../components';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormikInput,
  StyledFormRow,
  StyledScreenContainer,
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
                  <StyledFormikInput
                    dataKey="email"
                    formProps={fProps}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    textContentType="emailAddress"
                  />
                </StyledFormRow>
                <StyledFormRow>
                  <StyledFormikInput
                    dataKey="phoneNumber"
                    formProps={fProps}
                    placeholder="Mobile"
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    textContentType="telephoneNumber"
                  />
                </StyledFormRow>

                <StyledFormRow>
                  <StyledFormikInput
                    dataKey="givenName"
                    formProps={fProps}
                    placeholder="Given name"
                    textContentType="givenName"
                  />
                </StyledFormRow>

                <StyledFormRow>
                  <StyledFormikInput
                    dataKey="familyName"
                    formProps={fProps}
                    placeholder="Family name"
                    textContentType="familyName"
                  />
                </StyledFormRow>

                <StyledFormRow>
                  <StyledFormikInput
                    dataKey="password"
                    formProps={fProps}
                    placeholder="Password"
                    keyboardType={
                      Platform.OS === 'android' ? 'visible-password' : undefined
                    }
                    secureTextEntry
                    textContentType="password"
                  />
                </StyledFormRow>

                <StyledFormRow>
                  <StyledFormikInput
                    dataKey="passwordConfirm"
                    formProps={fProps}
                    placeholder="Confirm password"
                    keyboardType={
                      Platform.OS === 'android' ? 'visible-password' : undefined
                    }
                    secureTextEntry
                    textContentType="password"
                    onSubmitEditing={fProps.handleSubmit}
                  />
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
