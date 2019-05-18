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
              onPress={this.onPressForgotPassword}
              label={'Forgot password?'}
              transparent
              block
            />
          </View>
          <View style={styles.formItem}>
            <Button
              onPress={this.onPressConfirmCode}
              label={'Confirm code'}
              transparent
              block
            />
          </View>
        </View>
      </View>
    );
  }

  public onPressSignIn = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    NavigationService.navigate('App');
  };

  public onPressForgotPassword = async () => {
    NavigationService.navigate('Forgot');
  };

  public onPressConfirmCode = async () => {
    NavigationService.navigate('Confirm', {
      title: 'We\'ve sent you a verification code to your email',
      placeholder: 'Type here',
    });
  };

  public onSubmitPassword = () => {
    this.onPressSignIn();
    Keyboard.dismiss();
  };

  public onSubmitEmail = () => Keyboard.dismiss();
}

export default withTheme(SignInScreen);
