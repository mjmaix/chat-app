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

const PasswordResetSchema = Yup.object().shape({
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

const formikInitialValues = {
  email: '',
  password: '',
  code: '',
};

class PasswordResetScreen extends Component<Props> {
  public render() {
    const { navigation } = this.props;
    return (
      <StyledScreenContainer>
        <Header text={'Change password'} message="Type in the reset code" />
        <Formik
          initialValues={formikInitialValues}
          validationSchema={PasswordResetSchema}
          onSubmit={(values, actions) => {
            this.onPressReset(values);
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
                    dataKey="code"
                    formProps={fProps}
                    placeholder="Code"
                  />
                </StyledFormRow>
                <StyledFormRow>
                  <StyledFormikInput
                    dataKey="password"
                    formProps={fProps}
                    secureTextEntry
                    placeholder="New password"
                    keyboardType={
                      Platform.OS === 'android' ? 'visible-password' : undefined
                    }
                  />
                </StyledFormRow>
                <StyledFormRow>
                  <StyledButton
                    onPress={fProps.handleSubmit}
                    label={'Submit'}
                  />
                </StyledFormRow>
              </StyledFormContainer>
            );
          }}
        </Formik>
      </StyledScreenContainer>
    );
  }
  private onPressReset = async (form: Model) => {
    // NavigationService.navigate('App');
    Alert.alert('not yet implemented');
  };
}

export { PasswordResetScreen };
