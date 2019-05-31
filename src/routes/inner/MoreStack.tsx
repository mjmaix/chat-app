import React from 'react';
import { createStackNavigator, NavigationScreenProps } from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';
import { HeaderIcon } from '../../components';
import { NavigationService } from '../../utils';
import { updateStatusBarStyle } from '../../utils/StatusBarService';
import { Mappings } from '../mappings';

const MoreStack = createStackNavigator(
  {
    Profile: {
      screen: Mappings.Profile.screen,
      navigationOptions: ({ screenProps }: NavigationScreenProps) => {
        const { theme } = screenProps as ThemedComponentProps;
        return {
          title: 'Profile',
          headerRight: (
            <HeaderIcon
              icon={{
                ...Mappings.Settings.icon,
                iconStyle: { color: theme.colors.primary },
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
    Change: {
      screen: Mappings.Change.screen,
      navigationOptions: () => ({
        title: 'Change password',
      }),
    },
    VerifyEmail: {
      screen: Mappings.VerifyEmail.screen,
      navigationOptions: () => ({
        title: 'Verify email',
      }),
    },
  },
  {
    defaultNavigationOptions: ({
      screenProps,
      navigation,
    }: NavigationScreenProps) => {
      const { theme } = screenProps as ThemedComponentProps;
      navigation.addListener('didFocus', () => {
        updateStatusBarStyle();
      });
      return {
        headerTintColor: theme.colors.primary,
      };
    },
  },
);

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
