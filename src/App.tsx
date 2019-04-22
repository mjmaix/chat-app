import React, { Component } from 'react';
import AppRoutes from './AppRoutes';
import { ThemeContextProvider } from './core/ThemeProviderHoc';

export default class App extends Component<{}> {
  public render() {
    return (
      <ThemeContextProvider>
        <AppRoutes />
      </ThemeContextProvider>
    );
  }
}
