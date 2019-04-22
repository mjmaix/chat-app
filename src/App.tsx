import React, { Component } from 'react';
import { NativeRouter } from 'react-router-native';
import { ThemeContextProvider } from './core/ThemeProviderHoc';
import { TabbedContainer } from './hocs';

export default class App extends Component<{}> {
  public render() {
    return (
      <ThemeContextProvider>
        <NativeRouter>
          <TabbedContainer
            tabs={[
              {
                iconName: 'home',
                badgeText: '2',
                labelText: 'Home',
                active: true,
                route: 'home'
              },
              {
                iconName: 'settings',
                labelText: 'Settings',
                route: 'settings'
              },
              {
                iconName: 'information-circle-outline',
                labelText: 'About',
                route: 'about'
              }
            ]}
          />
        </NativeRouter>
      </ThemeContextProvider>
    );
  }
}
