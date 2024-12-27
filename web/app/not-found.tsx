import AnimatedBackground from '@/components/common/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Not Found ☹️ | Arpan Bhandari',
  description: '404 Page Not Found',
  openGraph: {
    type: 'website',
    url: 'https://arpanbhandari.com.np/404',
    title: 'Not Found ☹️ | Arpan Bhandari',
    description: '404 Page Not Found',
    siteName: "Arpan Bhandari's Portfolio",
    images: ['/images/not-found-opengraph.png'],
  },
};

export default function NotFound() {
  return (
    <main className="bg-transparent pt-[52px] h-[calc(100dvh-68px)] flex items-center justify-center">
      <div className="container px-2">
        <AnimatedBackground />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-bold text-center dark:text-[#ff7d37] text-[#ff6730] saturate-[110%]">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-primary">
            Page Not Found
          </h2>
          <p className="text-center text-primary mt-2 md:mt-4 text-sm sm:text-base md:text-lg">
            Oops! It seems the page you're looking for has taken a detour or
            decided to retire.
          </p>
          <Link href="/" className="mt-2 md:mt-4">
            <Button className="px-4 md:px-6 rounded-full" variant={'outline'}>
              <ArrowLeft /> Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
