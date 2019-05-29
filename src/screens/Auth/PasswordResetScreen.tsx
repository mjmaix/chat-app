import { Formik } from 'formik';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Header } from '../../components';
import { EmailInput, PasswordInput } from '../../components/Inputs';
import { PasswordResetSchema } from '../../core';
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
                  <FormikInputWrapper dataKey="email" formProps={fProps}>
                    <StyledTextInput as={EmailInput} />
                  </FormikInputWrapper>
                </StyledFormRow>
                <StyledFormRow>
                  <FormikInputWrapper dataKey="code" formProps={fProps}>
                    <StyledTextInput placeholder="Code" />
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
