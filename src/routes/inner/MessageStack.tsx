import React from 'react';
import { NavigationScreenProps, createStackNavigator } from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';

import { HeaderIcon } from '../../components';
import { updateStatusBarStyle } from '../../utils/StatusBarService';
import { Mappings } from '../mappings';

const MessageStack = createStackNavigator(
  {
    Messages: {
      screen: Mappings.Messages.screen,
      navigationOptions: ({
        navigation,
        screenProps,
      }: NavigationScreenProps) => {
        const { theme } = screenProps as ThemedComponentProps;
        return {
          title: 'Messages',
          headerRight: (
            <HeaderIcon
              icon={{
                ...Mappings.Contacts.icon,
                iconStyle: { color: theme.colors.primarydarktext },
              }}
              onPress={() => navigation.navigate('Contacts')}
            />
          ),
        };
      },
    },
    Contacts: {
      screen: Mappings.Contacts.screen,
      navigationOptions: ({ navigation }: NavigationScreenProps) => ({
        title: 'Contacts',
      }),
    },
    Chat: {
      screen: Mappings.Chat.screen,
      navigationOptions: ({ navigation }: NavigationScreenProps) => ({
        title: 'Chat',
      }),
    },
    Test: {
      screen: Mappings.Test.screen,
    },
  },
  {
    initialRouteName: 'Test',
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
  },
);

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
