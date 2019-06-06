import { Formik, FormikActions } from 'formik';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { CodeInput, EmailInput, Header, PasswordInput } from '../../components';
import {
  PasswordResetModel,
  PasswordResetSchema,
  handleForgotPasswordSubmit,
} from '../../core';
import { FormikInputInjector } from '../../hocs';
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
type FormModel = typeof PasswordResetModel;

const initialValues = {
  email: '',
  password: '',
  code: '',
};

class PasswordResetScreen extends Component<Props> {
  public render() {
    const { navigation } = this.props;
    return (
      <StyledScreenContainer>
        <Header title={'Change password'} message="Type in the reset code" />
        <Formik<FormModel>
          initialValues={initialValues}
          validationSchema={PasswordResetSchema}
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
                  <FormikInputInjector dataKey="code" formProps={fProps}>
                    <StyledTextInput as={CodeInput} />
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
  private onPressReset = async <T extends FormModel>(
    form: T,
    actions: FormikActions<T>,
  ) => {
    try {
      Busy.start();
      await handleForgotPasswordSubmit(form);
      alertOk(() => NavigationService.navigate('App'));
    } catch (err) {
      actions.setFieldError('form', err.message);
      alertFail(() => null, err);
    } finally {
      actions.setSubmitting(false);
      Busy.stop();
    }
  };
}

export { PasswordResetScreen };
