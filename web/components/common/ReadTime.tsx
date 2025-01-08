'use client';

import { useMemo } from 'react';

import getReadingTime from '@/lib/writing';

export default function ReadTime({ html }: { html: string }) {
   const time = useMemo(() => {
      return getReadingTime(html);
   }, [html]);
   return (
      <span className="text-primary/70 font-medium text-sm block">
         {time} {time > 1 ? 'minutes' : 'minute'} read
      </span>
   );
}
