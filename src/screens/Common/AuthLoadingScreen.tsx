import React from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { StyledScreenContainer } from '../../styled';
import { NavigationService, alertFail } from '../../utils';
import { Auth } from 'aws-amplify';
import { info } from '../../core';

class AuthLoadingScreen extends React.Component<{}> {
  public async componentDidMount() {
    try {
      await Auth.currentAuthenticatedUser();
      NavigationService.navigate('App');
    } catch (err) {
      info(err);
      NavigationService.navigate('Auth');
    }
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
