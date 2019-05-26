import { Platform } from 'react-native';
import { Colors, colors } from 'react-native-elements';
import { ThemeName } from '.';

export interface Theme {
  id: ThemeName;
  colors: {
    bgColor: string;
  } & Partial<Colors>;
}

export interface StyledComponent {
  theme: Theme;
}

export type ThemeName =
  | 'DEFAULT'
  | 'JUST WHITE'
  | 'MAASTRICHT BLUE'
  | 'MAXIMUM BLUE GREEN'
  | 'ROSE MADDER'
  | 'BRIGHT YELLOW (CRAYOLA)';

export const themes: Theme[] = [
  {
    id: 'DEFAULT',
    colors: {
      ...Platform.select({
        default: colors.platform.android,
        ios: colors.platform.ios,
      }),
      bgColor: '#fff',
    },
  },
  {
    id: 'JUST WHITE',
    colors: {
      primary: '#000000',
      bgColor: '#fff',
    },
  },
  {
    id: 'MAASTRICHT BLUE',
    colors: {
      bgColor: '#011627',
      primary: '#ffffff',
    },
  },
  {
    id: 'MAXIMUM BLUE GREEN',
    colors: {
      bgColor: '#2EC4B6',
      primary: '#ffffff',
    },
  },
  {
    id: 'ROSE MADDER',
    colors: {
      bgColor: '#E71D36',
      primary: '#ffffff',
    },
  },
  {
    id: 'BRIGHT YELLOW (CRAYOLA)',
    colors: {
      bgColor: '#FF9F1C',
      primary: '#1F2D3D',
    },
  },
];
