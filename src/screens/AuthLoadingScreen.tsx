import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { withTheme } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { ScreenThemeProps } from '../core/themes';
import NavigationService from '../routes/NavigationService';

type Props = ScreenThemeProps & NavigationScreenProps;

class AuthLoadingScreen extends React.Component<Props> {
  public async componentDidMount() {
    const userToken = await AsyncStorage.getItem('userToken');
    NavigationService.navigate(userToken ? 'App' : 'Auth');
  }

  public render() {
    const { theme } = this.props;
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.backgroundColor },
        ]}
      >
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withTheme(AuthLoadingScreen);
