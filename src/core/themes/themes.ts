import _ from 'lodash';
import { Platform } from 'react-native';
import { Colors, colors, Theme, ThemeProps } from 'react-native-elements';
import { ThemeName } from '.';

export interface ExtendedFullTheme extends Theme {
  id: ThemeName;
  colors: {
    backgroundColor: string;
  } & Partial<Colors>;
}

export type ScreenThemeProps = ThemeProps<ExtendedFullTheme>;

export type ThemeName =
  | 'DEFAULT'
  | 'JUST WHITE'
  | 'MAASTRICHT BLUE'
  | 'MAXIMUM BLUE GREEN'
  | 'ROSE MADDER'
  | 'BRIGHT YELLOW (CRAYOLA)';

export const getTheme = (key: ThemeName) => _.find(themes, e => e.id === key);

export const themes: ExtendedFullTheme[] = [
  {
    id: 'DEFAULT',
    colors: {
      ...Platform.select({
        default: colors.platform.android,
        ios: colors.platform.ios,
      }),
      backgroundColor: '#fff',
    },
  },
  {
    id: 'JUST WHITE',
    colors: {
      primary: '#000000',
      backgroundColor: '#fffff',
    },
  },
  {
    id: 'MAASTRICHT BLUE',
    colors: {
      backgroundColor: '#011627',
      primary: '#ffffff',
    },
  },
  {
    id: 'MAXIMUM BLUE GREEN',
    colors: {
      backgroundColor: '#2EC4B6',
      primary: '#ffffff',
    },
  },
  {
    id: 'ROSE MADDER',
    colors: {
      backgroundColor: '#E71D36',
      primary: '#ffffff',
    },
  },
  {
    id: 'BRIGHT YELLOW (CRAYOLA)',
    colors: {
      backgroundColor: '#FF9F1C',
      primary: '#1F2D3D',
    },
  },
];
