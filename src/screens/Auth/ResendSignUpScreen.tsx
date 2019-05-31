import { Formik } from 'formik';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Header } from '../../components';
import { EmailInput } from '../../components/Inputs';
import { EmailOnlySchema, EmailModel, handleResend } from '../../core';
import { FormikInputWrapper } from '../../hocs';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';
import { NavigationService, Busy, alertOk, alertFail } from '../../utils';

type Props = NavigationScreenProps;
type FormModel = typeof EmailModel;

class ResendSignUpScreen extends Component<Props> {
  public render() {
    return (
      <StyledScreenContainer>
        <Header
          title={'Resend confirmation email'}
          message={'What is the email you used to sign up?'}
        />
        <Formik<FormModel>
          initialValues={EmailModel}
          validationSchema={EmailOnlySchema}
          onSubmit={(values, actions) => {
            this.onPressReset(values);
          }}
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
                  <StyledButton onPress={fProps.handleSubmit} label={'Reset'} />
                </StyledFormRow>
              </StyledFormContainer>
            );
          }}
        </Formik>
      </StyledScreenContainer>
    );
  }

  private onPressReset = async (form: FormModel) => {
    try {
      Busy.start();
      await handleResend(form);
      alertOk(() => NavigationService.navigate('Confirm'));
    } catch (err) {
      alertFail(() => null, err);
    } finally {
      Busy.stop();
    }
  };
}

export { ResendSignUpScreen };