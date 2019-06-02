import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeProvider as RneThemeProvider } from 'react-native-elements';
import { ThemeProvider as ScThemeProvider } from 'styled-components';
import { error, STORAGE_KEY, ThemeHelper, ThemeName, themes } from './core';
import { AppRoutes } from './routes';
import './setup';
import { NavigationService } from './utils';

type Theme = typeof themes[0];

export default class App extends Component<{}> {
  public readonly state = {
    theme: ThemeHelper.get(),
    isReady: undefined,
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
    if (!this.state.isReady) {
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
        this.setState({ isReady: true, theme: ThemeHelper.get() });
      }
    } catch (err) {
      error(err);
    } finally {
      this.setState({ isReady: true });
    }
  }
}
