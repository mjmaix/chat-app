import { ThemeHelper as Helper } from './ThemeHelper';
import { themes } from './themes';

export type Theme = typeof themes[0];
export * from './StyleGuide';
export * from './themes';
export const STORAGE_KEY = 'THEME_ID';
export const ThemeHelper = new Helper();
