'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';
export const themes: Record<Theme, Theme> = {
  dark: 'dark',
  light: 'light',
};
type ThemeContextType = {
  theme: Theme;
  toggleTheme: (theme: Theme) => void;
};

const localStorageThemeKey = 'theme';
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = (newTheme: Theme) => {
    if (newTheme === theme) return;
    localStorage.setItem(localStorageThemeKey, newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const defaultTheme = localStorage.getItem(localStorageThemeKey) as Theme;
    if (defaultTheme) {
      setTheme(defaultTheme);
      document.documentElement.classList.add(defaultTheme);
    }
  }, []);

  const value: ThemeContextType = {
    theme,
    toggleTheme,
  };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used withing a Themeprovider');
  }
  return context;
};
