import { Formik } from 'formik';
import React, { Component } from 'react';
import { Image, ImageBackground } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import BannerImage from '../../../assets/icon_raw.jpg';
import { EmailInput, PasswordInput } from '../../components/Inputs';
import { SignInModel, SignInSchema, handleSignIn } from '../../core';
import { FormikInputInjector } from '../../hocs';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormOverImageContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';
import { Busy, NavigationService, alertFail } from '../../utils';

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
                      <FormikInputInjector dataKey="email" formProps={fProps}>
                        <StyledTextInput as={EmailInput} />
                      </FormikInputInjector>
                    </StyledFormRow>
                    <StyledFormRow>
                      <FormikInputInjector
                        dataKey="password"
                        formProps={fProps}
                      >
                        <StyledTextInput
                          as={PasswordInput}
                          onSubmitEditing={fProps.handleSubmit}
                        />
                      </FormikInputInjector>
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
            </StyledFormContainer>
          </StyledFormOverImageContainer>
        </StyledScreenContainer>
      </ImageBackground>
    );
  }

  private onPressSignIn = async <T extends FormModel>(form: T) => {
    try {
      Busy.start();
      await handleSignIn(form);
      NavigationService.navigate('App');
    } catch (err) {
      alertFail(() => null, err);
    } finally {
      Busy.stop();
    }
  };

  private onPressSignUp = () => {
    NavigationService.navigate('SignUp');
  };

  private onPressForgotPassword = () => {
    NavigationService.navigate('Forgot');
  };
}

export { SignInScreen };
