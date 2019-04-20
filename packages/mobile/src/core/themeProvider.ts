import React from 'react';
import THEMES from './themes';

export interface Theme {
  key: string;
  backgroundColor: string;
  color: string;
}

export interface ThemeContextProps {
  setThemeID: React.Dispatch<React.SetStateAction<string>>;
  themeID: string;
}

export const theme: Theme = THEMES[1];

export const STORAGE_KEY = 'THEME_ID';

const initialState = {
  themeID: THEMES[0].key,
  setThemeID: () => null
};

export const ThemeContext = React.createContext<ThemeContextProps>(
  initialState
);
