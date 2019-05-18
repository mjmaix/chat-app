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
            <TextInput style={styles.input} placeholder="Code" />
          </View>
          <View style={styles.formItem}>
            <TextInput
              style={styles.input}
              placeholder="New password"
              secureTextEntry
              keyboardType={
                Platform.OS === 'android' ? 'visible-password' : undefined
              }
            />
          </View>
          <View style={styles.formItem}>
            <Button
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
