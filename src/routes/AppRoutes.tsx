import React from 'react';
import { Animated, Easing } from 'react-native';
import {
  StackNavigatorConfig,
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import { Transitions } from '../components/Navigation/Transitions';
import { AuthLoadingScreen } from '../screens';
import AuthStack from './inner/AuthStack';
import TabBarStack from './inner/TabBarStack';
import { Mappings } from './mappings';

const SwitchNav = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: TabBarStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const overlayOptions: StackNavigatorConfig = {
  headerMode: 'none',
  mode: 'modal',
  transparentCard: true,
  transitionConfig: Transitions.noAnimation,
};

const OverlayStack = createStackNavigator(
  {
    Main: { screen: SwitchNav },
    Busy: {
      screen: Mappings.Busy.screen,
      navigationOptions: {},
    },
  },
  overlayOptions,
);

export default createAppContainer(OverlayStack);
