import React from 'react';
import { createStackNavigator, StackNavigatorConfig } from 'react-navigation';
import { FixedBackHeader } from '../../components/Header/FixedBackHeader';
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
    SignUp: {
      screen: Mappings.SignUp.screen,
      navigationOptions: {
        header: <FixedBackHeader />,
      },
    },
    Forgot: {
      screen: Mappings.Forgot.screen,
      navigationOptions: {
        header: <FixedBackHeader />,
      },
    },
    Challenge: {
      screen: Mappings.Confirm.screen,
      navigationOptions: {
        header: <FixedBackHeader />,
      },
    },
    Reset: {
      screen: Mappings.Reset.screen,
      navigationOptions: {
        header: <FixedBackHeader />,
      },
    },
  },
  options,
);

export default AuthStack;
