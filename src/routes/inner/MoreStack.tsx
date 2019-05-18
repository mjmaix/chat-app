import React from 'react';
import { createStackNavigator, NavigationScreenProps } from 'react-navigation';
import { ButtonIcon } from '../../components/Icons/ButtonIcon';
import { Mappings } from '../mappings';
import NavigationService from '../NavigationService';

const MoreStack = createStackNavigator({
  Profile: {
    screen: Mappings.Profile.screen,
    navigationOptions: ({ navigation }: NavigationScreenProps) => ({
      title: 'Profile',
      headerRight: (
        <ButtonIcon
          icon={Mappings.Settings.icon}
          onPress={() => NavigationService.navigate('Settings')}
        />
      ),
    }),
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
