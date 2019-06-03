import React from 'react';
import { StackNavigatorConfig, createStackNavigator } from 'react-navigation';

import { FixedBackHeader } from '../../components';
import { Mappings } from '../mappings';

const options: StackNavigatorConfig = {
  headerMode: 'screen',
  mode: 'modal',
  initialRouteName: 'SignInChoices',
};

const AuthStack = createStackNavigator(
  {
    SignInChoices: {
      screen: Mappings.SignInChoices.screen,
      navigationOptions: {
        header: null,
      },
    },
    SignInEmail: {
      screen: Mappings.SignInEmail.screen,
      navigationOptions: {
        header: (
          <FixedBackHeader iconProps={{ name: 'close', type: 'antdesign' }} />
        ),
      },
    },
    SignUp: {
      screen: Mappings.SignUp.screen,
      navigationOptions: {
        header: (
          <FixedBackHeader iconProps={{ name: 'close', type: 'antdesign' }} />
        ),
      },
    },
    Forgot: {
      screen: Mappings.Forgot.screen,
      navigationOptions: {
        header: (
          <FixedBackHeader iconProps={{ name: 'close', type: 'antdesign' }} />
        ),
      },
    },
    Resend: {
      screen: Mappings.Resend.screen,
      navigationOptions: {
        header: (
          <FixedBackHeader iconProps={{ name: 'close', type: 'antdesign' }} />
        ),
      },
    },
    Challenge: {
      screen: Mappings.Confirm.screen,
      navigationOptions: {
        header: (
          <FixedBackHeader iconProps={{ name: 'close', type: 'antdesign' }} />
        ),
      },
    },
    Reset: {
      screen: Mappings.Reset.screen,
      navigationOptions: {
        header: (
          <FixedBackHeader iconProps={{ name: 'close', type: 'antdesign' }} />
        ),
      },
    },
  },
  options,
);

export default AuthStack;
