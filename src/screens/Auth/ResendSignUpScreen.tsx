import { Formik, FormikActions } from 'formik';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { Header } from '../../components';
import { EmailInput } from '../../components/Inputs';
import { EmailModel, EmailOnlySchema, handleResend } from '../../core';
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

class ResendSignUpScreen extends Component<Props> {
  public render() {
    return (
      <StyledScreenContainer>
        <WithKeyboardHide>
          <Header
            title={'Resend confirmation email'}
            message={'What is the email you used to sign up?'}
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
      await handleResend(form);
      alertOk(() => NavigationService.navigate('Confirm'));
    } catch (err) {
      actions.setFieldError('form', err.message);
      alertFail(() => null, err);
    } finally {
      actions.setSubmitting(false);
      Busy.stop();
    }
  };
}

export { ResendSignUpScreen };
