import React, { Component } from 'react';
import { ThemeContextProvider } from './core/ThemeProviderHoc';
import Routes from './Routes';

export default class App extends Component<{}> {
  public render() {
    return (
      <ThemeContextProvider>
        <Routes />
      </ThemeContextProvider>
    );
  }
}
