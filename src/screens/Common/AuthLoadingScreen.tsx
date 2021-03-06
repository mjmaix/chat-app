import { Auth } from 'aws-amplify';
import React from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';

import { logInfo } from '../../core';
import { StyledScreenContainer } from '../../styled';
import { NavigationService } from '../../utils';

class AuthLoadingScreen extends React.Component<{}> {
  public async componentDidMount() {
    try {
      const session = await Auth.currentUserPoolUser();
      NavigationService.navigate('App');
    } catch (err) {
      logInfo(err);
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
