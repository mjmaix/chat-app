import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar } from 'react-native';
import { StyledScreenContainer } from '../styled';
import { NavigationService } from '../utils';

class AuthLoadingScreen extends React.Component<{}> {
  public async componentDidMount() {
    const userToken = await AsyncStorage.getItem('userToken');
    NavigationService.navigate(userToken ? 'App' : 'Auth');
  }
  public render() {
    return (
      <StyledScreenContainer>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </StyledScreenContainer>
    );
  }
}

export { AuthLoadingScreen };
