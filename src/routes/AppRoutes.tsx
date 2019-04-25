import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { IconObject } from '../components/icons';
import IconWithBadge from '../components/icons/IconWithBadge';
import { Mappings } from './mappings';
import MessageStack from './MessageStack';
import MoreStack from './MoreStack';

const NavBar = createBottomTabNavigator(
  {
    MessageStack: {
      screen: MessageStack,
    },
    MoreStack: {
      screen: MoreStack,
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        const iconDefault: IconObject = {
          name: 'help',
          type: 'Entypo',
        };

        return (
          <IconWithBadge
            icon={Mappings[routeName] ? Mappings[routeName].icon : iconDefault}
            color={tintColor || ''}
            badgeCount={0}
          />
        );
      },
    }),
    tabBarOptions: {
      showLabel: false,
    },
  },
);

export default createAppContainer(NavBar);
