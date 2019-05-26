import React from 'react';
import { createStackNavigator, NavigationScreenProps } from 'react-navigation';
import { HeaderIcon } from '../../components';
import { NavigationService } from '../../utils';
import { Mappings } from '../mappings';

const MoreStack = createStackNavigator({
  Profile: {
    screen: Mappings.Profile.screen,
    navigationOptions: ({ navigation }: NavigationScreenProps) => ({
      title: 'Profile',
      headerRight: (
        <HeaderIcon
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
