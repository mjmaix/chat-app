import React, { Component } from 'react';
import { ThemeContextProvider } from './core/themes';
import { AppRoutes } from './routes/';

export default class App extends Component<{}> {
  public render() {
    return (
      <ThemeContextProvider>
        <AppRoutes />
      </ThemeContextProvider>
    );
  }
}
