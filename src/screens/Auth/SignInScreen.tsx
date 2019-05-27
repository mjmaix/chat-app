import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import * as Yup from 'yup';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormikInput,
  StyledFormRow,
  StyledScreenContainer,
} from '../../styled';
import { NavigationService } from '../../utils';

const SignInSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

type Props = NavigationScreenProps;
interface SignInModel {
  email: string;
  password: string;
}

class SignInScreen extends Component<Props> {
  public render() {
    return (
      <StyledScreenContainer>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
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
      </StyledScreenContainer>
    );
  }

  private onPressSignIn = async (form: SignInModel) => {
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
