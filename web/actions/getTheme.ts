import { Theme } from '@/lib/types';
import { cookies } from 'next/headers';

export default async function getTheme(): Promise<Theme> {
  const cookieStore = await cookies();
  if (!cookieStore) {
    return 'system';
  }
  return (cookieStore.get('theme')?.value as unknown as Theme) || 'system';
}
