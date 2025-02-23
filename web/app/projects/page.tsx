import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, FilterX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import fetchNextAPI from '@/actions/fetchNextAPI';
import { ProjectsQueryResponse } from '@/types/response';
import ProjectCollection from '@/components/sections/ProjectCollection';

export const metadata: Metadata = {
   metadataBase: new URL('https://arpanbhandari.com.np'),
   title: 'Projects - Arpan Bhandari (The Developer)',
   description:
      'Explore the groundbreaking projects developed by Arpan Bhandari, a passionate and versatile developer with expertise in web development, software engineering, and creative solutions. From cutting-edge web applications to software innovations, discover the technical achievements and forward-thinking approaches driving his work.',
   keywords:
      'Arpan Bhandari, developer, software engineer, web development, projects, innovative solutions, coding, programming, tech achievements, creative problem solving, React, Next.js, TypeScript, full-stack development, programming projects, software development, Golang, C++, Docker, AWS, cloud computing, backend development, DevOps, JavaScript, Python, database management, APIs',
   openGraph: {
      type: 'website',
      url: 'https://arpanbhandari.com.np/projects',
      title: 'Projects - Arpan Bhandari (The Developer)',
      description:
         'Explore the groundbreaking projects developed by Arpan Bhandari, a passionate and versatile developer with expertise in web development, software engineering, and creative solutions. From cutting-edge web applications to software innovations, discover the technical achievements and forward-thinking approaches driving his work.',
      siteName: "Arpan Bhandari's Project Portfolio",
      images: [
         {
            url: '/images/projects-opengraph.png',
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
   const { tag } = await searchParams;
   const data = await fetchNextAPI<ProjectsQueryResponse>(
      `/api/projects${tag ? `?tag=${tag}&token=${process.env.NEXT_INTERNAL_API_TOKEN}` : `?token=${process.env.NEXT_INTERNAL_API_TOKEN}`}`,
      7200
   );

   return (
      <main className="bg-background min-h-[calc(100dvh-68px)] pt-[52px]">
         <div className="px-2 py-2">
            <Link href="/">
               <Button
                  variant={'link'}
                  className="px-2 rounded-full font-semibold"
               >
                  <ChevronLeft size={20} /> Home
                  <span className="sr-only">Go back to home</span>
               </Button>
            </Link>
         </div>
         <section className="container mx-auto px-2">
            <div>
               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-primary">
                  My{' '}
                  <span className="dark:text-[#ff7d37] text-[#ff6730] saturate-[110%]">
                     Creations
                  </span>
               </h1>
               <h2 className="text-lg font-semibold text-primary text-center opacity-80 mt-2">
                  A collection of all projects I have worked on.
               </h2>
            </div>
            {tag && (
               <div className="flex justify-between flex-wrap items-center mt-4 mb-2">
                  <div className="">
                     <span className="font-medium text-muted-foreground flex items-center flex-wrap">
                        <span className="text-base text-primary/80">
                           Projects with tag:{' '}
                        </span>{' '}
                        <span className="mx-2 text-sm"> &apos;{tag}&apos;</span>
                     </span>
                  </div>
                  <div>
                     <Link href="/projects">
                        <Button
                           variant={'outline'}
                           className="rounded-full h-8"
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
                     tag
                        ? 'min-h-[calc(100dvh-317px)]'
                        : 'min-h-[calc(100dvh-260px)]'
                  } flex items-center justify-center`}
               >
                  <div className="relative -top-10 select-none">
                     <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-center dark:text-[#ff7d37] text-[#ff6730] saturate-[130%]">
                        OOPS!
                     </h2>
                     <h2 className="text-lg font-medium text-primary text-center opacity-80 mt-2">
                        It seems there are no projects to show right now. Check
                        back soon!
                     </h2>
                  </div>
               </div>
            )}
            {data && <ProjectCollection projects={data.projects} />}
         </section>
      </main>
   );
}
