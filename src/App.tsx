import React, { Component } from 'react';
import { ThemeContextProvider } from './core/themes';
import { AppRoutes } from './routes/';
import NavigationService from './routes/NavigationService';

export default class App extends Component<{}> {
  public render() {
    return (
      <ThemeContextProvider>
        <AppRoutes
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </ThemeContextProvider>
    );
  }
}
