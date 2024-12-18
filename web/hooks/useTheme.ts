import { useEffect, useState } from 'react';
import { getCurrentTheme, updateTheme } from '@/lib/theme';
import { Theme as ThemeType } from '@/lib/types';

/**
 *
 * @returns currentTheme, changeTheme
 * currentTheme - returns the current theme ['dark' , 'system', 'light']
 * changeTheme - theme ['dark', 'system', or 'light'] must be passed
 *
 */
export default function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('system');

  useEffect(() => {
    const theme = getCurrentTheme();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setCurrentTheme(theme);
    updateTheme(theme);

    const handleDeviceThemeChange = () => {
      updateTheme(theme);
    };
    if (currentTheme === 'system') {
      mediaQuery.addEventListener('change', handleDeviceThemeChange);
    } else {
      mediaQuery.removeEventListener('change', handleDeviceThemeChange);
    }
    return () => {
      mediaQuery.removeEventListener('change', handleDeviceThemeChange);
    };
  }, [currentTheme]);

  const changeTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
    updateTheme(theme);
  };

  return { currentTheme, changeTheme };
}
