import { cookies } from 'next/headers';
import { Theme } from '@/types/theme';

/**
 * Works on next server on initial page load
 * Fetches the theme from the cookie
 * @returns {Promise<Theme>}
 * */
const getTheme = async (): Promise<Theme> => {
  const cookieStore = await cookies();
  if (!cookieStore) {
    return 'system';
  }
  return (cookieStore.get('theme')?.value as unknown as Theme) || 'system';
};

export default getTheme;
