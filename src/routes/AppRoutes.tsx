import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  StackNavigatorConfig,
} from 'react-navigation';
import { AuthLoadingScreen, BusyOverlayScreen } from '../screens';
import AuthStack from './inner/AuthStack';
import TabBarStack from './inner/TabBarStack';
import { Mappings } from './mappings';
import { FixedBackHeader } from '../components';
import React from 'react';
import { Easing, Animated } from 'react-native';
import { Transitions } from '../components/Navigation/Transitions';

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
