import About from '@/components/sections/About';
import Hero from '@/components/sections/Hero';
import { Metadata } from 'next';

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
    </>
  );
}
