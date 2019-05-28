import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import React, { Component } from 'react';
import { Alert, Image, ImageBackground } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import * as Yup from 'yup';
import BannerImage from '../../../assets/icon_raw.jpg';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormikInput,
  StyledFormOverImageContainer,
  StyledFormRow,
  StyledScreenContainer,
} from '../../styled';
import { NavigationService } from '../../utils';

type Props = NavigationScreenProps;
type Model = typeof formikInitialValues;

const SignInSchema = Yup.object().shape({
  password: Yup.string()
    .label('Password')
    .required(),
  email: Yup.string()
    .label('Email')
    .email()
    .required(),
});

const formikInitialValues = {
  email: '',
  password: '',
};

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
              initialValues={formikInitialValues}
              validationSchema={SignInSchema}
              onSubmit={(values, actions) => {
                Alert.alert('submit');
                this.onPressSignIn(values);
              }}
            >
              {fProps => {
                return (
                  <StyledFormContainer>
                    <StyledFormRow>
                      <StyledFormikInput
                        dataKey="email"
                        formProps={fProps}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        textContentType="emailAddress"
                      />
                    </StyledFormRow>
                    <StyledFormRow>
                      <StyledFormikInput
                        dataKey="password"
                        formProps={fProps}
                        secureTextEntry
                        clearTextOnFocus
                        placeholder="Password"
                        textContentType="password"
                        onSubmitEditing={fProps.handleSubmit}
                      />
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
            </StyledFormContainer>
          </StyledFormOverImageContainer>
        </StyledScreenContainer>
      </ImageBackground>
    );
  }

  private onPressSignIn = async (form: Model) => {
    await AsyncStorage.setItem('userToken', `${form.email}_${form.password}`);
    NavigationService.navigate('App');
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
      message: 'We\'ve sent a verification code to your email.',
      placeholder: 'Type here',
    });
  };
}

export { SignInScreen };
