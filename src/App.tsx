import React, { Component } from 'react';
import AppRoutes from './AppRoutes';
import { ThemeContextProvider } from './core/themes';

export default class App extends Component<{}> {
  public render() {
    return (
      <ThemeContextProvider>
        <AppRoutes />
      </ThemeContextProvider>
    );
  }
}
