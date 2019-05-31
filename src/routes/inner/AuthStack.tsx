import React from 'react';
import { createStackNavigator, StackNavigatorConfig } from 'react-navigation';
import { FixedBackHeader } from '../../components';
import { Mappings } from '../mappings';
import { Easing, Animated } from 'react-native';

const options: StackNavigatorConfig = {
  headerMode: 'screen',
  mode: 'modal',
};

const AuthStack = createStackNavigator(
  {
    SignIn: {
      screen: Mappings.SignIn.screen,
      navigationOptions: {
        header: null,
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
