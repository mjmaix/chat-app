import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { report } from './core/errors/report';
import { STORAGE_KEY, Theme, ThemeName, themes } from './core/themes/';
import { AppRoutes } from './routes/';
import NavigationService from './routes/NavigationService';
import './setup';

type Theme = typeof themes[0];

export default class App extends Component<{}> {
  public readonly state = {
    theme: Theme,
    isReady: undefined,
  };

  public componentWillMount() {
    Theme.addListener(theme => this.setState({ theme }));
  }

  public async componentDidMount() {
    this.loadTheme();
  }

  public componentWillUnmount() {
    Theme.removeAllListeners();
  }

  public render() {
    if (!this.state.isReady) {
      return <ActivityIndicator />;
    }
    return (
      <ThemeProvider theme={this.state.theme}>
        <AppRoutes
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </ThemeProvider>
    );
  }

  private async loadTheme() {
    try {
      const themeId = (await AsyncStorage.getItem(STORAGE_KEY)) as ThemeName;
      Theme.set(themeId);
      this.setState({ isReady: true, theme: Theme.get() });
    } catch (err) {
      this.setState({ isReady: true });
      report(err);
    }
  }
}
