import { View } from 'native-base';
import React, { Component } from 'react';
import { Alert, Platform } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { FormButton, FormTextInput } from '../../components/Forms/';
import { Header } from '../../components/Header';
import { ThemeProps, withTheme } from '../../core/themes';
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
            <FormTextInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
            />
          </View>
          <View style={styles.formItem}>
            <FormTextInput
              placeholder="Mobile"
              keyboardType="phone-pad"
              autoCapitalize="none"
              textContentType="telephoneNumber"
            />
          </View>
          <View style={styles.formItem}>
            <FormTextInput
              placeholder="Password"
              keyboardType={
                Platform.OS === 'android' ? 'visible-password' : undefined
              }
              secureTextEntry
              textContentType="password"
            />
          </View>
          <View style={styles.formItem}>
            <FormButton
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
