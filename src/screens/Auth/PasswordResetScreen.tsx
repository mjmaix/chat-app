import { View } from 'native-base';
import React, { Component } from 'react';
import { Alert, Platform } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { FormButton, FormTextInput } from '../../components/Forms';
import { Header } from '../../components/Header';
import { ThemeProps, withTheme } from '../../core/themes';
import { styles } from './styles';
type Props = NavigationScreenProps & ThemeProps;

class PasswordResetScreen extends Component<Props> {
  public render() {
    const { theme, navigation } = this.props;
    return (
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <Header text={'Change password'} message="Type in the reset code" />
        <View style={styles.form}>
          <View style={styles.formItem}>
            <FormTextInput placeholder="Code" />
          </View>
          <View style={styles.formItem}>
            <FormTextInput
              placeholder="New password"
              secureTextEntry
              keyboardType={
                Platform.OS === 'android' ? 'visible-password' : undefined
              }
            />
          </View>
          <View style={styles.formItem}>
            <FormButton
              onPress={() => Alert.alert('not yet implemented')}
              label={'Submit'}
              block
              rounded
            />
          </View>
        </View>
      </View>
    );
  }
}

export default withTheme(PasswordResetScreen);
