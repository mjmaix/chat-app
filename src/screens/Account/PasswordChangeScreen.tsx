import { Formik, FormikActions } from 'formik';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { PasswordInput } from '../../components/Inputs';
import {
  PasswordChangeModel,
  PasswordChangeSchema,
  handleChangePasswordSubmit,
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
import { NavigationService, alertFail, alertOk } from '../../utils';

type Props = NavigationScreenProps;
type Model = typeof PasswordChangeModel;

class PasswordChangeScreen extends Component<Props> {
  public render() {
    return (
      <StyledScreenContainer>
        <Formik
          initialValues={PasswordChangeModel}
          validationSchema={PasswordChangeSchema}
          onSubmit={this.onPressChange}
        >
          {fProps => {
            return (
              <StyledFormContainer>
                <StyledFormRow>
                  <FormikInputInjector dataKey="passwordOld" formProps={fProps}>
                    <StyledTextInput
                      as={PasswordInput}
                      placeholder="Old password"
                    />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <FormikInputInjector dataKey="password" formProps={fProps}>
                    <StyledTextInput
                      as={PasswordInput}
                      placeholder="New password"
                    />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <StyledErrorText message={fProps.errors.form} />
                </StyledFormRow>

                <StyledFormRow>
                  <StyledButton
                    onPress={fProps.handleSubmit}
                    label={'Change'}
                  />
                </StyledFormRow>
              </StyledFormContainer>
            );
          }}
        </Formik>
      </StyledScreenContainer>
    );
  }
  private onPressChange = async <T extends Model>(
    form: T,
    actions: FormikActions<T>,
  ) => {
    try {
      await handleChangePasswordSubmit(form);
      alertOk(() => NavigationService.navigate('Profile'));
    } catch (err) {
      actions.setFieldError('form', err.message);
      alertFail(() => null, err);
    }
  };
}

export { PasswordChangeScreen };
