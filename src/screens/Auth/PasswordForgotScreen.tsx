import { Formik } from 'formik';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Header } from '../../components';
import { EmailInput } from '../../components/Inputs';
import { ForgotPasswordSchema } from '../../core';
import { FormikInputWrapper } from '../../hocs';
import { StyledButton, StyledFormContainer, StyledFormRow, StyledScreenContainer, StyledTextInput } from '../../styled';
import { NavigationService } from '../../utils';

type Props = NavigationScreenProps;
type Model = typeof formikInitialValues;


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
                  <FormikInputWrapper dataKey="email" formProps={fProps}>
                    <StyledTextInput as={EmailInput} />
                  </FormikInputWrapper>
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

