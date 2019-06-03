import { Formik, FormikActions, FormikProps } from 'formik';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { Header } from '../../components';
import { EmailInput, PasswordInput } from '../../components/Inputs';
import { SignInModel, SignInSchema, handleSignIn } from '../../core';
import { FormikInputInjector, withFormikMemoize } from '../../hocs';
import {
  StyledButton,
  StyledErrorText,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';
import { Busy, NavigationService, alertFail } from '../../utils';

type Props = NavigationScreenProps;
type FormModel = typeof SignInModel;

class SignInEmailScreen extends Component<Props> {
  public renderErrorText = (fProps: FormikProps<FormModel>) => (
    <StyledErrorText message={fProps.errors.form} />
  );
  public render() {
    const MemoizedErrorText = withFormikMemoize(
      this.renderErrorText,
      'form',
      true,
    );
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
                  <MemoizedErrorText {...fProps} />
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
    try {
      Busy.start();
      await handleSignIn(form);
      NavigationService.navigate('App');
    } catch (err) {
      actions.setFieldError('form', err.message);
      alertFail(() => null, err);
    } finally {
      actions.setSubmitting(false);
      Busy.stop();
    }
  };
}

export { SignInEmailScreen };
