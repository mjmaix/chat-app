import React from 'react';
import { createStackNavigator, NavigationScreenProps } from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';
import { HeaderIcon } from '../../components';
import { NavigationService } from '../../utils';
import { Mappings } from '../mappings';

const MoreStack = createStackNavigator({
  Profile: {
    screen: Mappings.Profile.screen,
    navigationOptions: ({ screenProps }: NavigationScreenProps) => {
      const { theme } = screenProps as ThemedComponentProps;
      return {
        title: 'Profile',
        headerRight: (
          <HeaderIcon
            icon={{
              ...Mappings.Contacts.icon,
              iconStyle: { color: theme.colors.primarydarktext },
            }}
            onPress={() => NavigationService.navigate('Settings')}
          />
        ),
      };
    },
  },
  Settings: {
    screen: Mappings.Settings.screen,
    navigationOptions: () => ({
      title: 'Settings',
    }),
  },
});

MoreStack.navigationOptions = ({ navigation }: NavigationScreenProps) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default MoreStack;
