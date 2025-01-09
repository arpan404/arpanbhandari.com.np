'use client';

import AnimatedBackground from '@/components/common/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError() {
   return (
      <html lang="en">
         <head>
            <title>Something went wrong!</title>
         </head>
         <body>
            <main className="bg-transparent pt-[52px] h-[calc(100dvh-68px)] flex items-center justify-center">
               <div className="container px-2">
                  <AnimatedBackground />
                  <div className="flex flex-col items-center justify-center">
                     <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-bold text-center dark:text-[#ff7d37] text-[#ff6730] saturate-[110%]">
                        OOPS!
                     </h1>
                     <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-primary">
                        Something went wrong!
                     </h2>
                     <p className="text-center text-primary mt-2 md:mt-4 text-sm sm:text-base md:text-lg">
                        Something unexpected occurred while trying to load the
                        page. Please try refresshing the page.
                     </p>
                     <Link href="#" className="mt-2 md:mt-4">
                        <Button
                           className="px-4 md:px-6 rounded-full"
                           variant={'outline'}
                           onClick={() => window.location.reload()}
                        >
                           <RefreshCw /> Refresh
                        </Button>
                     </Link>
                  </div>
               </div>
            </main>
         </body>
      </html>
   );
}
