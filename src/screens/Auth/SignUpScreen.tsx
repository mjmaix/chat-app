import { Formik, FormikActions } from 'formik';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Header } from '../../components';
import { EmailInput, PasswordInput } from '../../components/Inputs';
import { SignUpSchema, handleSignUp, error, SignUpModel } from '../../core';
import { FormikInputWrapper } from '../../hocs';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';
import { NavigationService, alertOk, alertFail, Busy } from '../../utils';

type Props = NavigationScreenProps;
type FormModel = typeof SignUpModel;

class SignUpScreen extends Component<Props> {
  public render() {
    return (
      <StyledScreenContainer>
        <Header title={'Sign up'} message="Please fill in the details" />
        <Formik<FormModel>
          initialValues={SignUpModel}
          validationSchema={SignUpSchema}
          onSubmit={this.onPressSignUp}
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
                  <FormikInputWrapper dataKey="phoneNumber" formProps={fProps}>
                    <StyledTextInput
                      placeholder="Mobile"
                      keyboardType="phone-pad"
                      autoCapitalize="none"
                      textContentType="telephoneNumber"
                    />
                  </FormikInputWrapper>
                </StyledFormRow>

                <StyledFormRow>
                  <FormikInputWrapper dataKey="givenName" formProps={fProps}>
                    <StyledTextInput
                      placeholder="Given name"
                      textContentType="givenName"
                    />
                  </FormikInputWrapper>
                </StyledFormRow>

                <StyledFormRow>
                  <FormikInputWrapper dataKey="familyName" formProps={fProps}>
                    <StyledTextInput
                      placeholder="Family name"
                      textContentType="familyName"
                    />
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
