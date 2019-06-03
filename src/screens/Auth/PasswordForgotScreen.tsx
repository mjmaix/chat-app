import { Formik, FormikActions } from 'formik';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Actions } from 'react-native-gifted-chat';
import { NavigationScreenProps } from 'react-navigation';

import { Header } from '../../components';
import { EmailInput } from '../../components/Inputs';
import { EmailModel, EmailOnlySchema, handleForgotPassword } from '../../core';
import { FormikInputInjector, WithKeyboardHide } from '../../hocs';
import {
  StyledButton,
  StyledErrorText,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';
import { Busy, NavigationService, alertFail, alertOk } from '../../utils';

type Props = NavigationScreenProps;
type FormModel = typeof EmailModel;

class PasswordForgotScreen extends Component<Props> {
  public render() {
    return (
      <StyledScreenContainer>
        <WithKeyboardHide>
          <Header
            title={'What is your email?'}
            message="We'll send a reset code."
          />
        </WithKeyboardHide>
        <Formik<FormModel>
          initialValues={EmailModel}
          validationSchema={EmailOnlySchema}
          onSubmit={this.onPressReset}
        >
          {fProps => {
            return (
              <StyledFormContainer>
                <StyledFormRow>
                  <FormikInputInjector dataKey="email" formProps={fProps}>
                    <StyledTextInput as={EmailInput} />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <StyledErrorText message={fProps.errors.form} />
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

  private onPressReset = async <T extends FormModel>(
    form: T,
    actions: FormikActions<T>,
  ) => {
    try {
      Busy.start();
      await handleForgotPassword(form);
      alertOk(() => NavigationService.navigate('Reset'));
    } catch (err) {
      actions.setFieldError('form', err.message);
      alertFail(() => null, err);
    } finally {
      actions.setSubmitting(false);
      Busy.stop();
    }
  };

  private onPressGotResetCode = () => {
    NavigationService.navigate('Reset');
  };
}

export { PasswordForgotScreen };
