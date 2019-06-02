import { Formik } from 'formik';
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
          onSubmit={(values, actions) => {
            this.onPressChange(values);
          }}
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
  private onPressChange = async (form: Model) => {
    try {
      await handleChangePasswordSubmit(form);
      alertOk(() => NavigationService.navigate('Profile'));
    } catch (err) {
      alertFail(() => null, err);
    }
  };
}

export { PasswordChangeScreen };
