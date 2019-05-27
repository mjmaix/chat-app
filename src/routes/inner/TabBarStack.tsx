import React from 'react';
import {
  BottomTabNavigatorConfig,
  createBottomTabNavigator,
} from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';
import { IconWithBadge } from '../../components';
import { Mappings } from '../mappings';
import MessageStack from './MessageStack';
import MoreStack from './MoreStack';

const navBarOptions: BottomTabNavigatorConfig = {
  defaultNavigationOptions: ({ navigation, screenProps }) => {
    const { theme } = screenProps as ThemedComponentProps;
    return {
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;

        return (
          <IconWithBadge
            icon={Mappings[routeName].icon}
            color={tintColor || ''}
          />
        );
      },
      tabBarOptions: {
        showLabel: false,
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.secondary,
      },
    };
  },
};

const NavBar = createBottomTabNavigator(
  {
    MessageStack: {
      screen: MessageStack,
    },
    MoreStack: {
      screen: MoreStack,
    },
  },
  navBarOptions,
);

export default NavBar;
