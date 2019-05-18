import { Text, View } from 'native-base';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { FormButton, FormTextInput } from '../../components/Forms';
import { Header } from '../../components/Header';
import { ThemeProps, withTheme } from '../../core/themes';
import { styles } from './styles';

interface ChallengeScreen {
  title: string;
  message?: string;
  placeholder: string;
}
type Props = ChallengeScreen & NavigationScreenProps & ThemeProps;

class ChallengeScreen extends Component<Props> {
  public static defaultProps = {
    title: 'Challenge question',
    message: '',
    placeholder: 'answer',
  };

  public render() {
    const { theme } = this.props;

    return (
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <Header text={this.getDisplayText('title')} />
        <View style={styles.form}>
          <View style={styles.formItem}>
            <Text numberOfLines={3}>{this.getDisplayText('message')}</Text>
          </View>
          <View style={styles.formItem}>
            <FormTextInput placeholder={this.getDisplayText('placeholder')} />
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

  private getDisplayText = (key: keyof Props) => {
    const { navigation } = this.props;
    const defaultValue: string = this.props[key];
    return navigation.getParam(key) || defaultValue;
  };
}

export default withTheme(ChallengeScreen);
