import { Metadata } from 'next';
import { Suspense } from 'react';

import About from '@/components/sections/About';
import Hero from '@/components/sections/Hero';
import Expertise from '@/components/sections/Expertise';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import FeaturedWritings from '@/components/sections/FeaturedWriting';
import Contact from '@/components/sections/Contact';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
   metadataBase: new URL('https://arpanbhandari.com.np'),
   title: 'Arpan Bhandari | The Developer',
   description:
      'Arpan Bhandari is an aspiring scholar, experienced developer, and sometimes a writer. Explore a portfolio showcasing his diverse skills in technology and creativity.',
   keywords:
      'Arpan Bhandari, developer, scholar, software engineering, programming, writer, portfolio, tech portfolio, coding, web development, full-stack development, technology, creative solutions',
   openGraph: {
      type: 'website',
      url: 'https://arpanbhandari.com.np',
      title: 'Arpan Bhandari | The Developer',
      description:
         'Arpan Bhandari is an aspiring scholar, experienced developer, and sometimes a writer. Explore a portfolio showcasing his diverse skills in technology and creativity.',
      siteName: "Arpan Bhandari's Portfolio",
      images: [
         {
            url: '/images/main-opengraph.png',
            width: 1200,
            height: 630,
         },
      ],
      locale: 'en_US',
   },
};

export default function Home() {
   return (
      <>
         <main>
            <Hero />
         </main>
         <About />
         <div className="bg-secondary h-[2px]" role="separator" />
         <Suspense>
            <Expertise />
         </Suspense>
         <Suspense>
            <FeaturedProjects />
         </Suspense>
         <div className="bg-secondary h-[2px]" role="separator" />
         <Suspense>
            <FeaturedWritings />
         </Suspense>
         <div className="bg-secondary h-[2px]" role="separator" />
         <Contact />
         <Toaster />
      </>
   );
}
