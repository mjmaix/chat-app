import './setup';

import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeProvider as RneThemeProvider } from 'react-native-elements';
import { ThemeProvider as ScThemeProvider } from 'styled-components';

import { STORAGE_KEY, Theme, ThemeHelper, ThemeName, logError } from './core';
import { AppRoutes } from './routes';
import { NavigationService } from './utils';

interface AppState {
  theme: Nullable<Theme>;
  isThemeReady: boolean;
}

export default class App extends Component<{}, AppState> {
  public readonly state = {
    theme: ThemeHelper.get(),
    isThemeReady: false,
  };

  public componentWillMount() {
    ThemeHelper.addListener(theme => this.setState({ theme }));
  }

  public async componentDidMount() {
    this.loadTheme();
  }

  public componentWillUnmount() {
    ThemeHelper.removeAllListeners();
  }

  public render() {
    const { isThemeReady } = this.state;
    if (!isThemeReady) {
      return <ActivityIndicator />;
    }
    const { theme } = this.state;
    return (
      <ScThemeProvider theme={theme}>
        <RneThemeProvider theme={theme}>
          <AppRoutes
            screenProps={{
              theme: this.state.theme,
            }}
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </RneThemeProvider>
      </ScThemeProvider>
    );
  }

  private async loadTheme() {
    try {
      const themeId = (await AsyncStorage.getItem(STORAGE_KEY)) as ThemeName;
      if (themeId) {
        ThemeHelper.set(themeId);
        this.setState({ isThemeReady: true, theme: ThemeHelper.get() });
      }
    } catch (err) {
      logError(err);
    } finally {
      this.setState({ isThemeReady: true });
    }
  }
}
