import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  NavigationScreenProps,
} from 'react-navigation';
import { IconObject } from './components/icons';
import { ButtonIcon } from './components/icons/ButtonIcon';
import IconWithBadge from './components/icons/IconWithBadge';
import { SearchBar } from './components/search-bar/SearchBar';
import DecisionsScreen from './screens/DecisionsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MyDigestsScreen from './screens/MyDigestsScreen';
import MyWorksScreen from './screens/MyWorksScreen';
import AboutScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

const More = createStackNavigator({
  Profile: {
    screen: AboutScreen,
    navigationOptions: ({ navigation }: NavigationScreenProps) => ({
      title: 'Profile',
      headerRight: (
        <ButtonIcon
          icon={{ type: 'AntDesign', name: 'setting' }}
          onPress={() => navigation.navigate('Settings')}
        />
      ),
    }),
  },
  Settings: {
    screen: SettingsScreen,
  },
});

const Mapping: {
  [routeName: string]: {
    icon: IconObject;
    comp: React.ReactNode;
  };
} = {
  Decisions: {
    comp: DecisionsScreen,
    icon: { name: 'balance-scale', type: 'FontAwesome' },
  },
  Favorites: {
    comp: FavoritesScreen,
    icon: { name: 'heart-outlined', type: 'Entypo' },
  },
  MyDigests: {
    comp: MyDigestsScreen,
    icon: { name: 'file-text-o', type: 'FontAwesome' },
  },
  MyWorks: { comp: MyWorksScreen, icon: { name: 'edit', type: 'FontAwesome' } },
  More: { comp: More, icon: { name: 'more-horiz', type: 'MaterialIcons' } },
};

const DecisionStack = createStackNavigator(
  {
    Decision: Mapping.Decisions.comp,
  },
  {
    defaultNavigationOptions: () => ({
      header: () => <SearchBar />,
    }),
  },
);

const NavBar = createBottomTabNavigator(
  {
    Decisions: DecisionStack,
    Favorites: Mapping.Favorites.comp,
    MyDigests: Mapping.MyDigests.comp,
    MyWorks: Mapping.MyWorks.comp,
    More: Mapping.More.comp,
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
            icon={Mapping[routeName].icon || iconDefault}
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
