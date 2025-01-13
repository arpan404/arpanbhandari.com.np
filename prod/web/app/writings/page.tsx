import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, FilterX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import fetchNextAPI from '@/actions/fetchNextAPI';
import { WritingCardsQueryResponse } from '@/types/response';
import WritingCollection from '@/components/sections/WritingCollection';

export const metadata: Metadata = {
   metadataBase: new URL('https://arpanbhandari.com.np'),
   title: 'Writings - Arpan Bhandari (The Developer)',
   description: `Explore Diaries, Blueprints, and Personal Perspectives—insightful and intriguing writings on software engineering, personal experiences, and general topics you'll love to read.`,
   keywords:
      'Arpan Bhandari, writing, blog, software engineering, personal experiences, general topics, diaries, blueprints, developer thoughts, blogging, tech writing, software development, coding insights, programming, technology blog',
   openGraph: {
      type: 'website',
      url: 'https://arpanbhandari.com.np/writings',
      title: 'Writings - Arpan Bhandari (The Developer)',
      description: `Explore Diaries, Blueprints, and Personal Perspectives—insightful and intriguing writings on software engineering, personal experiences, and general topics you'll love to read.`,
      siteName: "Arpan Bhandari's Writing Space",
      images: [
         {
            url: '/images/writings-opengraph.png',
            width: 1200,
            height: 630,
         },
      ],
      locale: 'en_US',
   },
};

export default async function page({
   searchParams,
}: {
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
   const { type } = await searchParams;

   const data = await fetchNextAPI<WritingCardsQueryResponse>(
      `/api/writings${
         type
            ? `?type=${type}&token=${process.env.NEXT_INTERNAL_API_TOKEN}`
            : `?token=${process.env.NEXT_INTERNAL_API_TOKEN}`
      }`,
      7200
   );
   return (
      <main className="bg-background min-h-[calc(100dvh-68px)] pt-[52px]">
         <div className="px-2 py-2">
            <Link href="/">
               <Button
                  variant={'link'}
                  className="px-2 rounded-full font-semibold select-none"
               >
                  <ChevronLeft size={20} /> Home
                  <span className="sr-only">Go back to home</span>
               </Button>
            </Link>
         </div>
         <section className="container mx-auto px-2">
            <div>
               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-primary select-none">
                  Writing Space
               </h1>
               <h2 className="text-lg font-semibold text-primary/80 text-center mt-2">
                  A collection of my writings on various topics and genres.
               </h2>
            </div>
            {type && (
               <div className="flex justify-between flex-wrap items-center mt-4 mb-2 gap-2">
                  <div>
                     <span className="font-medium text-muted-foreground flex items-center flex-wrap">
                        <span className="text-base text-primary/80">
                           Result for Writing Type{' '}
                        </span>{' '}
                        <span className="mx-2 text-sm capitalize">
                           {' '}
                           &apos;{type}&apos;
                        </span>
                     </span>
                  </div>
                  <div>
                     <Link href="/writings">
                        <Button
                           variant={'outline'}
                           className="rounded-full h-8 select-none"
                        >
                           <FilterX size={20} /> Clear Filter
                        </Button>
                     </Link>
                  </div>
               </div>
            )}

            {!data && (
               <div
                  className={`${
                     type
                        ? 'min-h-[calc(100dvh-317px)]'
                        : 'min-h-[calc(100dvh-260px)]'
                  } flex items-center justify-center `}
               >
                  <div className="relative -top-10 select-none">
                     <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-center dark:text-[#ff7d37] text-[#ff6730] saturate-[130%]">
                        OOPS!
                     </h2>
                     <h2 className="text-lg font-medium text-primary text-center opacity-80 mt-2">
                        I haven&apos;t published my writings yet. Check back
                        soon!
                     </h2>
                  </div>
               </div>
            )}
            {data && <WritingCollection data={data} />}
         </section>
      </main>
   );
}
