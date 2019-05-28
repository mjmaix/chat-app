import { Formik } from 'formik';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import * as Yup from 'yup';
import { Header } from '../components';
import { PasswordInput } from '../components/Inputs';
import { FormikInputWrapper } from '../hocs';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../styled';
type Props = NavigationScreenProps;
type Model = typeof formikInitialValues;

const PasswordChangeSchema = Yup.object().shape({
  passwordOld: Yup.string()
    .label('Old password')
    .required(),
  password: Yup.string()
    .label('New password')
    .required(),
});

const formikInitialValues = {
  oldPassword: '',
  password: '',
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
                  <FormikInputWrapper dataKey="passwordOld" formProps={fProps}>
                    <StyledTextInput
                      as={PasswordInput}
                      placeholder="Old password"
                    />
                  </FormikInputWrapper>
                </StyledFormRow>
                <StyledFormRow>
                  <FormikInputWrapper dataKey="password" formProps={fProps}>
                    <StyledTextInput
                      as={PasswordInput}
                      placeholder="New password"
                    />
                  </FormikInputWrapper>
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
