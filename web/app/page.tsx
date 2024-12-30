import About from '@/components/sections/About';
import Hero from '@/components/sections/Hero';
import { Metadata } from 'next';
import Expertise from '@/components/sections/Expertise';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import { Suspense } from 'react';
import FeaturedWritings from '@/components/sections/FeaturedWriting';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
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
    images: ['/images/portfolio-opengraph.png'],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@arpanbhandari',
    title: 'Arpan Bhandari | The Developer',
    description:
      'Arpan Bhandari is an aspiring scholar, experienced developer, and sometimes a writer. Explore a portfolio showcasing his diverse skills in technology and creativity.',
    images: ['/images/portfolio-opengraph.png'],
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
    </>
  );
}
