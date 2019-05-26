import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import * as Yup from 'yup';
import { FormButton, FriendlyFormInput } from '../../components';
import { FormContainer, FormRow, ScreenContainer } from '../../styled';
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
      <ScreenContainer>
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
              <FormContainer>
                <FormRow>
                  <FriendlyFormInput<SignInModel>
                    dataKey="email"
                    formProps={fProps}
                    inputProps={{
                      placeholder: 'Email',
                      keyboardType: 'email-address',
                      autoCapitalize: 'none',
                      textContentType: 'emailAddress',
                    }}
                  />
                </FormRow>
                <FormRow>
                  <FriendlyFormInput<SignInModel>
                    dataKey="password"
                    formProps={fProps}
                    inputProps={{
                      secureTextEntry: true,
                      clearTextOnFocus: true,
                      placeholder: 'Password',
                      textContentType: 'password',
                      onSubmitEditing: fProps.handleSubmit,
                    }}
                  />
                </FormRow>
                <FormRow>
                  <FormButton onPress={fProps.handleSubmit} label={'Sign in'} />
                </FormRow>
              </FormContainer>
            );
          }}
        </Formik>
        <FormContainer>
          <FormRow>
            <FormButton
              onPress={this.onPressSignUp}
              label={'Sign up'}
              type="outline"
            />
          </FormRow>
          <FormRow>
            <FormButton
              onPress={this.onPressForgotPassword}
              label={'Forgot password?'}
              type="clear"
            />
          </FormRow>
          <FormRow>
            <FormButton
              onPress={this.onPressConfirmCode}
              label={'Confirm code'}
              type="clear"
            />
          </FormRow>
        </FormContainer>
      </ScreenContainer>
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

