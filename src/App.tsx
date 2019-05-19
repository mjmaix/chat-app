import { StyleProvider } from 'native-base';
import React, { Component } from 'react';
import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/commonColor';
import { ThemeContextProvider } from './core/themes';
import { AppRoutes } from './routes/';
import NavigationService from './routes/NavigationService';

export default class App extends Component<{}> {
  public render() {
    return (
      <ThemeContextProvider>
        <StyleProvider style={getTheme(commonColor)}>
          <AppRoutes
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </StyleProvider>
      </ThemeContextProvider>
    );
  }
}
