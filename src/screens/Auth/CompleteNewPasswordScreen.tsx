import { Formik, FormikActions } from 'formik';
import includes from 'lodash/includes';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import * as Yup from 'yup';

import { Header } from '../../components';
import { EmailInput, PasswordInput } from '../../components/Inputs';
import {
  PasswordRequiredModel,
  SignUpModel,
  SignUpSchema,
  emailRule,
  handleCompleteNewPassword,
  nameRule,
  passwordRule,
  phoneNumberRule,
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

type CompleteNewPasswordScreenProps = NavigationScreenProps;
interface CompleteNewPasswordScreenState {
  user: Nullable<ChatCognitoUser>;
}
type FormModel = Partial<typeof SignUpModel> & typeof PasswordRequiredModel; // NOTE: Partial just to complete blanks

// FIXME: why need to recast as from this.state?
class CompleteNewPasswordScreen extends Component<
  CompleteNewPasswordScreenProps,
  CompleteNewPasswordScreenState
> {
  public readonly state = {
    user: null,
  };

  public componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      user: navigation.getParam('unAuthUser') as ChatCognitoUser,
    });
  }

  public componentDidCatch(err: any, info: any) {
    console.log('componentDidCatch err', err);
    console.log('componentDidCatch info', info);
  }

  public render() {
    const { user } = this.state;
    if (!user || !(user as ChatCognitoUser).challengeParam) {
      return null;
    }
    const { challengeParam } = user;
    if (!(challengeParam as ChallengeParam).requiredAttributes) {
      return null;
    }

    const { requiredAttributes } = challengeParam;
    const showEmailField = includes(requiredAttributes, 'email');
    const showPhoneNumberField = includes(requiredAttributes, 'phone_number');
    const showGivenNameField = includes(requiredAttributes, 'given_name');
    const showFamilyNameField = includes(requiredAttributes, 'family_name');
    const showPasswordField = true; // always show

    const schemaFields: { [k: string]: Yup.StringSchema } = {};
    if (showEmailField) {
      schemaFields.email = emailRule.required();
    }

    if (showPhoneNumberField) {
      schemaFields.phoneNumber = phoneNumberRule.required();
    }

    if (showGivenNameField) {
      schemaFields.givenName = nameRule.label('Given name').required();
    }

    if (showFamilyNameField) {
      schemaFields.familyName = nameRule.label('Family name').required();
    }

    if (showPasswordField) {
      schemaFields.password = passwordRule.required();
    }

    const validationSchema = Yup.object().shape(schemaFields);
    return (
      <StyledScreenContainer>
        <Header
          title={'Welcome new user.'}
          message="Complete account registration."
        />
        <Formik<FormModel>
          initialValues={SignUpModel}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log('onSubmit values', values);
            console.log('onSubmit actions', actions);
            this.onPressSubmit(values, actions);
          }}
        >
          {fProps => {
            return (
              <StyledFormContainer>
                {showEmailField && (
                  <StyledFormRow>
                    <FormikInputInjector dataKey="email" formProps={fProps}>
                      <StyledTextInput as={EmailInput} />
                    </FormikInputInjector>
                  </StyledFormRow>
                )}

                {showPhoneNumberField && (
                  <StyledFormRow>
                    <FormikInputInjector
                      dataKey="phoneNumber"
                      formProps={fProps}
                    >
                      <StyledTextInput
                        placeholder="Mobile"
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                        textContentType="telephoneNumber"
                      />
                    </FormikInputInjector>
                  </StyledFormRow>
                )}

                {showGivenNameField && (
                  <StyledFormRow>
                    <FormikInputInjector dataKey="givenName" formProps={fProps}>
                      <StyledTextInput
                        placeholder="Given name"
                        textContentType="givenName"
                      />
                    </FormikInputInjector>
                  </StyledFormRow>
                )}

                {showFamilyNameField && (
                  <StyledFormRow>
                    <FormikInputInjector
                      dataKey="familyName"
                      formProps={fProps}
                    >
                      <StyledTextInput
                        placeholder="Family name"
                        textContentType="familyName"
                      />
                    </FormikInputInjector>
                  </StyledFormRow>
                )}

                {showPasswordField && (
                  <StyledFormRow>
                    <FormikInputInjector dataKey="password" formProps={fProps}>
                      <StyledTextInput
                        as={PasswordInput}
                        placeholder="New password"
                        onSubmitEditing={fProps.handleSubmit}
                      />
                    </FormikInputInjector>
                  </StyledFormRow>
                )}

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
  private onPressSubmit = async <T extends FormModel>(
    form: T,
    actions: FormikActions<T>,
  ) => {
    console.log('test', this.state);
    const { user } = this.state;
    console.log('test2', user);
    if (user) {
      try {
        Busy.start();
        await handleCompleteNewPassword(user, form);
        alertOk(() => NavigationService.navigate('App'));
      } catch (err) {
        actions.setFieldError('form', err.message);
        alertFail(() => null, err);
      } finally {
        actions.setSubmitting(false);
        Busy.stop();
      }
    }
  };
}

export { CompleteNewPasswordScreen };
