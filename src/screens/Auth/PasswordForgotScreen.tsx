import { View } from 'native-base';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { ThemeProps, withTheme } from '../../core/themes';
import NavigationService from '../../routes/NavigationService';
import { Button } from './components/Button';
import { Header } from './components/Header';
import { TextInput } from './components/TextInput';
import { styles } from './styles';
type Props = NavigationScreenProps & ThemeProps;

class PasswordForgotScreen extends Component<Props> {
  public render() {
    const { theme, navigation } = this.props;
    return (
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <Header
          text={'What is your email?'}
          message="We'll send a reset code."
        />
        <View style={styles.form}>
          <View style={styles.formItem}>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
            />
          </View>

          <View style={styles.formItem}>
            <Button
              onPress={this.onPressReset}
              label={'Reset'}
              block
              rounded
              light
            />
          </View>
        </View>
      </View>
    );
  }

  private onPressReset = () => {
    NavigationService.navigate('Reset');
  };
}

export default withTheme(PasswordForgotScreen);
