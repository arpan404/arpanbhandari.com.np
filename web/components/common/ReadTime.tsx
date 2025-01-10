'use client';

import { useState, useEffect } from 'react';

export default function ReadTime({ html }: { html: string }) {
   const [time, setTime] = useState<number | null>(null);

   useEffect(() => {
      async function calculateTime() {
         const { default: getReadingTime } = await import('@/lib/writing');
         setTime(getReadingTime(html));
      }
      calculateTime();
   }, [html]);

   return (
      <span className="text-primary/70 font-medium text-sm block">
         {time !== null ? (
            <>
               {time} {time > 1 ? 'minutes' : 'minute'} read
            </>
         ) : (
            '0 minute read'
         )}
      </span>
   );
}
