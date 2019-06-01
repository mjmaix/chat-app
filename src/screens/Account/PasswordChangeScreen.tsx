import { Formik } from 'formik';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { PasswordInput } from '../../components/Inputs';
import {
  PasswordChangeSchema,
  PasswordChangeModel,
  handleChangePasswordSubmit,
} from '../../core';
import { FormikInputWrapper } from '../../hocs';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';
import { alertOk, NavigationService, alertFail } from '../../utils';
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
                  <FormikInputWrapper dataKey="passwordOld" formProps={fProps}>
                    <StyledTextInput
                      as={PasswordInput}
                      placeholder="Old password"
                    />
                  </FormikInputWrapper>
                </StyledFormRow>
                <StyledFormRow>
                  <FormikInputWrapper dataKey="password" formProps={fProps}>
                    <StyledTextInput
                      as={PasswordInput}
                      placeholder="New password"
                    />
                  </FormikInputWrapper>
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
