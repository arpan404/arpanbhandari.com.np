import { Button } from '@/components/ui/button';
import { ChevronLeft, Tag, X } from 'lucide-react';
import Link from 'next/link';
import getProjects from '@/actions/getProjects';
import { Metadata } from 'next';
import ProjectCard from '@/components/cards/ProjectCard';
import ProjectCollection from '@/components/sections/ProjectCollection';

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

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { tag } = await searchParams;
  const data = await getProjects(tag ? (tag as string) : undefined);

  return (
    <main className="bg-background min-h-[calc(100dvh-68px)] pt-[52px]">
      <div className="px-2 py-2">
        <Link href="/">
          <Button variant={'link'} className="px-2 rounded-full font-semibold">
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
                  className="rounded-full px-4 md:px-6"
                >
                  View All Projects
                </Button>
              </Link>
            </div>
          </div>
        )}

        {!data && (
          <div
            className={`${
              tag ? 'min-h-[calc(100dvh-317px)]' : 'min-h-[calc(100dvh-260px)]'
            } flex items-center justify-center`}
          >
            <div className="relative -top-10">
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-center dark:text-[#ff7d37] text-[#ff6730] saturate-[130%]">
                OOPS!
              </h2>
              <h2 className="text-lg font-medium text-primary text-center opacity-80 mt-2">
                It seems there are no projects to show right now. Check back
                soon!
              </h2>
            </div>
          </div>
        )}
        {data && <ProjectCollection projects={data.projects} />}
      </section>
    </main>
  );
}
