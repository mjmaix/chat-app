import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { AuthLoadingScreen } from '../screens';
import AuthStack from './inner/AuthStack';
import TabBarStack from './inner/TabBarStack';

const SwitchNav = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: TabBarStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(SwitchNav);
