import { Formik } from 'formik';
import React, { Component } from 'react';
import { Alert, Image, ImageBackground } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import BannerImage from '../../../assets/icon_raw.jpg';
import { EmailInput, PasswordInput } from '../../components/Inputs';
import { SignInSchema, SignInModel, handleSignIn } from '../../core';
import { FormikInputWrapper } from '../../hocs';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormOverImageContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';
import { NavigationService, alertOk, alertFail } from '../../utils';

type Props = NavigationScreenProps;
type FormModel = typeof SignInModel;

class SignInScreen extends Component<Props> {
  public render() {
    return (
      <ImageBackground
        source={Image.resolveAssetSource(BannerImage)}
        resizeMode="stretch"
        style={{
          flex: 1,
        }}
      >
        <StyledScreenContainer>
          <StyledFormOverImageContainer>
            <Formik
              initialValues={SignInModel}
              validationSchema={SignInSchema}
              onSubmit={(values, actions) => {
                this.onPressSignIn(values);
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
                        label={'Sign in'}
                      />
                    </StyledFormRow>
                  </StyledFormContainer>
                );
              }}
            </Formik>
            <StyledFormContainer>
              <StyledFormRow>
                <StyledButton
                  onPress={this.onPressSignUp}
                  label={'Sign up'}
                  type="outline"
                />
              </StyledFormRow>
              <StyledFormRow>
                <StyledButton
                  onPress={this.onPressForgotPassword}
                  label={'Forgot password?'}
                  type="clear"
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
          </StyledFormOverImageContainer>
        </StyledScreenContainer>
      </ImageBackground>
    );
  }

  private onPressSignIn = async (form: FormModel) => {
    try {
      await handleSignIn(form);
      NavigationService.navigate('App');
    } catch (err) {
      alertFail(() => null, err);
    }
  };

  private onPressSignUp = async () => {
    NavigationService.navigate('SignUp');
  };

  private onPressForgotPassword = async () => {
    NavigationService.navigate('Forgot');
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

export { SignInScreen };
