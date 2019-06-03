import { Formik, FormikActions } from 'formik';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { Header } from '../../components';
import { EmailInput, PasswordInput } from '../../components/Inputs';
import { SignUpModel, SignUpSchema, handleSignUp } from '../../core';
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
type FormModel = typeof SignUpModel;

class SignUpScreen extends Component<Props> {
  public render() {
    return (
      <StyledScreenContainer>
        <WithKeyboardHide>
          <Header title={'Sign up'} message="Please fill in the details" />
        </WithKeyboardHide>
        <Formik<FormModel>
          initialValues={SignUpModel}
          validationSchema={SignUpSchema}
          onSubmit={this.onPressSignUp}
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
                  <FormikInputInjector dataKey="phoneNumber" formProps={fProps}>
                    <StyledTextInput
                      placeholder="Mobile"
                      keyboardType="phone-pad"
                      autoCapitalize="none"
                      textContentType="telephoneNumber"
                    />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <FormikInputInjector dataKey="givenName" formProps={fProps}>
                    <StyledTextInput
                      placeholder="Given name"
                      textContentType="givenName"
                    />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <FormikInputInjector dataKey="familyName" formProps={fProps}>
                    <StyledTextInput
                      placeholder="Family name"
                      textContentType="familyName"
                    />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <FormikInputInjector dataKey="password" formProps={fProps}>
                    <StyledTextInput
                      as={PasswordInput}
                      onSubmitEditing={fProps.handleSubmit}
                    />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <StyledErrorText message={fProps.errors.form} />
                </StyledFormRow>

                <StyledFormRow>
                  <StyledButton
                    onPress={fProps.handleSubmit}
                    label={'Sign up'}
                  />
                </StyledFormRow>
                <StyledFormRow>
                  <StyledButton
                    onPress={this.onPressConfirmCode}
                    label={'Confirm code'}
                    type="clear"
                  />
                </StyledFormRow>
                <StyledFormRow>
                  <StyledButton
                    onPress={this.onPressResend}
                    label={'Resend confirm code'}
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

  private onPressSignUp = async <T extends FormModel>(
    form: T,
    actions: FormikActions<T>,
  ) => {
    try {
      Busy.start();
      await handleSignUp(form);
      alertOk(() => NavigationService.navigate('Confirm'));
    } catch (err) {
      actions.setFieldError('form', err.message);
      alertFail(() => null, err);
    } finally {
      actions.setSubmitting(false);
      Busy.stop();
    }
  };

  private onPressConfirmCode = async () => {
    NavigationService.navigate('Challenge', {
      title: 'Confirmation',
      message: "We've sent a verification code to your email.",
      placeholder: 'Type here',
    });
  };

  private onPressResend = async () => {
    NavigationService.navigate('Resend');
  };
}

export { SignUpScreen };
