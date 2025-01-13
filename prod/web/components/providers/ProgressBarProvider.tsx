'use client';
import { ReactNode } from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function ProgressBarProvider({
   children,
}: {
   children: ReactNode;
}) {
   return (
      <>
         {children}
         <ProgressBar
            height="3px"
            color="#ff7d37"
            options={{ showSpinner: false }}
            shallowRouting
         />
      </>
   );
}
