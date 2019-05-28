import { Formik } from 'formik';
import React, { Component } from 'react';
import { Alert } from 'react-native';
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
import { NavigationService } from '../../utils';

type Props = NavigationScreenProps;
type Model = typeof formikInitialValues;

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email()
    .required(),
});

const formikInitialValues = {
  email: '',
};

class PasswordForgotScreen extends Component<Props> {
  public render() {
    return (
      <StyledScreenContainer>
        <Header
          text={'What is your email?'}
          message="We'll send a reset code."
        />
        <Formik
          initialValues={formikInitialValues}
          validationSchema={ForgotPasswordSchema}
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
                  <StyledButton onPress={fProps.handleSubmit} label={'Reset'} />
                </StyledFormRow>
              </StyledFormContainer>
            );
          }}
        </Formik>
      </StyledScreenContainer>
    );
  }

  private onPressReset = (form: Model) => {
    Alert.alert('not yet implemented');
    NavigationService.navigate('Reset');
  };
}

export { PasswordForgotScreen };
