import { useColorScheme } from 'react-native';

const lightPalette = {
  panache: '#eaf6eb',
  surfCrest: '#c7e5c8',
  mossGreen: '#a4d5a6',
  deYork: '#80c684',
  fruitSalad: '#4cae4f',
  warmGray: '#d9d9d9',
  darkGray: '#5e5e5e',
  mediumCoolGray: '#b0b0b0',
  lightNeutralGray: '#f2f2f2'
} as const;

const darkPalette = {
  lightAccent: '#3d8f3d',
  softGray: '#424242',
  mutedGreen: '#2a4032',
  accentGreen: '#4cae4f',
  lightText: '#e0e0e0',
  darkBackground: '#1e1e1e'
} as const;

export const appColors = {
  light: {
    background: lightPalette.lightNeutralGray,
    surface: lightPalette.panache,
    surfaceAlt: lightPalette.surfCrest,
    border: lightPalette.warmGray,
    text: lightPalette.darkGray,
    textMuted: lightPalette.mediumCoolGray,
    primary: lightPalette.fruitSalad,
    secondary: lightPalette.deYork,
    success: lightPalette.fruitSalad,
    warning: lightPalette.deYork,
    critical: lightPalette.darkGray,
    onPrimary: lightPalette.lightNeutralGray
  },
  dark: {
    background: darkPalette.darkBackground,
    surface: darkPalette.mutedGreen,
    surfaceAlt: darkPalette.softGray,
    border: darkPalette.softGray,
    text: darkPalette.lightText,
    textMuted: lightPalette.mediumCoolGray,
    primary: darkPalette.accentGreen,
    secondary: darkPalette.lightAccent,
    success: darkPalette.accentGreen,
    warning: darkPalette.lightAccent,
    critical: darkPalette.lightText,
    onPrimary: darkPalette.lightText
  }
} as const;

export type AppThemeColors = (typeof appColors)['light'] | (typeof appColors)['dark'];

export const useThemeColors = (): AppThemeColors => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? appColors.dark : appColors.light;
};
