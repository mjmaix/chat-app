import React from 'react';
import { themes } from './themes';

export interface Theme {
  key: string;
  backgroundColor: string;
  color: string;
}

export const theme: Theme = themes[1];

export interface ThemeContextProps {
  setThemeID: React.Dispatch<React.SetStateAction<string>>;
  themeID: string;
}

export const STORAGE_KEY = 'THEME_ID';

const initialState = {
  themeID: themes[0].key,
  setThemeID: () => null,
};

export const ThemeContext = React.createContext<ThemeContextProps>(
  initialState,
);
