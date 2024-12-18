import { addCookie, getCookie } from './cookie';
import { Theme } from './types';

export function getCurrentTheme() {
  const theme = getCookie('theme');
  if (theme === 'light' || theme === 'dark') {
    return theme;
  }
  return 'system';
}

export function setTheme(theme: Theme) {
  let newTheme = theme === 'system' ? '' : theme;
  if (theme === 'system') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.matches) {
      newTheme = 'dark';
    } else {
      newTheme = 'light';
    }
  }
  document.documentElement.setAttribute('class', newTheme);
  document.documentElement.setAttribute('data-theme', theme);
  addCookie('theme', theme);
}
