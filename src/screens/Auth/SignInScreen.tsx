import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import { View } from 'native-base';
import React, { Component } from 'react';
import { Alert, Keyboard } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { FormButton, FormTextInput } from '../../components/Forms/';
import { ThemeProps, withTheme } from '../../core/themes';
import NavigationService from '../../routes/NavigationService';
import { styles } from './styles';

type Props = NavigationScreenProps & ThemeProps;
interface SignInForm {
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
          onSubmit={(values, actions) => {
            console.log('formik.values', values);
            console.log('formik.actions', actions);
            Alert.alert('submit');
            this.onPressSignIn(values);
          }}
        >
          {props => (
            <View style={styles.form}>
              <View style={styles.formItem}>
                <FormTextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                />
              </View>
              <View style={styles.formItem}>
                <FormTextInput
                  placeholder="Password"
                  secureTextEntry
                  textContentType="password"
                  clearTextOnFocus
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  value={props.values.password}
                />
              </View>
              <View style={styles.formItem}>
                <FormButton
                  onPress={props.handleSubmit}
                  label={'Sign in'}
                  block
                  rounded
                />
              </View>
            </View>
          )}
        </Formik>
        <View style={styles.form}>
          <View style={styles.formItem}>
            <FormButton
              onPress={this.onPressSignUp}
              label={'Sign up'}
              block
              rounded
              light
            />
          </View>
          <View style={styles.form}>
            <View style={styles.formItem}>
              <FormButton
                onPress={this.onPressForgotPassword}
                label={'Forgot password?'}
                transparent
                block
                info
              />
            </View>
            <View style={styles.formItem}>
              <FormButton
                onPress={this.onPressConfirmCode}
                label={'Confirm code'}
                transparent
                block
                info
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  private onSubmitEmail = () => Keyboard.dismiss();

  private onPressSignIn = async (form: SignInForm) => {
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
