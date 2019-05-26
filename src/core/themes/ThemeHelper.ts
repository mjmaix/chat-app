import { EventEmitter } from 'eventemitter3';
import _ from 'lodash';
import { info } from '../reports';
import { ThemeName, themes } from './themes';
type Theme = typeof themes[0];

type ThemeChangeEventListener = (data: Theme) => void;
export class ThemeHelper {
  private event = new EventEmitter();
  private themes = themes;
  private themeName: ThemeName;
  private theme: Theme;
  constructor(cb?: ThemeChangeEventListener) {
    this.themeName = 'DEFAULT';
    this.theme = this.getTheme(this.themeName);
    this.handleChange = cb || this.handleChange;
    this.event.addListener('change', this.handleChange);
  }

  public get() {
    if (!this.theme) {
      this.loadTheme();
    }
    return this.theme;
  }

  public set(themeName: ThemeName) {
    this.themeName = themeName;
    this.loadTheme();
  }

  public addListener(cb: ThemeChangeEventListener) {
    this.event.addListener('change', cb);
  }

  public removeAllListeners() {
    this.event.removeAllListeners();
  }

  private handleChange(data: Theme) {
    info(data);
  }

  private loadTheme() {
    this.theme = this.getTheme(this.themeName);
    this.event.emit('change', this.theme);
  }

  private getTheme = (key: ThemeName) => {
    const theme = _.find(this.themes, e => e.id === key);
    if (!theme) {
      throw new Error('Theme not found');
    }
    return theme;
  };
}
