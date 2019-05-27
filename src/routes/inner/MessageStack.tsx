import React from 'react';
import { createStackNavigator, NavigationScreenProps } from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';
import { HeaderIcon } from '../../components';
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
      navigationOptions: () => ({
        title: 'Chat',
      }),
    },
  },
  {
    defaultNavigationOptions: ({
      navigation,
      screenProps,
    }: NavigationScreenProps) => {
      const { theme } = screenProps as ThemedComponentProps;
      return {
        headerTintColor: theme.colors.primarydarktext,
        headerStyle: { backgroundColor: theme.colors.primarydark },
      };
    },

    // navigationOptions: ({ navigation }) => ({ header: StyledHeader }),
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
