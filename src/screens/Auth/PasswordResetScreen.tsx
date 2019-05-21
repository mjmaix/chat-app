import React, { Component } from 'react';
import { Alert, Platform, View } from 'react-native';
import { withTheme } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { FormButton, FormTextInput } from '../../components/Forms';
import { Header } from '../../components/Headers';
import { ScreenThemeProps } from '../../core/themes';
import { styles } from './styles';
type Props = NavigationScreenProps & ScreenThemeProps;

class PasswordResetScreen extends Component<Props> {
  public render() {
    const { theme, navigation } = this.props;
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.backgroundColor },
        ]}
      >
        <Header text={'Change password'} message="Type in the reset code" />
        <View style={styles.form}>
          <View style={styles.formItem}>
            <FormTextInput inputProps={{ placeholder: 'Code' }} />
          </View>
          <View style={styles.formItem}>
            <FormTextInput
              inputProps={{
                placeholder: 'New password',
                secureTextEntry: true,
                keyboardType:
                  Platform.OS === 'android' ? 'visible-password' : undefined,
              }}
            />
          </View>
          <View style={styles.formItem}>
            <FormButton
              onPress={() => Alert.alert('not yet implemented')}
              label={'Submit'}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default withTheme(PasswordResetScreen);
