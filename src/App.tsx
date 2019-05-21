import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { report } from './core/errors/report';
import { getTheme, STORAGE_KEY, ThemeName } from './core/themes';
import { AppRoutes } from './routes/';
import NavigationService from './routes/NavigationService';
import './setup';

export default class App extends Component<{}> {
  public readonly state = {
    theme: undefined,
    isReady: undefined,
  };

  public async componentDidMount() {
    this.loadTheme();
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
      const themeId = (await AsyncStorage.getItem(
        STORAGE_KEY,
      )) as ThemeName | null;
      if (themeId) {
        const myTheme = getTheme(themeId);
        this.setState({ isReady: true, theme: myTheme });
      } else {
        this.setState({ isReady: true });
      }
    } catch (err) {
      this.setState({ isReady: true });
      report(err);
    }
  }
}
