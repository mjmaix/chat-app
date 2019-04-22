import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import IconWithBadge, { IconTypes } from './components/icons/IconWithBadge';
import DecisionsScreen from './screens/DecisionsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MyDigestsScreen from './screens/MyDigestsScreen';
import MyWorksScreen from './screens/MyWorksScreen';
import AboutScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

interface Icon {
  name: string;
  type: IconTypes;
}

const More = createStackNavigator({
  Settings: {
    screen: SettingsScreen
  },
  Profile: {
    screen: AboutScreen
  }
});

const Mapping: {
  [routeName: string]: {
    icon: Icon;
    comp: React.ReactNode;
  };
} = {
  Decisions: {
    comp: DecisionsScreen,
    icon: { name: 'balance-scale', type: 'FontAwesome' }
  },
  Favorites: {
    comp: FavoritesScreen,
    icon: { name: 'heart-outlined', type: 'Entypo' }
  },
  MyDigests: {
    comp: MyDigestsScreen,
    icon: { name: 'file-text-o', type: 'FontAwesome' }
  },
  MyWorks: { comp: MyWorksScreen, icon: { name: 'edit', type: 'FontAwesome' } },
  More: { comp: More, icon: { name: 'more-horiz', type: 'MaterialIcons' } }
};

const NavBar = createBottomTabNavigator(
  {
    Decisions: Mapping.Decisions.comp,
    Favorites: Mapping.Favorites.comp,
    MyDigests: Mapping.MyDigests.comp,
    MyWorks: Mapping.MyWorks.comp,
    More: Mapping.More.comp
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        const iconDefault: Icon = {
          name: 'help',
          type: 'Entypo'
        };

        return (
          <IconWithBadge
            icon={Mapping[routeName].icon || iconDefault}
            color={tintColor || ''}
            badgeCount={0}
          />
        );
      }
    }),
    tabBarOptions: {
      showLabel: false
    }
  }
);

export default createAppContainer(NavBar);
