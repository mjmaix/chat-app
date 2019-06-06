import { Formik, FormikActions, FormikProps } from 'formik';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { EmailInput, Header, PasswordInput } from '../../components';
import { SignInModel, SignInSchema, handleSignIn } from '../../core';
import { FormikInputInjector } from '../../hocs';
import { MemoFormikFormErrorText } from '../../hocs/MemoFormikFormErrorText';
import { ScreenName } from '../../routes/mappings';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';
import { Busy, NavigationService, alertFail } from '../../utils';

type Props = NavigationScreenProps;
type FormModel = typeof SignInModel;

class SignInEmailScreen extends Component<Props> {
  public render() {
    return (
      <StyledScreenContainer>
        <Header title={'Sign in with email'} />
        <Formik
          initialValues={SignInModel}
          validationSchema={SignInSchema}
          onSubmit={this.onPressSignIn}
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
                  <FormikInputInjector dataKey="password" formProps={fProps}>
                    <StyledTextInput
                      as={PasswordInput}
                      onSubmitEditing={fProps.handleSubmit}
                    />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <MemoFormikFormErrorText {...fProps} />
                </StyledFormRow>

                <StyledFormRow>
                  <StyledButton
                    onPress={fProps.handleSubmit}
                    label={'Sign in'}
                  />
                </StyledFormRow>
              </StyledFormContainer>
            );
          }}
        </Formik>
      </StyledScreenContainer>
    );
  }

  private onPressSignIn = async <T extends FormModel>(
    form: T,
    actions: FormikActions<T>,
  ) => {
    let transferScreen: ScreenName | null = 'App';
    let user;
    try {
      Busy.start();
      user = await handleSignIn(form);
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        transferScreen = 'CompleteRegistration';
      } else if (user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        transferScreen = 'SignInCode';
      }
    } catch (err) {
      transferScreen = null;
      actions.setFieldError('form', err.message);
      alertFail(() => null, err);
    } finally {
      actions.setSubmitting(false);
      Busy.stop();
      if (transferScreen) {
        NavigationService.navigate(transferScreen, {
          unAuthUser: user,
        });
      }
    }
  };
}

export { SignInEmailScreen };
