import React from 'react';
import { NavigationScreenProps, createStackNavigator } from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';

import { HeaderIcon } from '../../components';
import { updateStatusBarStyle } from '../../utils/StatusBarService';
import { Mappings, StackRouteConfigMap } from '../mappings';

const routeConfigMap: StackRouteConfigMap = {
  Contacts: {
    screen: Mappings.Contacts.screen,
    navigationOptions: ({ navigation, screenProps }: NavigationScreenProps) => {
      return {
        title: 'Contacts',
      };
    },
  },
  Chat: {
    screen: Mappings.Chat.screen,
    navigationOptions: ({ navigation }: NavigationScreenProps) => ({
      title: 'Chat',
    }),
  },
};
const MessageStack = createStackNavigator(routeConfigMap, {
  initialRouteName: 'Contacts',
  defaultNavigationOptions: ({
    screenProps,
    navigation,
  }: NavigationScreenProps) => {
    const { theme } = screenProps as ThemedComponentProps;
    const headerColor = theme.colors.primary;

    navigation.addListener('didFocus', () => {
      updateStatusBarStyle(headerColor);
    });
    return {
      headerTintColor: theme.colors.primarytext,
      headerStyle: { backgroundColor: headerColor },
    };
  },
});

MessageStack.navigationOptions = ({ navigation }: NavigationScreenProps) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default MessageStack;
