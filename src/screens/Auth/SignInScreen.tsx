import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import * as Yup from 'yup';
import { FormButton, FriendlyFormInput } from '../../components/Forms/';
import { ThemeProps, withTheme } from '../../core/themes';
import NavigationService from '../../routes/NavigationService';
import { styles } from './styles';

const SignInSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

type Props = NavigationScreenProps & ThemeProps;
interface SignInModel {
  email: string;
  password: string;
}

class SignInScreen extends Component<Props> {
  public render() {
    const { theme } = this.props;
    return (
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
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
              <View style={styles.form}>
                <View style={styles.formItem}>
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
                </View>
                <View style={styles.formItem}>
                  <FriendlyFormInput<SignInModel>
                    dataKey="password"
                    formProps={fProps}
                    inputProps={{
                      secureTextEntry: true,
                      clearTextOnFocus: true,
                      placeholder: 'Password',
                      textContentType: 'password',
                    }}
                  />
                </View>
                <View style={styles.formItem}>
                  <FormButton onPress={fProps.handleSubmit} label={'Sign in'} />
                </View>
              </View>
            );
          }}
        </Formik>
        <View style={styles.form}>
          <View style={styles.formItem}>
            <FormButton
              onPress={this.onPressSignUp}
              label={'Sign up'}
              type="outline"
            />
          </View>
          <View style={styles.formItem}>
            <FormButton
              onPress={this.onPressForgotPassword}
              label={'Forgot password?'}
              type="clear"
            />
          </View>
          <View style={styles.formItem}>
            <FormButton
              onPress={this.onPressConfirmCode}
              label={'Confirm code'}
              type="clear"
            />
          </View>
        </View>
      </View>
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

export default withTheme(SignInScreen);
