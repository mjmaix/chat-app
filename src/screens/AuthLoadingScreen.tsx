import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ThemeProps, withTheme } from '../core/themes';

type Props = ThemeProps & NavigationScreenProps;

class AuthLoadingScreen extends React.Component<Props> {
  public async componentDidMount() {
    const { navigation } = this.props;
    const userToken = await AsyncStorage.getItem('userToken');
    navigation.navigate(userToken ? 'App' : 'Auth');
  }

  public render() {
    const { theme } = this.props;
    return (
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
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
