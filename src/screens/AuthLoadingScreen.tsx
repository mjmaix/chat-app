import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar } from 'react-native';
import NavigationService from '../routes/NavigationService';
import { ScreenContainer } from '../styled';

class AuthLoadingScreen extends React.Component<{}> {
  public async componentDidMount() {
    const userToken = await AsyncStorage.getItem('userToken');
    NavigationService.navigate(userToken ? 'App' : 'Auth');
  }
  public render() {
    return (
      <ScreenContainer>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </ScreenContainer>
    );
  }
}

export default AuthLoadingScreen;
