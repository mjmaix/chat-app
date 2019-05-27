import { Color } from 'csstype';
import { ThemeName } from '.';

export interface Theme {
  id: ThemeName;
  colors: {
    bgColor: Color;
    primary: Color;
    primarytext: Color;
    primarylight: Color;
    primarylighttext: Color;
    primarydark: Color;
    primarydarktext: Color;
    secondary: Color;
    secondarytext: Color;
    secondarylight: Color;
    secondarylighttext: Color;
    secondarydark: Color;
    secondarydarktext: Color;
  };
  activeTintColor: Color;
  inactiveTintColor: Color;
}

export type ThemeName =
  | 'DEFAULT'
  | 'PINK'
  | 'MIDNIGHT BLUE'
  | 'MEDIUM AQUAMARINE'
  | 'MISTY ROSE'
  | 'GOLD';

export const themes: Theme[] = [
  // {
  //   id: 'DEFAULT',
  //   colors: {
  //     ...Platform.select({
  //       default: colors.platform.android,
  //       ios: colors.platform.ios,
  //     }),
  //     bgColor: 'white',
  //   },
  //   activeTintColor: colors.primary,
  //   inactiveTintColor: colors.secondary,
  // },
  {
    id: 'DEFAULT',
    colors: {
      bgColor: 'white',
      primary: '#ec407a',
      primarytext: 'black',
      primarylight: '#ff77a9',
      primarylighttext: 'black',
      primarydark: '#b4004e',
      primarydarktext: 'white',

      secondary: '#455a64',
      secondarytext: 'white',
      secondarylight: '#718792',
      secondarylighttext: 'black',
      secondarydark: '#1c313a',
      secondarydarktext: 'white',
    },
    activeTintColor: '#ec407a',
    inactiveTintColor: '#455a64',
  },
  // {
  //   id: 'MIDNIGHT BLUE',
  //   colors: {
  //     bgColor: 'midnightblue',
  //     primary: 'white',
  //     secondary: 'honeydew',
  //   },
  //   activeTintColor: colors.primary,
  //   inactiveTintColor: colors.secondary,
  // },
  // {
  //   id: 'MEDIUM AQUAMARINE',
  //   colors: {
  //     bgColor: 'white',
  //     primary: 'mediumaquamarine',
  //     secondary: 'indigo',
  //   },
  //   activeTintColor: colors.primary,
  //   inactiveTintColor: colors.secondary,
  // },
  // {
  //   id: 'MISTY ROSE',
  //   colors: {
  //     bgColor: 'slateblue',
  //     primary: 'mistyrose',
  //     secondary: 'black',
  //   },
  //   activeTintColor: colors.primary,
  //   inactiveTintColor: colors.secondary,
  // },
  // {
  //   id: 'GOLD',
  //   colors: {
  //     bgColor: 'ghostwhite',
  //     primary: 'gold',
  //     secondary: 'black',
  //   },
  //   activeTintColor: colors.primary,
  //   inactiveTintColor: colors.secondary,
  // },
];
