import AsyncStorage from '@react-native-community/async-storage';
import { Input, View } from 'native-base';
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ThemeProps, withTheme } from '../../core/themes';
import NavigationService from '../../routes/NavigationService';
import { Button } from './components/Button';
import { TextInput } from './components/TextInput';
import { styles } from './styles';
type Props = NavigationScreenProps & ThemeProps;

class SignInScreen extends Component<Props> {
  private c?: Input;
  public render() {
    const { theme } = this.props;
    return (
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <View style={styles.form}>
          <View style={styles.formItem}>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
              onSubmitEditing={this.onSubmitEmail}
            />
          </View>
          <View style={styles.formItem}>
            <TextInput
              placeholder="Password"
              secureTextEntry
              textContentType="password"
              clearTextOnFocus
              returnKeyType="send"
              onSubmitEditing={this.onSubmitPassword}
            />
          </View>
          <View style={styles.formItem}>
            <Button
              onPress={this.onPressSignIn}
              label={'Sign in'}
              block
              rounded
            />
          </View>
          <View style={styles.formItem}>
            <Button
              onPress={this.onPressSignUp}
              label={'Sign up'}
              block
              rounded
              light
            />
          </View>
          <View style={styles.formItem}>
            <Button
              onPress={this.onPressForgotPassword}
              label={'Forgot password?'}
              transparent
              block
              info
            />
          </View>
          <View style={styles.formItem}>
            <Button
              onPress={this.onPressConfirmCode}
              label={'Confirm code'}
              transparent
              block
              info
            />
          </View>
        </View>
      </View>
    );
  }

  private onSubmitPassword = () => {
    this.onPressSignIn();
    Keyboard.dismiss();
  };

  private onSubmitEmail = () => Keyboard.dismiss();

  private onPressSignIn = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
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
