import { Text, View } from 'native-base';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ThemeProps, withTheme } from '../../core/themes';
import { Button } from './components/Button';
import { TextInput } from './components/TextInput';
import { styles } from './styles';

interface ChallengeScreen {
  title: string;
  placeholder: string;
}
type Props = ChallengeScreen & NavigationScreenProps & ThemeProps;

class ChallengeScreen extends Component<Props> {
  public static defaultProps = {
    title: 'Challenge question',
    placeholder: 'answer',
  };

  public render() {
    const { theme, navigation, placeholder, title } = this.props;
    return (
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <View style={styles.form}>
          <View style={styles.formItem}>
            <Text numberOfLines={3}>
              {navigation.getParam('title') || title}
            </Text>
          </View>
          <View style={styles.formItem}>
            <TextInput
              style={styles.input}
              placeholder={navigation.getParam('placeholder') || placeholder}
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

export default withTheme(ChallengeScreen);
