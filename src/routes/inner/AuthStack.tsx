import React from 'react';
import { createStackNavigator, StackNavigatorConfig } from 'react-navigation';
import { FixedBackHeader } from '../../components/header/FixedBackHeader';
import { Mappings } from '../mappings';

const options: StackNavigatorConfig = {
  headerMode: 'screen',
};

const AuthStack = createStackNavigator(
  {
    SignIn: {
      screen: Mappings.SignIn.screen,
      navigationOptions: {
        header: null,
      },
    },
    Forgot: {
      screen: Mappings.Forgot.screen,
      navigationOptions: {
        title: 'Forgot Password',
        header: <FixedBackHeader />,
      },
    },
    Confirm: {
      screen: Mappings.Confirm.screen,
      navigationOptions: {
        title: 'Confirmation',
        header: <FixedBackHeader />,
      },
    },
  },
  options,
);

export default AuthStack;
