import { Theme } from '@/types/theme';
import { cookies } from 'next/headers';

const getTheme = async (): Promise<Theme> => {
  const cookieStore = await cookies();
  if (!cookieStore) {
    return 'system';
  }
  return (cookieStore.get('theme')?.value as unknown as Theme) || 'system';
};

export default getTheme;
