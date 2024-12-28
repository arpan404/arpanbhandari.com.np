import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import getProjects from '@/actions/getProjects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - Arpan Bhandari (The Developer)',
  description:
    'Discover the innovative projects created by Arpan Bhandari, a skilled developer proficient in a wide range of technologies and tools. These projects demonstrate expertise in web development, software engineering, and creative problem-solving. Dive into unique solutions and technical achievements crafted with a passion for coding and innovation.',
  openGraph: {
    type: 'website',
    url: 'https://arpanbhandari.com.np/projects',
    title: 'Projects - Arpan Bhandari (The Developer)',
    description:
      'Discover the innovative projects created by Arpan Bhandari, a skilled developer proficient in a wide range of technologies and tools. These projects demonstrate expertise in web development, software engineering, and creative problem-solving. Dive into unique solutions and technical achievements crafted with a passion for coding and innovation.',
    siteName: "Arpan Bhandari's Projects Collection",
    images: ['/images/projects-opengraph.png'],
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { tag } = await searchParams;
  // const data = await getProjects(tag ? (tag as string) : undefined);
  let data = null;
  console.log(data);
  return (
    <main className="bg-background pt-[52px]">
      <div className="px-2">
        <Link href="/">
          <Button variant={'link'} className="px-2 rounded-full font-semibold">
            <ChevronLeft size={20} /> Home
            <span className="sr-only">Go back to home</span>
          </Button>
        </Link>
      </div>
      <main className="container mx-auto">
        {!data && (
          <div className="">
            <div></div>
          </div>
        )}
      </main>
    </main>
  );
}
