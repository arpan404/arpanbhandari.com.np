import { addCookie, getCookie } from './cookie';
import { Theme } from './types';

/**
 *
 * @returns value in 'theme' cookie [ default = 'system']
 */
export function getCurrentTheme() {
  const theme = getCookie('theme');
  if (theme === 'light' || theme === 'dark') {
    return theme;
  }
  return 'system';
}

/**
 *
 * @param theme
 * Set 'dark' or 'light' to html class according to theme passed. Also sets 'data-theme' to the actual theme passed.
 */
export function updateTheme(theme: Theme) {
  let newTheme = theme === 'system' ? '' : theme;
  if (theme === 'system') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.matches) {
      newTheme = 'dark';
    } else {
      newTheme = 'light';
    }
  }
  document.documentElement.classList.remove('dark', 'light');
  document.documentElement.classList.add(newTheme);
  document.documentElement.setAttribute('data-theme', theme);

  addCookie('theme', theme);
}
