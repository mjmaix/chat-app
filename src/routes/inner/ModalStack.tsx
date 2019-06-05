import React from 'react';
import { StackNavigatorConfig, createStackNavigator } from 'react-navigation';

import { FixedBackHeader } from '../../components';
import { Mappings, StackRouteConfigMap } from '../mappings';

const options: StackNavigatorConfig = {
  headerMode: 'screen',
  mode: 'modal',
  initialRouteName: 'MfaTotp',
};

const routeConfigMap: StackRouteConfigMap = {
  MfaTotp: {
    screen: Mappings.MfaTotp.screen,
    navigationOptions: () => ({
      title: 'Complete TOTP setup',
      header: (
        <FixedBackHeader
          confirm
          iconProps={{ name: 'close', type: 'antdesign' }}
        />
      ),
    }),
  },
  MfaSms: {
    screen: Mappings.MfaSms.screen,
    navigationOptions: () => ({
      title: 'Complete SMS setup',
      header: (
        <FixedBackHeader
          confirm
          iconProps={{ name: 'close', type: 'antdesign' }}
        />
      ),
    }),
  },
};

const MfaStack = createStackNavigator(routeConfigMap, options);

export default MfaStack;
