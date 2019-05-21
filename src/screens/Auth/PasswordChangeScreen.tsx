import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { FormButton, FormTextInput } from '../../components/Forms';
import { Header } from '../../components/Headers';
import { ScreenThemeProps } from '../../core/themes';
import { styles } from './styles';
type Props = NavigationScreenProps & ScreenThemeProps;

class PasswordChangeScreen extends Component<Props> {
  public render() {
    const { theme, navigation } = this.props;
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.backgroundColor },
        ]}
      >
        <Header text={'Change password'} />
        <View style={styles.form}>
          <View style={styles.formItem}>
            <FormTextInput
              inputProps={{
                placeholder: 'Old password',
                secureTextEntry: true,
              }}
            />
          </View>
          <View style={styles.formItem}>
            <FormTextInput
              inputProps={{
                placeholder: 'New password',
                secureTextEntry: true,
              }}
            />
          </View>
          <View style={styles.formItem}>
            <FormTextInput
              inputProps={{
                placeholder: 'Confirm password',
                secureTextEntry: true,
              }}
            />
          </View>
          <View style={styles.formItem}>
            <FormButton
              onPress={() => Alert.alert('not yet implemented')}
              label={'Change'}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default PasswordChangeScreen;
