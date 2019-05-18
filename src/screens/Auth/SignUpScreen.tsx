import { View } from 'native-base';
import React, { Component } from 'react';
import { Alert, Platform } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ThemeProps, withTheme } from '../../core/themes';
import { Button } from './components/Button';
import { Header } from './components/Header';
import { TextInput } from './components/TextInput';
import { styles } from './styles';
type Props = NavigationScreenProps & ThemeProps;

class SignUpScreen extends Component<Props> {
  public render() {
    const { theme, navigation } = this.props;
    return (
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <Header text={'Sign up'} message="Please fill up the details" />
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
            <TextInput
              placeholder="Mobile"
              keyboardType="phone-pad"
              autoCapitalize="none"
              textContentType="telephoneNumber"
            />
          </View>
          <View style={styles.formItem}>
            <TextInput
              placeholder="Password"
              keyboardType={
                Platform.OS === 'android' ? 'visible-password' : undefined
              }
              secureTextEntry
              textContentType="password"
            />
          </View>
          <View style={styles.formItem}>
            <Button
              onPress={() => Alert.alert('not yet implemented')}
              label={'Change'}
              block
              rounded
            />
          </View>
        </View>
      </View>
    );
  }
}

export default withTheme(SignUpScreen);
