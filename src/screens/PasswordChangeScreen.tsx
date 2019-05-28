import { Formik } from 'formik';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import * as Yup from 'yup';
import { Header } from '../components';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormikInput,
  StyledFormRow,
  StyledScreenContainer,
} from '../styled';
type Props = NavigationScreenProps;
type Model = typeof formikInitialValues;

const PasswordChangeSchema = Yup.object().shape({
  password: Yup.string()
    .label('Password')
    .required(),
  passwordConfirm: Yup.string()
    .label('Confirm password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  passwordOld: Yup.string()
    .label('Old password')
    .required(),
});

const formikInitialValues = {
  oldPassword: '',
  password: '',
  passwordConfirm: '',
};

class PasswordChangeScreen extends Component<Props> {
  public render() {
    return (
      <StyledScreenContainer>
        <Header text={'Change password'} />
        <Formik
          initialValues={formikInitialValues}
          validationSchema={PasswordChangeSchema}
          onSubmit={(values, actions) => {
            this.onPressChange(values);
          }}
        >
          {fProps => {
            return (
              <StyledFormContainer>
                <StyledFormRow>
                  <StyledFormikInput
                    dataKey="passwordOld"
                    formProps={fProps}
                    placeholder="Old password"
                    secureTextEntry
                  />
                </StyledFormRow>
                <StyledFormRow>
                  <StyledFormikInput
                    dataKey="password"
                    formProps={fProps}
                    placeholder="New password"
                    secureTextEntry
                  />
                </StyledFormRow>
                <StyledFormRow>
                  <StyledFormikInput
                    dataKey="passwordConfirm"
                    formProps={fProps}
                    placeholder="Confirm password"
                    secureTextEntry
                  />
                </StyledFormRow>
                <StyledFormRow>
                  <StyledButton
                    onPress={fProps.handleSubmit}
                    label={'Change'}
                  />
                </StyledFormRow>
              </StyledFormContainer>
            );
          }}
        </Formik>
      </StyledScreenContainer>
    );
  }
  private onPressChange = async (form: Model) => {
    Alert.alert('not yet implemented');
    // NavigationService.navigate('SignIn');
  };
}

export { PasswordChangeScreen };
