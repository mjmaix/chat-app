import { Formik } from 'formik';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Header } from '../../components';
import { EmailInput } from '../../components/Inputs';
import { EmailOnlySchema, EmailModel, handleForgotPassword } from '../../core';
import { FormikInputWrapper } from '../../hocs';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';
import { NavigationService, alertFail, alertOk, Busy } from '../../utils';

type Props = NavigationScreenProps;
type FormModel = typeof EmailModel;

class PasswordForgotScreen extends Component<Props> {
  public render() {
    return (
      <StyledScreenContainer>
        <Header
          title={'What is your email?'}
          message="We'll send a reset code."
        />
        <Formik<FormModel>
          initialValues={EmailModel}
          validationSchema={EmailOnlySchema}
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
                <StyledFormRow>
                  <StyledButton
                    onPress={this.onPressGotResetCode}
                    label={'Have the reset code?'}
                    type="clear"
                  />
                </StyledFormRow>
              </StyledFormContainer>
            );
          }}
        </Formik>
      </StyledScreenContainer>
    );
  }

  private onPressReset = async (form: FormModel) => {
    try {
      Busy.start();
      await handleForgotPassword(form);
      alertOk(() => NavigationService.navigate('Reset'));
    } catch (err) {
      alertFail(() => null, err);
    } finally {
      Busy.stop();
    }
  };

  private onPressGotResetCode = () => {
    NavigationService.navigate('Reset');
  };
}

export { PasswordForgotScreen };
