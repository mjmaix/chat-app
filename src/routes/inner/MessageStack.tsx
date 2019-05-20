import React from 'react';
import { createStackNavigator, NavigationScreenProps } from 'react-navigation';
import { HeaderIcon } from '../../components/Icons/HeaderIcon';
import { Mappings } from '../mappings';

const MessageStack = createStackNavigator(
  {
    Messages: {
      screen: Mappings.Messages.screen,
      navigationOptions: ({ navigation }: NavigationScreenProps) => ({
        title: 'Messages',
        headerRight: (
          <HeaderIcon
            icon={Mappings.Contacts.icon}
            onPress={() => navigation.navigate('Contacts')}
          />
        ),
      }),
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
  {},
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
