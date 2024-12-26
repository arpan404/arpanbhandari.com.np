import About from '@/components/sections/About';
import Hero from '@/components/sections/Hero';
import { Metadata } from 'next';
import Expertise from '@/components/sections/Expertise';
import FeaturedProjects from '@/components/sections/FeaturedProjects';

export const metadata: Metadata = {
  title: 'Arpan Bhandari | The Developer',
  description:
    'Arpan Bhandari is an aspiring scholar, experienced developer, and sometimes a writer.',
  openGraph: {
    type: 'website',
    url: 'https://arpanbhandari.com.np',
    title: 'Arpan Bhandari | The Developer',
    description:
      'Arpan Bhandari is an aspiring scholar, experienced developer, and sometimes a writer.',
    siteName: "Arpan Bhandari's Portfolio",
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
      <Expertise />
      <FeaturedProjects />
    </>
  );
}
