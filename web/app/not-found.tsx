import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/common/AnimatedBackground';

export const metadata: Metadata = {
  metadataBase: new URL('https://arpanbhandari.com.np'),
  title: 'Not Found ☹️ | Arpan Bhandari',
  description:
    'Oops! The page you are looking for cannot be found. It might have been moved or deleted.',
  keywords:
    '404, not found, error page, Arpan Bhandari, page missing, portfolio',

  openGraph: {
    type: 'website',
    url: 'https://arpanbhandari.com.np/404',
    title: 'Not Found ☹️ | Arpan Bhandari',
    description:
      'Oops! The page you are looking for cannot be found. It might have been moved or deleted.',
    siteName: "Arpan Bhandari's Portfolio",
    images: [
      {
        url: '/images/not-found-opengraph.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
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
            Oops! It seems the page you&apos;re looking for has taken a detour
            or decided to retire.
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
