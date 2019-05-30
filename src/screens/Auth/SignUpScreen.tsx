import { Formik } from 'formik';
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
import { NavigationService } from '../../utils';

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
          onSubmit={(values, actions) => {
            this.onPressSignUp(values);
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
              </StyledFormContainer>
            );
          }}
        </Formik>
      </StyledScreenContainer>
    );
  }

  private onPressSignUp = async (form: FormModel) => {
    try {
      await handleSignUp(form);

      Alert.alert('Success', undefined, [
        {
          text: 'OK',
          onPress: () => NavigationService.navigate('Confirm'),
        },
      ]);
    } catch (err) {
      error(err);
      Alert.alert('Oops, failed', JSON.stringify(err));
    }
  };
}

export { SignUpScreen };
