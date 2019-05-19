import { View } from 'native-base';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { FormButton, FormTextInput } from '../../components/Forms';
import { Header } from '../../components/Headers';
import { ThemeProps, withTheme } from '../../core/themes';
import { styles } from './styles';
type Props = NavigationScreenProps & ThemeProps;

class PasswordChangeScreen extends Component<Props> {
  public render() {
    const { theme, navigation } = this.props;
    return (
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <Header text={'Change password'} />
        <View style={styles.form}>
          <View style={styles.formItem}>
            <FormTextInput placeholder="Old password" secureTextEntry />
          </View>
          <View style={styles.formItem}>
            <FormTextInput placeholder="New password" secureTextEntry />
          </View>
          <View style={styles.formItem}>
            <FormTextInput placeholder="Confirm password" secureTextEntry />
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

export default withTheme(PasswordChangeScreen);
