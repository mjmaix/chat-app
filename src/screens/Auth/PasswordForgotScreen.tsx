import React, { Component } from 'react';
import { View } from 'react-native';
import { withTheme } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { FormButton, FormTextInput } from '../../components/Forms';
import { Header } from '../../components/Headers';
import { ScreenThemeProps } from '../../core/themes';
import NavigationService from '../../routes/NavigationService';
import { styles } from './styles';
type Props = NavigationScreenProps & ScreenThemeProps;

class PasswordForgotScreen extends Component<Props> {
  public render() {
    const { theme, navigation } = this.props;
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.backgroundColor },
        ]}
      >
        <Header
          text={'What is your email?'}
          message="We'll send a reset code."
        />
        <View style={styles.form}>
          <View style={styles.formItem}>
            <FormTextInput
              inputProps={{
                placeholder: 'Email',
                keyboardType: 'email-address',
                autoCapitalize: 'none',
                textContentType: 'emailAddress',
              }}
            />
          </View>

          <View style={styles.formItem}>
            <FormButton onPress={this.onPressReset} label={'Reset'} />
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
