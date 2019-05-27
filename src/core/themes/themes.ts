import { Color } from 'csstype';
import { Platform } from 'react-native';
import { colors } from 'react-native-elements';
import { ThemeName } from '.';

export interface Theme {
  id: ThemeName;
  colors: {
    bgColor: Color;
    primary: Color;
    secondary: Color;
  };
}

export interface StyledComponent {
  theme: Theme;
}

export type ThemeName =
  | 'DEFAULT'
  | 'BLACK & WHITE'
  | 'MIDNIGHT BLUE'
  | 'MEDIUM AQUAMARINE'
  | 'MISTY ROSE'
  | 'GOLD';

export const themes: Theme[] = [
  {
    id: 'DEFAULT',
    colors: {
      ...Platform.select({
        default: colors.platform.android,
        ios: colors.platform.ios,
      }),
      bgColor: 'white',
    },
  },
  {
    id: 'BLACK & WHITE',
    colors: {
      primary: 'black',
      bgColor: 'white',
      secondary: 'rgba(0,0,0,0.5)',
    },
  },
  {
    id: 'MIDNIGHT BLUE',
    colors: {
      bgColor: 'midnightblue',
      primary: 'white',
      secondary: 'honeydew',
    },
  },
  {
    id: 'MEDIUM AQUAMARINE',
    colors: {
      bgColor: 'white',
      primary: 'mediumaquamarine',
      secondary: 'indigo',
    },
  },
  {
    id: 'MISTY ROSE',
    colors: {
      bgColor: 'slateblue',
      primary: 'mistyrose',
      secondary: 'black',
    },
  },
  {
    id: 'GOLD',
    colors: {
      bgColor: 'ghostwhite',
      primary: 'gold',
      secondary: 'black',
    },
  },
];
